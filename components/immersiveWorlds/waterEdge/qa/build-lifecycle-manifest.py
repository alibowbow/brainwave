"""Hash the bounded lifecycle follow-up matrix without changing evidence or pixels.

Run only after the complete 24-run final matrix has finished. Failed/blocked
reports remain failed/blocked; absent captures are listed, never manufactured.
"""
from pathlib import Path
from collections import Counter, defaultdict
from datetime import datetime, timezone
import argparse
import hashlib
import io
import json
import subprocess

import numpy as np
from PIL import Image

QA = Path(__file__).resolve().parent
OWNED = QA.parent
REPO = OWNED.parents[2]
EVIDENCE = QA / 'submission-evidence'
ITERATIONS = QA / 'followup-lifecycle-evidence'
ORIGINAL = QA / 'followup-evidence'
ORIGINAL_REF = 'c6cad439abbaae54884292c6cc6ea60c76587e32'
CANDIDATE_PRODUCTION_REF = '7b90628032cd87a8fe60b1b5fdf7a440b842ef9c'
CANDIDATE_CAPTURE_REF = '2de4ca3898f09f334e316647b0e506ae42ef7531'
IDENTITY_KEYS = ['sourceSha256', 'harnessSha256', 'bundleSha256']
PAIRS = [('summer-valley', 'normal'), ('summer-valley', 'byte'),
         ('pebble-shore', 'normal'), ('pebble-shore', 'byte'), ('night-pond', 'normal')]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def sha(path):
    return digest(path.read_bytes())


def relative(path):
    return path.relative_to(QA).as_posix()


def git(*arguments):
    return subprocess.check_output(['git', *arguments], cwd=REPO)


def git_bytes(ref, path):
    return git('show', f'{ref}:{path.relative_to(REPO).as_posix()}')


def final_matrix():
    names = set()
    for world, mode in PAIRS:
        for stage in ['lifecycle', 'behavior']:
            names.add(f'final-{world}-{mode}-desktop-{stage}.json')
        for view in ['desktop', 'portrait']:
            names.add(f'final-{world}-{mode}-{view}-visual.json')
    for mode in ['normal', 'byte']:
        names.add(f'final-summer-valley-{mode}-desktop-static.json')
        names.add(f'final-active-summer-valley-{mode}-desktop-diagnostic.json')
    return names


def local_tree_hashes():
    # Match the verifier's Node localeCompare ordering and NUL-delimited path /
    # content contract exactly, including all native bundle bytes.
    script = r"""
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
async function tree(root,keep,sourceOnly){const h=createHash('sha256');
 async function walk(dir){for(const item of(await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
  const file=path.join(dir,item.name),rel=path.relative(root,file);if(!keep(rel))continue;
  if(item.isDirectory())await walk(file);else if(!sourceOnly||/\.(tsx?|css|html)$/.test(rel))h.update(rel).update('\0').update(await readFile(file)).update('\0');
 }}await walk(root);return h.digest('hex');}
const root=process.argv[1];
process.stdout.write(JSON.stringify({
 sourceSha256:await tree(root,x=>!/^(dev|qa)(\/|$)/.test(x),true),
 harnessSha256:await tree(path.join(root,'dev'),x=>!/^(dist|node_modules)(\/|$)/.test(x),true),
 bundleSha256:await tree(path.join(root,'dev/dist'),()=>true,false)}));
"""
    return json.loads(subprocess.check_output(['node', '--input-type=module', '-e', script, str(OWNED)], cwd=REPO))


def compact_state(state):
    return {'diagnostics': state.get('diagnostics'), 'canvases': [
        {key: canvas.get(key) for key in ['id', 'holder', 'width', 'height', 'frames', 'time', 'drawCalls', 'triangles', 'submission']}
        for canvas in state.get('canvases', [])]}


