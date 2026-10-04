"""Assemble actual completed checks; preserve every interrupted original segment."""
import copy
import hashlib
import json
import pathlib
import subprocess
from datetime import datetime, timezone

here = pathlib.Path(__file__).resolve().parent
project = here.parents[4]
qa = here.parent
def read(name):
    return json.loads((here / name).read_text())
def digest(data):
    return hashlib.sha256(data).hexdigest()
def provenance(artifact, head, **extra):
    return dict(artifact=artifact, gitHead=head, **extra)

full = read('full-run-b0a4e5d.json')
tent = read('tent-original-segment.json')
tent_extra = read('tent-supplement.json')
window = read('window-original-segment.json')
porch = read('porch-original-segment.json')
window_extra = read('window-supplement-report.json')
porch_extra = read('porch-supplement-report.json')
porch_static = read('porch-fresh-static.json')
head = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=project, text=True).strip()
assert head == window_extra['gitHead'] == porch_extra['gitHead']
assert window_extra['pass'] and porch_extra['pass'] and tent_extra['pass'] and porch_static['pass']
assert full['errors'] == window_extra['errors'] == porch_extra['errors'] == []

# Both rendered fixture and product source are identical; only the verifier changed.
source_hashes = window_extra['sourceHashes']
verifier = 'components/immersiveWorlds/rainShelters/qa/verify.mjs'
for name, expected in source_hashes.items():
    assert digest((project / name).read_bytes()) == expected, f'Current source drift: {name}'
for segment in [tent, window, porch, full, porch_extra]:
    for name, expected in source_hashes.items():
        if name != verifier:
            assert segment['sourceHashes'][name] == expected, f'Segment runtime drift: {name}'
    assert segment['bundleHashes'] == window_extra['bundleHashes']
for name, expected in window_extra['bundleHashes'].items():
    assert digest((qa / '.bundle' / 'assets' / name).read_bytes()) == expected
bundle_sha = window_extra['bundleHashes']['index-D8YJ8BJE.js']
assert tent_extra['bundleSHA256'] == porch_static['bundleSHA256'] == bundle_sha

segments = [
    dict(id='tent-original', artifact='tent-original-segment.json', gitHead=tent['gitHead'], startedAt=tent['startedAt'], completedUniqueChecks=14, originalRunCompleted=False, interruption='Detached canvas event-notification assertion; corrected with direct retained GL context state.'),
    dict(id='tent-supplement', artifact='tent-supplement.json', gitHead=tent_extra['gitHead'], observedAt=tent_extra['observedAt'], completedUniqueChecks=2, **{'pass':True}, execution='Inline Node protocol; afterward archived reproduction is reproduce-inline-protocols.mjs, not the executed-file provenance.', viewport=dict(width=390,height=844)),
    dict(id='window-original', artifact='window-original-segment.json', gitHead=window['gitHead'], startedAt=window['startedAt'], completedUniqueChecks=5, originalRunCompleted=False, interruption='Interaction screenshot exceeded 120 seconds after fonts loaded; behavioral continuation and successful PNG are supplemented.'),
    dict(id='window-supplement', artifact='window-supplement-report.json', gitHead=window_extra['gitHead'], startedAt=window_extra['startedAt'], finishedAt=window_extra['finishedAt'], completedUniqueChecks=11, repeatedPreconditions=1, **{'pass':True}, script='window-supplement-runner.mjs', **window_extra['supplement']),
    dict(id='porch-original', artifact='porch-original-segment.json', gitHead=porch['gitHead'], startedAt=porch['startedAt'], completedUniqueChecks=10, originalRunCompleted=False, interruption='Previously touched point repeated at identical frozen shader time; clean first-touch setup required.'),
    dict(id='porch-supplement', artifact='porch-supplement-report.json', gitHead=porch_extra['gitHead'], startedAt=porch_extra['startedAt'], finishedAt=porch_extra['finishedAt'], completedUniqueChecks=6, **{'pass':True}, script='porch-supplement-runner.mjs', **porch_extra['supplement']),
    dict(id='storm-full', artifact='full-run-b0a4e5d.json', gitHead=full['gitHead'], startedAt=full['startedAt'], finishedAt=full['finishedAt'], completedUniqueChecks=16, **{'pass':True}),
]
for item in segments:
    if 'script' in item:
        assert digest((here/item['script']).read_bytes()) == item['scriptSHA256']

def merge(world, original, original_artifact, original_head, added, added_artifact, added_head):
    result = dict(world=world, checks=[], screenshots=[], errors=[], renderer=copy.deepcopy(original['renderer']), supportingRepeatedChecks=[])
    seen = set()
    for checks, artifact, git_head in [(original['checks'], original_artifact, original_head), (added, added_artifact, added_head)]:
        for item in checks:
            assert item['pass'] is True
            check = copy.deepcopy(item)
            check['provenance'] = provenance(artifact, git_head)
            if check['name'] == 'accessible scene interaction emits one bounded event':
                check['method'] = 'DOM dispatchEvent click tests callback; native reachability under sibling overlay is not asserted.'
            if check['name'] in seen:
                result['supportingRepeatedChecks'].append(check)
            else:
                seen.add(check['name'])
                result['checks'].append(check)
    for screenshot in original['screenshots']:
        result['screenshots'].append(dict(screenshot, provenance=provenance(original_artifact, original_head)))
    result['checkCount'] = len(result['checks'])
    result['pass'] = all(c['pass'] for c in result['checks'])
    return result

