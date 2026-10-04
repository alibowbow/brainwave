# Temple / Scops 환경맵 호환성 보완

2026-10-04, 같은 Work·기존 draft PR66의 한정 후속 작업. 승인된 시각 품질은 추가 수정하지 않았다. 최종 고정 source에서 정상/강제 byte 두 장면 **전체 회귀 4회 PASS**, Rural 실제 보존 캡처 3장 PASS. 초기 실패 2건은 별도 이력과 원본 JSON에 그대로 남긴다.

## 정확한 검증 대상

- 승인 기준: `174aa43bffa4ead7723dfc7c4c6f9a86e35f8600`
- 최종 실제 검증 source: `cb0e122e6d7a5f9b65b60f0b0237440ba0ecf935`
- 전체 source tree: `6d1a59833493763c69c0cfb396ce2b54a5abab90`
- source manifest SHA-256: `84843d154aa2e16001ef395ce9c3ebaff459ce0abf104350e86785dc06a2bc57`
- built harness manifest SHA-256: `6836f96e84950d3716c3ac2ecef1cb0442235746929791d9f919328cbb99ff73`
- 실제 Three: `0.186.1`, dependency manifest SHA-256: `b36cdb5da45b3a221db3e501ade49f8ec899d08c45ab56b961414b3cc9364023`

[최종 전체 manifest/19개 PNG 해시/실측 결과](qa/evidence/environment-retained/verification-summary.json) · [원본 픽셀 비교 manifest](qa/evidence/environment-retained/comparisons/comparison-manifest.json) · [보존 범위 증거](qa/evidence/environment-retained/scope-preservation.json).

각 원본 실행 JSON은 정확한 repository HEAD, source 파일별 SHA-256, bundle 파일별 SHA-256, Three 소스 해시, PNG SHA-256, 실제 FBO/GL/상태 기록을 가진다. 네 전체 실행과 Rural 캡처의 source/bundle/dependency는 모두 같으며 실행 전후 불변이었다. 마지막 증거 커밋은 이 source 위에 보고서·PNG·JSON·로그만 더한다. 게시된 정확한 최종 head와 최신 CI 결과는 PR66 본문에서 확인한다.

## 최소 구현과 실패 정책

`environment.ts`가 원래 equirectangular CanvasTexture를 첫 `compileAsync` 전에 checked CubeUV로 준비한다. 내부 WorldEngine 변경은 factory에 이미 존재하는 renderer를 전달하는 2곳뿐이다. Temple/Scops의 gradient, sRGB 입력, environmentIntensity(.7/.28), 카메라·재질·조명·기하·상호작용 코드는 그대로다.

| 장면 | 원래 입력 | native cube 크기 | output와 ping-pong 각각 |
| --- | --- | --- | --- |
| Temple | 512×256 | 128 | 384×512 |
| Scops | 256×128 | 64 | 336×256 |

실제 `EXT_color_buffer_float` 또는 `EXT_color_buffer_half_float`가 있으면 HalfFloat 후보를 사용한다. 광고만 신뢰하지 않고 원래 native r186 CPU target descriptor 생성 직후, **첫 GPU allocation/conversion/GGX draw 전에** output와 ping-pong 양쪽의 RGBA16F/RGBA8 타입을 정한다. 양쪽 실제 전체 크기 저장소를 bind해 `checkFramebufferStatus`와 GL error를 검사한 뒤에만 native PMREM 계산을 진행한다. descriptor 설정은 첫 allocation 전이며, 생성된 HalfFloat texture.type만 사후 변경하는 방식이 아니다.

extension 없음 또는 HalfFloat target incomplete/GL 실패이면 실패 output·generator/ping-pong을 폐기하고 새 UnsignedByte target들을 같은 해상도·동일 native convolution으로 생성/검사한다. QA의 `forced-byte`는 실제 byte 정책을 처음부터 선택한다. extension/GL 결과를 속이지 않는다. 최종 byte까지 실패하면 예외와 기존 명시적 실패 UI로 전달하며 환경 반사를 조용히 제거하지 않는다. target/cube face/mip/XR/autoClear/toneMapping은 검사 및 전체 generation 성공/실패 뒤 복원한다.

성공한 output·source·generator의 ping-pong/LOD/filter 재료는 원래 자동 PMREM에 가까운 수명으로 장면 종료까지 유지하고 owned `dispose`에서 해제한다. 실패 attempt는 즉시 해제한다. 중복 dispose는 무효다. 정상 scene.environment는 CubeUV mapping 306이며 WebGLEnvironments의 자동 PMREM 진입을 우회한다. `environment=null`, DPR/target 축소, 24fps 제한, 반사 제거는 없다.