def disposal_observations(report):
    """Keep raw completed cycles and eventual observations from failed cycles."""
    telemetry = report.get('telemetry', {})
    timeline = telemetry.get('timeline', [])
    requests = [event for event in timeline if event['kind'] == 'unmount-request']
    recorded = report.get('checks', {}).get('disposalCycles', [])
    result = []
    for index, request in enumerate(requests):
        finish = requests[index + 1]['atMs'] if index + 1 < len(requests) else float('inf')
        events = [event for event in timeline if request['atMs'] <= event['atMs'] < finish]
        find = lambda kind: next((event for event in events if event['kind'] == kind), None)
        removal, entry, exit_event, lost = [find(kind) for kind in
            ['canvas-detached-observed', 'dispose-entry', 'dispose-exit', 'context-loss-observed']]
        raw = recorded[index] if index < len(recorded) else {}
        elapsed = lambda start, end: end['atMs'] - start['atMs'] if start and end else None
        stop = lost['atMs'] + 100 if lost else (exit_event['atMs'] + 100 if exit_event else finish)
        samples = [sample for sample in telemetry.get('heartbeats', []) if request['atMs'] <= sample['atMs'] <= stop]
        result.append({
            'cycle': index + 1, 'status': raw.get('status', report['status']),
            'recordedSuccessfulCycle': raw.get('status') == 'passed', 'unmountRequest': request,
            'removal': removal, 'entry': entry, 'exit': exit_event, 'contextLossObserved': lost,
            'configuredRetentionMs': raw.get('configuredRetentionMs', 5000),
            'eventualObservationDeadlineMs': raw.get('eventualObservationDeadlineMs', 20000),
            'removalToDisposeEntryMs': elapsed(removal, entry),
            'disposeSynchronousDurationMs': elapsed(entry, exit_event),
            'removalToContextLossObservationMs': elapsed(removal, lost),
            'heartbeatSamples': len(samples),
            'maxDisposalHeartbeatLagMs': max(0, *(sample['lagMs'] for sample in samples)) if samples else None,
            'phases': [event for event in events if event['kind'].startswith(
                ('world-dispose-', 'render-lists-dispose-', 'renderer-dispose-', 'force-context-loss-'))
                and (exit_event is None or event['atMs'] <= exit_event['atMs'])],
            'disposedCounters': raw.get('disposed', {}).get('diagnostics'),
            'remountedCounters': raw.get('remounted', {}).get('diagnostics'),
            'note': 'Eventual events never convert a raw failed/blocked cycle into a pass. Phase durations are CPU wall observations, not proof of physical VRAM reclamation.',
        })
    return result


def draw_summary(report):
    timeline = report.get('telemetry', {}).get('timeline', [])
    groups = defaultdict(lambda: {'renderCalls': 0, 'exclusiveDrawCalls': 0, 'summedRendererCallWallMs': 0})
    for event in timeline:
        if event['kind'] != 'renderer-render-return':
            continue
        destination = event.get('destination')
        key = (event.get('canvasId'), event.get('scope'), json.dumps(destination, sort_keys=True))
        item = groups[key]
        item['renderCalls'] += 1
        item['exclusiveDrawCalls'] += event.get('exclusiveDrawCalls', 0)
        item['summedRendererCallWallMs'] += event.get('elapsedMs', 0)
    frames = [event for event in timeline if event['kind'] == 'render-js-return']
    return {
        'countingMethod': report.get('telemetry', {}).get('countingMethod'),
        'wallTimeNote': 'Renderer-call wall times can include nested calls and driver/compiler stalls; do not sum these groups as exclusive CPU time or GPU time.',
        'byCanvasScopeDestination': [{'canvasId': key[0], 'scope': key[1], 'destination': json.loads(key[2]), **value}
            for key, value in sorted(groups.items(), key=lambda item: str(item[0]))],
        'frameRequests': [{key: event.get(key) for key in
            ['canvasId', 'reason', 'action', 'dt', 'submitted', 'frame', 'time', 'drawCalls', 'elapsedMs']}
            for event in frames],
        'submittedFrameRequests': sum(event.get('submitted') is True for event in frames),
        'skippedFrameRequests': sum(event.get('submitted') is False for event in frames),
        'initial': compact_state(report.get('initial', {})),
        'holderTransfer': {label: compact_state(state) for label, state in report.get('checks', {}).get('holderTransfer', {}).items()
            if label in ['before', 'second', 'returned']},
    }