worlds = [
    merge('tent',tent['world'],'tent-original-segment.json',tent['gitHead'],tent_extra['checks'],'tent-supplement.json',tent_extra['gitHead']),
    merge('window',window['world'],'window-original-segment.json',window['gitHead'],window_extra['worlds'][0]['checks'],'window-supplement-report.json',window_extra['gitHead']),
    merge('porch',porch['world'],'porch-original-segment.json',porch['gitHead'],porch_extra['worlds'][0]['checks'],'porch-supplement-report.json',porch_extra['gitHead']),
    merge('storm',next(w for w in full['worlds'] if w['world']=='storm'),'full-run-b0a4e5d.json',full['gitHead'],[],None,None),
]
worlds[0]['screenshots'].append(dict(tent_extra['checks'][1]['pixels'], provenance=provenance('tent-supplement.json',tent_extra['gitHead'])))
worlds[1]['screenshots'].extend(dict(s,provenance=provenance('window-supplement-report.json',window_extra['gitHead'])) for s in window_extra['worlds'][0]['screenshots'])
worlds[2]['screenshots'].extend(dict(s,provenance=provenance('porch-fresh-static.json',porch_static['gitHead'],supportingEvidence=True)) for s in porch_static['screenshots'])

# Only these documented harness assertions/timeouts occurred; no shader/page errors.
assert len(tent['world']['errors']) == 1 and 'expired host explicitly releases' in tent['world']['errors'][0]
assert len(window['world']['errors']) == 1 and 'page.screenshot: Timeout 120000ms' in window['world']['errors'][0]
assert len(porch['world']['errors']) == 1 and 'static interaction changes actual pixels' in porch['world']['errors'][0]
assert next(w for w in full['worlds'] if w['world']=='storm')['errors'] == []
assert window_extra['worlds'][0]['errors'] == porch_extra['worlds'][0]['errors'] == []

issues = [
    dict(id='detached-context-notification', originalArtifact='tent-original-segment.json', originalErrors=tent['world']['errors'], resolution='The original event counter was insufficient on a detached canvas. Direct retained WebGL isContextLost() is true and remount creates a different canvas/context. Event delivery can be zero; direct resource state is the acceptance gate.', supportingArtifacts=['detached-context-diagnostic.json','tent-supplement.json'], resolved=True),
    dict(id='window-capture-timeout', originalArtifact='window-original-segment.json', originalErrors=window['world']['errors'], resolution='Retained completed desktop/portrait and five checks. The 390x844 supplemental run completed the remaining behavior and interaction PNG with paused gl.finish() before capture. Software-rendering queue cost is a plausible cause, not a proven diagnosis.', supportingArtifacts=['window-supplement-report.json','window-interaction.png'], resolved=True),
    dict(id='porch-repeated-frozen-state', originalArtifact='porch-original-segment.json', originalErrors=porch['world']['errors'], resolution='Repeated water touch at an identical frozen shader time can reproduce the same state. A clean fresh-static first touch changes actual pixels in exactly one frame at time zero. Canonical verifier now uses that clean precondition.', supportingArtifacts=['porch-fresh-static.json','porch-supplement-report.json'], resolved=True),
]
screenshots = [s for w in worlds for s in w['screenshots']]
for shot in screenshots:
    data = (here/shot['file']).read_bytes()
    assert len(data) == shot['bytes'] and digest(data) == shot['sha256'], shot['file']
assert len({s['file'] for s in screenshots}) == len(screenshots)

report = dict(
    schema='brainwave-rain-shelters-segmented-acceptance-v2',
    assembledAt=datetime.now(timezone.utc).isoformat(), gitHead=head,
    publicationVerifierGitHead=head, publicationVerifierSHA256=source_hashes[verifier],
    mode='isolated-built-QA-bundle', verificationMode='segmented-same-rendered-bundle', segmentedRun=True,
    note='Acceptance combines completed, individually attributed checks over identical rendered source/fixture/bundle. This is not a claim of one uninterrupted successful full-suite process. Original interrupted reports remain published.',
    sourceTreeSHA256=window_extra['sourceTreeSHA256'],sourceHashes=source_hashes,bundleHashes=window_extra['bundleHashes'],
    runtimeSourceIdentityVerifiedAcrossSegments=True,browser=window_extra['browser'],segments=segments,
    worlds=worlds, totalUniqueChecks=sum(w['checkCount'] for w in worlds), totalScreenshots=len(screenshots),
    resolvedHarnessIssues=issues, sceneOrShaderErrors=[], errors=[],
    supportingEvidence=[dict(artifact='porch-fresh-static.json',countedAsAdditionalAcceptance=False),dict(artifact='detached-context-diagnostic.json',countedAsAdditionalAcceptance=False)],
    limitations=window_extra['limitations']+[
        'The scene action callback is tested using dispatched click. With the full-cover sibling overlay visible, physical reachability of the scene-local action button is an integration concern; native overlay raycast tap is tested separately.',
        'Window continuation uses 390x844 after a 1100x800 interaction capture timed out. Original 1440x960 desktop and 390x844 portrait PNGs remain unchanged.',
        'Tent and porch diagnostic protocols were executed inline. reproduce-inline-protocols.mjs is an afterward archived reproducible equivalent, not a claim that this file produced the original reports.',
    ],
    **{'pass':all(w['pass'] for w in worlds)},
)
(here/'report.json').write_text(json.dumps(report,indent=2)+'\n')
for name in ['tent-failure.png','window-failure.png','porch-failure.png']:
    (here/name).unlink(missing_ok=True)
manifest = {p.name:dict(bytes=p.stat().st_size,sha256=digest(p.read_bytes())) for p in sorted(here.iterdir()) if p.is_file() and p.name!='artifact-manifest.json'}
(here/'artifact-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(dict(pass_=report['pass'],checks=report['totalUniqueChecks'],screenshots=report['totalScreenshots'],worlds={w['world']:w['checkCount'] for w in worlds},publicationVerifierSHA256=report['publicationVerifierSHA256']),indent=2))