이 adapter는 native r186 `_allocateTargets`의 CPU-only 계약에 의존한다. unit은 실제 설치된 PMREM 파일 SHA-256 `78f7cc24a9aa22852f4c46052f39e5fe5507bee6313a824851ba899ed2219ecc`를 고정하고 GPU 접근 전 descriptor 생성, layout, draw 순서 및 실제 WebGLEnvironments CubeUV 통과를 검사한다. Three 변경 시 재검토해야 한다. 사용자 지적의 공식 [WebGLEnvironments](https://raw.githubusercontent.com/mrdoob/three.js/r186/src/renderers/webgl/WebGLEnvironments.js) / [PMREMGenerator](https://raw.githubusercontent.com/mrdoob/three.js/r186/src/extras/PMREMGenerator.js)와 실제 설치본을 검토했다. 저장소의 다른 owner checked-byte 구현은 읽기 참고만 했고 수정·복사하지 않았다. 외부 자산/서비스/토큰은 추가하지 않았다.

## 실제 픽셀

주 작성자가 아래 정상/byte desktop·portrait 8개 PNG와 Rural 새 desktop·portrait를 직접 열어 확인했다. 정상 두 장면 desktop/portrait 4장은 승인 PNG와 **파일 해시 및 모든 RGB 픽셀이 완전히 동일**하다. byte 4장은 최대 채널 차이 **1/255**이며, 원래 구도·국소빛·청동/녹청·소쩍새 크기·간접광과 반사를 유지한다. 같은 native 해상도/필터에서 저장 정밀도가 byte인 경로다. 비교 PNG는 원본 크기 그대로 3열 배치하고 원본 바깥에만 라벨을 붙였으며 보간/강조/보정하지 않았다.

| 장면/viewport | 정상 실제 PNG | 강제 byte 실제 PNG | 승인/정상/byte 비교 | byte 평균 절대 채널 차이 (0–255) |
| --- | --- | --- | --- | ---: |
| temple/desktop | [PNG](qa/evidence/environment-retained/normal/temple-desktop.png) | [PNG](qa/evidence/environment-retained/forced-byte/temple-desktop.png) | [비교](qa/evidence/environment-retained/comparisons/temple-desktop-baseline-normal-byte.png) | 0.01526659 |
| temple/portrait | [PNG](qa/evidence/environment-retained/normal/temple-portrait.png) | [PNG](qa/evidence/environment-retained/forced-byte/temple-portrait.png) | [비교](qa/evidence/environment-retained/comparisons/temple-portrait-baseline-normal-byte.png) | 0.01567323 |
| scops/desktop | [PNG](qa/evidence/environment-retained/normal/scops-desktop.png) | [PNG](qa/evidence/environment-retained/forced-byte/scops-desktop.png) | [비교](qa/evidence/environment-retained/comparisons/scops-desktop-baseline-normal-byte.png) | 0.01379759 |
| scops/portrait | [PNG](qa/evidence/environment-retained/normal/scops-portrait.png) | [PNG](qa/evidence/environment-retained/forced-byte/scops-portrait.png) | [비교](qa/evidence/environment-retained/comparisons/scops-portrait-baseline-normal-byte.png) | 0.01145340 |

Rural `scenes/rural.ts`, default entry, 승인 PNG 4개는 기준 commit/source/workspace 바이트가 동일하다. 새 [desktop](qa/evidence/environment-retained/rural/rural-desktop.png), [portrait](qa/evidence/environment-retained/rural/rural-portrait.png), [Fold viewport](qa/evidence/environment-retained/rural/rural-fold.png)도 기존 승인 PNG와 파일 해시·RGB가 완전히 동일하다. 원본 이미지·toon·구름·색·구도는 수정하지 않았다. 이번 Rural 실행은 캡처 전용이며 전체 lifecycle을 새로 실행했다고 주장하지 않는다.

## 최종 검증 결과

| 검증 | 결과 |
| --- | --- |
| Typecheck | PASS |
| 전체 unit | 25파일 / 171테스트 PASS |
| 환경 정책 unit | 위 171개 중 21개 PASS: no-extension, float-only, half-only, 강제 byte, 광고 후 output 또는 ping-pong incomplete, 최종 byte 실패, draw 예외/GL error, 상태복원·수명/중복 해제 |
| 앱 build / bundle / 독립 harness build | 모두 PASS; 초기 JS 402.6/410 KiB, CSS 99.6/135 KiB |
| 정상 Temple / Scops | 각각 전체 PASS |
| 강제 byte Temple / Scops | 각각 전체 PASS |
| Rural 새 캡처/승인본 보존 | PASS (3개 새 PNG, 기존 source/entry/4개 PNG 바이트 보존) |

[build gate 원본 로그](qa/evidence/environment-retained/build-gates.log).

실제 Chromium 153.0.8010.0 / ANGLE SwiftShader의 정상 경로는 두 color-buffer extension을 실제 제공했으며 양쪽 target은 RGBA16F, byte 경로는 RGBA8이었다. output/ping-pong 모두 **FRAMEBUFFER_COMPLETE(36053), GL errors=[]**. generation과 최종 scene.environment, disposal 후 재생성·static 첫 프레임까지 확인했다. 실제 byte cube FBO face=2/mip=1 및 XR=true/autoClear=false/Reinhard sentinel 전후의 target·face·mip·렌더러 상태와 호출자 상태가 모두 복원됐다. sentinel은 별도 QA gradient이며 장면 PNG로 포장하지 않는다.

모든 네 full 실행에서 실제 mouse tap·drag 및 CDP touch drag, button/input/link/5종 role 제외, pointer capture와 해제·pointercancel/blur/lost capture, covered holder의 tap/drag 무반응, holder 3회 왕복/단일 listener, pause/reduced-motion/static/synthetic hidden, 빠른 remount3회, 실제 disposal 뒤 새 canvas, static first frame, AudioContext 생성 0을 통과했다. default entry의 유일한 필수 prop은 `active:boolean` 그대로다. shared host/player/registry/audio, 보호 장면 및 패키지·CI 설정은 수정하지 않았다.

캡처 viewport는 desktop1365×900, portrait390×844, Fold 크기960×700, 초기 chrome1365×900이다. 기존 lifecycle viewport683×450와 QA scheduler/실제 timestamp의 11개 cooldown 렌더는 그대로다. 첫 motion은 native RAF이고 이후 QA held/step 방식은 보고서에 명시한다. 실제 앱 FPS를 낮춘 것이 아니다. 20초 cleanup 관측/60초 composited screenshot 제한은 늘리지 않았다.

## 5초 grace와 실제 cleanup

아래 값은 각 브라우저 page의 실측 ms다. grace는 unmount 요청부터 cleanup 진입, cleanup은 WorldEngine.dispose의 실제 동기 반환까지이며 context lost는 별도 실제 이벤트다. 물리 GPU 메모리 회수 시각이 아니다.

| 실행 | grace | 동기 cleanup | unmount→context lost | raw JSON |
| --- | ---: | ---: | ---: | --- |
| temple / normal | 5000.9 | 3614.5 | 8616.1 | [JSON](qa/evidence/environment-retained/normal/verification-temple.json) |
| scops / normal | 5001.5 | 1807.5 | 6809.5 | [JSON](qa/evidence/environment-retained/normal/verification-scops.json) |
| temple / forced-byte | 5002.0 | 3502.1 | 8505.0 | [JSON](qa/evidence/environment-retained/forced-byte/verification-temple.json) |
| scops / forced-byte | 5001.3 | 1569.0 | 6571.1 | [JSON](qa/evidence/environment-retained/forced-byte/verification-scops.json) |

## 실패 이력과 미검증

게시 전 artifact 검수에서 Scops desktop 비교 PNG 1개의 decode/hash 불일치를 발견했다. 원본 캡처는 모두 정상이었으며 동일 스크립트로 비교를 재생성한 뒤 4개 패널의 decode/hash 및 원본 RGB crop 일치를 확인했다. [교정 기록](qa/evidence/environment-retained/comparison-artifact-repair.json).

[이전 실행의 정확한 원본/해시/진단 보고서](qa/evidence/ENVIRONMENT_PRIOR_RUNS.md)를 보존한다. 초기 source7abe의 정상 Temple은 20초 disposal gate 실패(이후 관측 cleanup25,499.7ms), QA 계측 source de0의 정상 Temple은 60초 합성 screenshot gate 실패였다. 같은 de0에서 다른 full3회와 분리 진단14주기는 통과했다. 진단은 full 실패를 대체하지 않는다. gl.finish가 빠르게 반환해도 forceContextLoss 지연이 남았으므로 단순 렌더 backlog 원인을 입증하지 못했다.

최종 source는 성공 PMREM 자원을 장면 종료까지 유지하도록 수명만 정렬했고, 그 source의 full4회는 각 한 번의 고정 실행으로 모두 통과했다. 위 실패를 지우거나 timeout을 늘리거나 pass까지 반복하지 않았다. 현재 통과만으로 이전 지연의 인과 원인 또는 모든 장치에서의 해결을 주장하지 않는다.

- **실물 미지원 장치, 실물 Fold, 실제 FPS·발열·배터리, GPU 드라이버 메모리 회수 시각, 청음**은 미검증이다.
- no-extension/half-only/advertised-incomplete/최종 byte 실패는 실제 native PMREM을 쓰는 controlled renderer/GL 경계 unit 정책검사다. 실제 브라우저에서 extension이나 GL을 위조한 검사가 아니며 물리 미지원 GPU 재현을 주장하지 않는다.
- headless actual tab-hide는 관측되지 않았다. hidden 회귀는 명시된 synthetic visibilitychange다.
- 현재 앱의 shared 연결/최종 통합은 별도 Work다. 독립 harness는 실제 Korean entries를 사용하지만 production registry 통합을 대신하지 않는다.
- 새 권한·외부 유료서비스·공유 설정 변경·오디오 생성 없음. 기존 draft PR66만 fast-forward 업데이트하며 원래 PR57/main merge/force push/수동 배포는 하지 않는다. 게시 직전 head guard와 게시 후 최신 CI는 PR66 본문에 별도 확정한다.