def summarize(path, report):
    return {
        'file': relative(path), 'sha256': sha(path),
        **{key: report.get(key) for key in ['status', 'world', 'mode', 'stage', 'tag', 'viewport', 'dpr',
            'activeFrames', 'drainBeforeDispose', 'gitHead', 'browser', *IDENTITY_KEYS, 'scriptSha256', 'failure', 'tainted']},
        'errors': report.get('errors', []), 'warnings': report.get('warnings', []), 'unrun': report.get('unrun', []),
        'checkStatuses': {name: check.get('status') for name, check in report.get('checks', {}).items() if isinstance(check, dict)},
        'gpuDrainObservations': [{'check': name, **check} for name, check in report.get('checks', {}).items() if name.endswith('-gpuDrain')],
        'disposalCycles': disposal_observations(report),
        'drawSubmissions': draw_summary(report),
        'maxSessionHeartbeatLagMs': report.get('telemetry', {}).get('maxHeartbeatLagMs'),
        'finalCounters': report.get('final', {}).get('diagnostics'),
        'staticPixelChecks': {name: check.get('pixelComparison') for name, check in report.get('checks', {}).items()
            if name in ['staticHolderRoundtrips', 'staticResizeRoundtrip']},
        'noDrainActiveBurst': report.get('checks', {}).get('noDrainActiveBurst'),
    }


