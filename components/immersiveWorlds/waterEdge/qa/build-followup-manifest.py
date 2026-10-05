"""Rehash real evidence; compare unchanged views without altering PNG pixels."""
from pathlib import Path
import hashlib
import json
from datetime import datetime, timezone
from PIL import Image
import numpy as np

QA = Path(__file__).resolve().parent
OWNED = QA.parent
EVIDENCE = QA / 'followup-evidence'

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

reports = [(p, json.loads(p.read_text())) for p in sorted(EVIDENCE.glob('*.json'))]
assert len(reports) == 20, f'Expected finite 20-run matrix, got {len(reports)}'
reference = reports[0][1]
keys = ['sourceSha256', 'harnessSha256', 'bundleSha256']
for path, report in reports:
    for key in keys:
        assert report[key] == reference[key], f'{path.name}: inconsistent {key}'

images = []
runs = []
drains = []
cleanup = []
failed_cleanup = []
for path, report in reports:
    runs.append({
        'file': path.name, 'sha256': sha(path), 'status': report['status'],
        'world': report['world'], 'mode': report['mode'], 'stage': report['stage'],
        'viewport': report['viewport'], 'scriptSha256': report['scriptSha256'],
        'errors': report['errors'], 'failure': report.get('failure'),
    })
    for capture in report['captures']:
        image = EVIDENCE / capture['file']
        assert sha(image) == capture['sha256'], f'PNG hash mismatch: {image.name}'
        images.append({**{k: capture[k] for k in ['file', 'sha256', 'bytes', 'captureMethod', 'screenshotElapsedMs', 'combinedElapsedMs']},
                       'size': Image.open(image).size, 'report': path.name})
    for name, check in report['checks'].items():
        if name.endswith('-gpuDrain'):
            drains.append({'run': path.name, 'check': name, 'status': check['status'], 'elapsedMs': check['elapsedMs']})
    for cycle in report['checks'].get('disposalCycles', []):
        cleanup.append({'run': path.name, **{k: cycle[k] for k in ['cycle', 'status', 'removalToDisposeEntryMs', 'disposeSynchronousDurationMs', 'removalToContextLossObservationMs']}})
    if report['stage'] == 'lifecycle' and report['status'] == 'failed':
        timeline = report.get('telemetry', {}).get('timeline', [])
        requests = [event for event in timeline if event['kind'] == 'unmount-request']
        if requests:
            request = requests[-1]
            def later(kind):
                return next((event for event in timeline if event['kind'] == kind and event['atMs'] >= request['atMs']), None)
            detached, entry, exit_event, lost = [later(kind) for kind in ['canvas-detached-observed', 'dispose-entry', 'dispose-exit', 'context-loss-observed']]
            failed_cleanup.append({'run': path.name, 'status': 'failed', 'unmountRequest': request,
                                   'detached': detached, 'disposeEntry': entry, 'disposeExit': exit_event, 'contextLossObserved': lost,
                                   'disposalDeadlineMs': 20000, 'subsequentCycles': 'unrun',
                                   'eventualCounters': report.get('final', {}).get('diagnostics'),
                                   'note': 'Eventual observations do not convert the deadline failure into a pass.'})

comparison = []
for world in ['pebble-shore', 'summer-valley', 'night-pond']:
    for view in ['desktop', 'portrait']:
        before = QA / f'{world}-{view}.png'
        after = EVIDENCE / f'{world}-normal-{view}-visual-initial.png'
        a = np.array(Image.open(before).convert('RGB')).astype(int)
        b = np.array(Image.open(after).convert('RGB')).astype(int)
        difference = np.abs(a - b)
        comparison.append({'world': world, 'view': view, 'before': before.name, 'beforeSha256': sha(before),
                           'after': after.name, 'afterSha256': sha(after), 'pixelsIdentical': bool(np.array_equal(a, b)),
                           'meanAbsoluteChannelDifference': float(difference.mean()),
                           'changedPixelsOver6RGB': int((difference.sum(2) > 6).sum()),
                           'top20PercentMeanAbsoluteChannelDifference': float(difference[:int(len(difference) * .2)].mean())})

baseline = json.loads((QA / 'screenshots.json').read_text())
manifest = {
    'generatedAt': datetime.now(timezone.utc).isoformat(),
    'originalHead': '299a18911b2b7818149e4997dc2101b9c760bef5',
    'productionCommit': '9420bd71def5f8ec6de13006f6132e0ee09ff621',
    **{key: reference[key] for key in keys},
    'baseline': {key: baseline[key] for key in ['gitHead', *keys]},
    'sourceFiles': {str(p.relative_to(OWNED)): sha(p) for p in sorted(OWNED.rglob('*'))
                    if p.is_file() and p.suffix in ['.ts', '.tsx', '.css'] and p.relative_to(OWNED).parts[0] not in ['dev', 'qa']},
    'runs': runs, 'images': images, 'normalBeforeAfter': comparison,
    'gpuCompletionObservations': drains, 'cleanDisposalCycles': cleanup, 'failedCleanupObservations': failed_cleanup,
    'counts': {status: sum(r['status'] == status for _, r in reports) for status in ['passed', 'failed', 'blocked', 'running']},
    'unrun': ['Physical mobile/Fold hardware and absent-extension GPUs', 'Sustained performance, thermals, long-session memory and production queue bounds',
              'Real OS tab background/foreground', 'Integrated Player/ImmersiveMode chrome and native Fullscreen/Escape on a final integration commit',
              'Physical VRAM reclamation timing and auditory quality'],
}
(QA / 'followup-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps({'runs': len(runs), 'images': len(images), 'cleanupCycles': len(cleanup), 'counts': manifest['counts']}))