def pixel_comparison(before_bytes, after_path):
    a = np.asarray(Image.open(io.BytesIO(before_bytes)).convert('RGBA')).astype(np.int16)
    b = np.asarray(Image.open(after_path).convert('RGBA')).astype(np.int16)
    assert a.shape == b.shape, f'Native comparison dimensions differ: {after_path.name}'
    difference = np.abs(a - b)
    return {
        'width': a.shape[1], 'height': a.shape[0], 'pixelsIdentical': bool(np.array_equal(a, b)),
        'changedPixelsExactRGBA': int(np.any(difference != 0, axis=2).sum()),
        'changedPixelsOver6RGB': int((difference[:, :, :3].sum(axis=2) > 6).sum()),
        'meanAbsoluteRGBChannelDifference': float(difference[:, :, :3].mean()),
        'maximumRGBChannelDifference': int(difference[:, :, :3].max()),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--production-ref', required=True, help='Exact final production-source commit')
    parser.add_argument('--capture-ref', required=True, help='Exact final harness/verifier capture commit')
    arguments = parser.parse_args()
    production_ref = git('rev-parse', arguments.production_ref).decode().strip()
    capture_ref = git('rev-parse', arguments.capture_ref).decode().strip()
    expected = final_matrix()
    final_paths = sorted(EVIDENCE.glob('final-*.json'))
    actual = {path.name for path in final_paths}
    assert actual == expected, f'Incomplete/extra final matrix: missing={sorted(expected-actual)}, extra={sorted(actual-expected)}'
    baseline_paths = sorted(ITERATIONS.glob('baseline-*.json'))
    assert len(baseline_paths) == 5, f'Expected all five baseline attempts; got {len(baseline_paths)}'
    candidate_paths = sorted(ITERATIONS.glob('final-*.json'))
    assert len(candidate_paths) == 3, f'Expected all three finite dedup-only candidate attempts; got {len(candidate_paths)}'
    final = [(path, json.loads(path.read_text())) for path in final_paths]
    baseline = [(path, json.loads(path.read_text())) for path in baseline_paths]
    candidate = [(path, json.loads(path.read_text())) for path in candidate_paths]
    for path, report in final + baseline + candidate:
        assert report['status'] in ['passed', 'failed', 'blocked', 'unrun'], f'{path.name}: unfinished/unknown status'
    reference = {key: final[0][1][key] for key in IDENTITY_KEYS}
    assert local_tree_hashes() == reference, 'Current production/harness/bundle bytes differ from final captured identity'
    verifier_hash = sha(QA / 'followup-verify.mjs')
    for path, report in final:
        assert {key: report[key] for key in IDENTITY_KEYS} == reference, f'{path.name}: inconsistent final source/harness/bundle'
        assert report['gitHead'] == capture_ref, f'{path.name}: unexpected capture commit'
        assert report['scriptSha256'] == verifier_hash, f'{path.name}: verifier changed during final matrix'
        assert report.get('initial', {}).get('sourceSha256') == reference['sourceSha256'], f'{path.name}: stale embedded source'
        assert report.get('initial', {}).get('harnessSha256') == reference['harnessSha256'], f'{path.name}: stale embedded harness'

    source_files = [path for path in sorted(OWNED.rglob('*')) if path.is_file()
        and path.suffix in ['.ts', '.tsx', '.css', '.html'] and path.relative_to(OWNED).parts[0] not in ['dev', 'qa']]
    for path in source_files:
        assert path.read_bytes() == git_bytes(production_ref, path), f'Production changed after source commit: {path}'
    qa_helpers = [QA / 'followup-verify.mjs', QA / 'followup-target-assertions.mjs']
    harness_files = [path for path in sorted((OWNED / 'dev').rglob('*')) if path.is_file()
        and path.suffix in ['.ts', '.tsx', '.css', '.html'] and path.relative_to(OWNED / 'dev').parts[0] not in ['dist', 'node_modules']]
    for path in qa_helpers + harness_files:
        assert path.read_bytes() == git_bytes(capture_ref, path), f'Capture/helper source changed: {path}'

    original_paths = [REPO / name for name in git('ls-tree', '-r', '--name-only', ORIGINAL_REF, '--',
        ORIGINAL.relative_to(REPO).as_posix()).decode().splitlines()]
    assert {path for path in ORIGINAL.rglob('*') if path.is_file()} == set(original_paths), 'Original evidence files added/removed'
    preserved = []
    for path in original_paths:
        original_hash = digest(git_bytes(ORIGINAL_REF, path))
        assert sha(path) == original_hash, f'Original evidence bytes changed: {path.name}'
        preserved.append({'file': relative(path), 'sha256': original_hash})

    images, missing = [], []
    planned_capture_count = {'visual': 1, 'behavior': 2, 'static': 4, 'lifecycle': 0, 'diagnostic': 0}
    for path, report in final + baseline + candidate:
        expected_count = planned_capture_count[report['stage']] if path in final_paths else 0
        captures = report.get('captures', [])
        if report['status'] == 'passed':
            assert len(captures) == expected_count, f'{path.name}: passed report lacks required captures'
        if len(captures) < expected_count:
            missing.append({'report': relative(path), 'rawStatus': report['status'], 'expected': expected_count, 'actual': len(captures)})
        for capture in captures:
            image = path.parent / capture['file']
            assert sha(image) == capture['sha256'], f'Image hash mismatch: {image.name}'
            assert image.stat().st_size == capture['bytes'], f'Image byte count mismatch: {image.name}'
            size = Image.open(image).size
            viewport = capture.get('viewport', report['viewport'])
            assert size == (viewport['width'], viewport['height']), f'PNG is not native viewport size: {image.name}'
            images.append({'file': relative(image), 'report': relative(path), 'sha256': sha(image), 'size': size,
                **{key: capture.get(key) for key in ['bytes', 'captureMethod', 'screenshotElapsedMs', 'combinedElapsedMs']}})
    assert len({image['file'] for image in images}) == len(images), 'Repeated image evidence'
    assert {path.name for path in EVIDENCE.glob('*.png')} == {Path(image['file']).name for image in images}, 'Orphan/unrecorded image evidence'

    comparisons = []
    for world, mode in PAIRS:
        for view in ['desktop', 'portrait']:
            name = f'{world}-{mode}-{view}-visual-initial.png'
            before = ORIGINAL / name
            after = EVIDENCE / f'final-{name}'
            if not after.exists():
                comparisons.append({'world': world, 'mode': mode, 'view': view, 'status': 'unrun', 'reason': 'No final capture recorded'})
                continue
            before_bytes = git_bytes(ORIGINAL_REF, before)
            comparisons.append({'world': world, 'mode': mode, 'view': view, 'status': 'measured',
                'before': relative(before), 'beforeSha256': digest(before_bytes), 'beforeCommit': ORIGINAL_REF,
                'after': relative(after), 'afterSha256': sha(after), **pixel_comparison(before_bytes, after)})

    original_failures = []
    for mode in ['normal', 'byte']:
        path = ORIGINAL / f'summer-valley-{mode}-desktop-lifecycle.json'
        report = json.loads(path.read_text())
        assert report['status'] == 'failed', 'Historical failed report was relabeled'
        original_failures.append(summarize(path, report))
    baseline_blocked = [relative(path) for path, report in baseline if report['status'] == 'blocked']
    assert 'followup-lifecycle-evidence/baseline-drained-normal-summer-valley-normal-desktop-diagnostic.json' in baseline_blocked, 'Original blocked drain attempt missing'
    candidate_failed = [relative(path) for path, report in candidate if report['status'] == 'failed']
    assert 'followup-lifecycle-evidence/final-active-summer-valley-normal-desktop-diagnostic.json' in candidate_failed, 'Dedup-only candidate active-disposal failure missing'
    for path, report in candidate:
        assert report['gitHead'] == CANDIDATE_CAPTURE_REF, f'{path.name}: unexpected historical candidate identity'

    manifest = {
        'schema': 1, 'generatedAt': datetime.now(timezone.utc).isoformat(),
        'originalWaterEdgeHead': '299a18911b2b7818149e4997dc2101b9c760bef5',
        'acceptedVisualBaselineCommit': ORIGINAL_REF,
        'productionCommit': production_ref, 'captureCommit': capture_ref,
        'aliases': {'localSource': production_ref, 'captureQA': capture_ref},
        **reference,
        'manifestGeneratorSha256': sha(Path(__file__)),
        'verifierAndHelperSha256': {relative(path): sha(path) for path in qa_helpers},
        'harnessFileSha256': {path.relative_to(OWNED).as_posix(): sha(path) for path in harness_files},
        'sourceFileSha256': {path.relative_to(OWNED).as_posix(): sha(path) for path in source_files},
        'finalRuns': [summarize(path, report) for path, report in final],
        'baselineRuns': [summarize(path, report) for path, report in baseline],
        'dedupOnlyCandidate': {'productionCommit': CANDIDATE_PRODUCTION_REF, 'captureCommit': CANDIDATE_CAPTURE_REF,
            'runs': [summarize(path, report) for path, report in candidate],
            'remainingMatrix': 'Unrun: stopped after the actual active-disposal failure; later scheduler evidence is a separate source and directory.'},
        'originalFailedReports': original_failures,
        'preservedOriginalEvidence': preserved,
        'images': images, 'missingPlannedCaptures': missing,
        'acceptedVisualBeforeAfter': comparisons,
        'counts': {'final': dict(Counter(report['status'] for _, report in final)),
            'baseline': dict(Counter(report['status'] for _, report in baseline)),
            'dedupOnlyCandidate': dict(Counter(report['status'] for _, report in candidate)),
            'originalFailures': 2, 'expectedFinalRuns': 24, 'expectedFinalPNG': 28, 'actualPNG': len(images)},
        'interpretationLimits': [
            'Raw report statuses are retained; eventual cleanup or a successful rerun does not overwrite an earlier failure.',
            'The 5000ms configured holder-retention grace, disposal entry/exit, context-loss observation and heartbeat lag are distinct.',
            'Fence wait observes completion of queued work. Renderer-return durations include synchronous driver/compiler stalls; neither is a GPU-per-frame timer.',
            'CPU phase timings and JavaScript resource counters do not establish physical VRAM reclamation.',
            'Production uses one completion-tracked render batch, including startup subpasses; this is not a fixed FPS cap. Bounded diagnostics do not certify sustained hardware throughput.',
            'Clean lifecycle runs contain production completion fences but no additional diagnostic drain, screenshot or readback; separately labeled baseline drained runs are not clean comparisons.',
            'Standalone harness chrome/input and viewport emulation do not establish production integration, native Fullscreen, physical touch hardware or real OS backgrounding.',
        ],
    }
    (QA / 'lifecycle-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(json.dumps({'counts': manifest['counts'], 'identicalVisualPairs': sum(item.get('pixelsIdentical') is True for item in comparisons),
        'finalDisposalCycles': sum(len(item['disposalCycles']) for item in manifest['finalRuns']),
        'originalFilesPreserved': len(preserved)}))


if __name__ == '__main__':
    main()
