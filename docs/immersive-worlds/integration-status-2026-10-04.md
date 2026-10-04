# Brainwave 30장면 통합 현황

검증 기준 부모 core는 `693f49529e0d5194710dbd8df10c59058491019c`이며, 이 문서는 그 이후 통합 checkpoint의 증거와 남은 게이트를 기록한다. main `14940149`와 protected rainyWindow/oilSea44파일·두poster, 총46파일은 정확히 보존됐다. **최종 main merge는30장면과 공유 App의 기술 릴리스 게이트 완료까지 보류한다.**

**30/30 lazy 연결. 26장면 실제 시각 증거를 수용했다. Rain: visual refinement and final acceptance pending.** 11그룹 소유폴더14곳·1161파일이 아래 최종 수령 owner tree에 정확히 일치한다. 모든 default entry의 유일한 필수 prop은 `active:boolean`이다. 전체 SHA/tree/파일수와 이전 실패는 [JSON](./integration-intake-2026-10-04.json)에 보존한다.

| ID | Default entry | 수령 PR / exact head | 시각 상태 | 남은 기능·소스 게이트 |
|---|---|---|---|---|
| `amb:morning_forest` | `forest/ForestWorld.tsx` | #63 `7382d7c8` | 코디네이터 픽셀 수용 | App native 회귀 대기; CI Forest 통과 |
| `amb:focus_cafe` | `cafe/CafeWorld.tsx` | #50 `e2cc261c` | 코디네이터 픽셀 수용 | App 오디오9검사 통과; native 전체 흐름 대기 |
| `amb:cosmic` | `cosmic/CosmicWorld.tsx` | #52 `c9383a07` | 코디네이터 픽셀 수용 | App cold 관측 CI 수정 검증 대기 |
| `amb:night_pond` | `waterEdge/NightPondWorld.tsx` | #64 `d5f00475` | 코디네이터 픽셀 수용 | 20s owner lifecycle 해소; App 전환 응답성 대기 |
| `nature:summer_valley` | `waterEdge/SummerValleyWorld.tsx` | #64 `d5f00475` | 코디네이터 픽셀 수용 | 20s owner lifecycle 해소; App 전환 응답성 대기 |
| `nature:pebble_shore` | `waterEdge/PebbleShoreWorld.tsx` | #64 `d5f00475` | 코디네이터 픽셀 수용 | 20s owner lifecycle 해소; App 전환 응답성 대기 |
| `amb:waterfall_valley` | `deepWater/WaterfallWorld.tsx` | #62 `3ecff289` | 코디네이터 픽셀 수용 | App native/lifecycle 대기 |
| `amb:cave_meditation` | `deepWater/CaveWorld.tsx` | #62 `3ecff289` | 코디네이터 픽셀 수용 | App native/lifecycle 대기 |
| `nature:deep_sea` | `deepWater/DeepSeaWorld.tsx` | #62 `3ecff289` | 코디네이터 픽셀 수용 | App native/lifecycle 대기 |
| `relax` | `cozyRooms/HearthWorld.tsx` | #65 `f1540653` | 코디네이터 픽셀 수용 | Winter120s 재생성 실패; 같은 owner 진단 중 |
| `sleep_prep` | `cozyRooms/SleepRoomWorld.tsx` | #65 `f1540653` | 코디네이터 픽셀 수용 | Winter120s 재생성 실패; 같은 owner 진단 중 |
| `power_nap` | `cozyRooms/NapTerraceWorld.tsx` | #65 `f1540653` | 코디네이터 픽셀 수용 | Winter120s 재생성 실패; 같은 owner 진단 중 |
| `nature:winter_lodge` | `cozyRooms/WinterLodgeWorld.tsx` | #65 `f1540653` | 코디네이터 픽셀 수용 | Winter120s 재생성 실패; 같은 owner 진단 중 |
| `nature:tent_rain` | `rainShelters/RainTentWorld.tsx` | #53 `0dc8e935` | 보류 | visual refinement and final acceptance pending |
| `nature:window_rain` | `rainShelters/GardenWindowWorld.tsx` | #53 `0dc8e935` | 보류 | visual refinement and final acceptance pending |
| `nature:monsoon_eaves` | `rainShelters/MonsoonPorchWorld.tsx` | #53 `0dc8e935` | 보류 | visual refinement and final acceptance pending |
| `amb:summer_storm` | `rainShelters/SummerStormWorld.tsx` | #53 `0dc8e935` | 보류 | visual refinement and final acceptance pending |
| `country_morning` | `livingWoods/MorningPorchWorld.tsx` | #67 `02fa38c6` | 코디네이터 픽셀 수용 | App native/lifecycle 대기 |
| `amb:rainy_forest` | `livingWoods/RainyForestWorld.tsx` | #67 `02fa38c6` | 코디네이터 픽셀 수용 | App native/lifecycle 대기 |
| `amb:deep_forest` | `livingWoods/AncientForestWorld.tsx` | #67 `02fa38c6` | 코디네이터 픽셀 수용 | App native/lifecycle 대기 |
| `nature:bamboo_grove` | `livingWoods/BambooWorld.tsx` | #67 `02fa38c6` | 코디네이터 픽셀 수용 | App native/lifecycle 대기 |
| `nature:temple_dawn` | `koreanPlaces/TempleWorld.tsx` | #66 `4b5f23ae` | 코디네이터 픽셀 수용 | 좁은 PMREM 호환성 해소; App 게이트 대기 |
| `nature:scops_night` | `koreanPlaces/ScopsNightWorld.tsx` | #66 `4b5f23ae` | 코디네이터 픽셀 수용 | 좁은 PMREM 호환성 해소; App 게이트 대기 |
| `nature:rural_summer_night` | `koreanPlaces/RuralSummerNightWorld.tsx` | #66 `4b5f23ae` | 코디네이터 픽셀 수용 | Rural은 PMREM 교정 대상 제외; App 전환/해제 대기 |
| `amb:campfire_night` | `nightFires/MountainCampfireWorld.tsx` | #60 `3ad1292f` | 코디네이터 픽셀 수용 | App native/lifecycle·transmission 관측 대기 |
| `amb:deep_night` | `nightFires/DeepNightWorld.tsx` | #60 `3ad1292f` | 코디네이터 픽셀 수용 | App native/lifecycle·transmission 관측 대기 |
| `nature:campfire` | `nightFires/LakesideCampWorld.tsx` | #60 `3ad1292f` | 코디네이터 픽셀 수용 | App native/lifecycle·transmission 관측 대기 |
| `meditation` | `quietSanctuaries/MeditationCourtWorld.tsx` | #55 `215f9c84` | 코디네이터 픽셀 수용 | 좁은 호환성 해소; App native/lifecycle 대기 |
| `nature:womb` | `quietSanctuaries/WarmHeartWorld.tsx` | #55 `215f9c84` | 코디네이터 픽셀 수용 | 좁은 호환성 해소; App native/lifecycle 대기 |
| `amb:snowy_night` | `quietSanctuaries/SnowVillageWorld.tsx` | #55 `215f9c84` | 코디네이터 픽셀 수용 | 좁은 호환성 해소; App native/lifecycle 대기 |

## 완료한 실제 App 검증

- 현재 Quiet215/Waterd5/Cozyf154/Korean4b5 및 중앙 위치 보정의 **639 tests/67files·typecheck·build·bundle/PWA gate 통과**. 초기 JS408.9/410KiB, CSS101.0/135KiB, `index-BIpQoT7O.js`. [단위검사](./integration-qa/korean-final-unit.log) · [빌드](./integration-qa/korean-final-build.log). 공개693의535개 검사는 과거 checkpoint로 분리한다. first-render identity 재검사와 동기 실패9회귀는 독립 검수에서도 해소.
- **Cafe portrait 실제 입력·촬영15단계 통과, 전체 실행은 종료 실패 유지.** Player/몰입의 visible mouse와 hidden native touch는 각각1callback, 왕복 drag/cancel과 controls는0callback, detailsOpen은 실제205px 스크롤·callback0·원위치 복귀, modal은 실제5개 focus 대상의 Tab/Shift+Tab 순환, held touch 중 Escape는 같은 canvas를 유지하며0callback이다. 실제 PNG2장을 열었고19개 응답은 고정 dist와 별도 비교해 일치했다. 마지막 browser graceful close가10초를 넘겨 소유 process의 종료만 강제 확인했다. 정상 lifecycle/실기기 성능 통과로 확대하지 않는다. [원본](./integration-qa/native-cafe-full/results.json) · [요약](./integration-qa/native-cafe-full/review-summary.json) · [별도 build 비교](./integration-qa/native-cafe-full/served-build-comparison.json).
- **30/30 normal portrait390×844 cold 첫 정지 프레임,391검사·30nativePNG 통과.** 사용자 활성화 false, 입력/scene callback0, source/dist/served hashes 일치. 모든 실제 이미지를 열어 빈 화면·오류 fallback·동일 placeholder를 찾지 못했다. [갤러리](./integration-qa/cold-693/gallery.html) · [결과](./integration-qa/cold-693/results.json) · [픽셀 검수](./integration-qa/cold-693/visual-review.json). 이는693 runtime의 증거이며 새 Water/Cozy tree의 현재 실행으로 바꾸어 표시하지 않는다. Desktop/forced-byte/active/lifecycle 통과도 뜻하지 않는다.
- **실제 App 오디오9/9 통과**: 하나의 기존 AudioContext/bgBus, 실제 컵1tap→1callback→quiet cue, 전체/출처 음소거와 복원, 편집한 Window.17/Pink.04의 정지·재개 보존, 사용자 저장/최근 세션의 커스텀·mute 보존, 실제503 음원 실패와 남은 pinkPCM, pending-start 중 native축소 및 늦은 context복귀 무반응. source/build 안정,82served해시 일치, page/cleanup error0. [결과](./integration-qa/audio-full-run4-fixed.json). 실행 소스는693+Player의 아래 layout 수정이며 이후 Water/Cozy 인수 이전이다.30믹스 청음 승인은 아니다.
- **중앙 믹서 clipping 해결**: nativewheel 최하단에서도 안 눌리던 Pink는 부모 aside가 내부 viewport53px를 자르는 실제 결함이었다. desktop flex 높이 배분으로 내부524px가 부모 안에 맞으며 Pink중앙 y721이 실제 INPUT을 hit한다. [수정 전 실패](./integration-qa/audio-clip-run2.json) · [수정 후 통과](./integration-qa/audio-clip-run3-fixed.json). 렌더러/재질/해상도 변경 없음.

## 실패와 남은 경로

1. **693 CI37238088035 전체 실패**: unit/build/bundle와 Forest는 통과했다. Nature13장면·세로/가로 이미지·편집/복원·rural 기능을 마친 뒤20초 context-loss gate 실패. 누락된 context별 증거 때문에 특정 owner에 귀속하지 않는다. 같은 페이지 reload 뒤 만들어진 context들만 해당하므로 모든13의 정리 실패라고도 표현하지 않는다. Audio/Cafe/Cosmic은 최초 blocked-autoplay 관측에서 실패했다. 실제 입력 전 Playwright 관측이 활성화를 준 증거가 있어 rawCDP 관측으로 QA를 보정 중이며 기존 PCM/retry/history/renderer 게이트는 유지한다. Nature 첫 명령 실패로 보호focus/sea/links는 이 CI에서 실행되지 않았다. 다음 workflow는 독립 step과 JSON artifact를 보존한다.
2. **Waterd5 fixed20s lifecycle 해소**: 소스13/harness5/최종24보고서·28PNG·보존40증거 해시 확인, 승인10stills 바이트 동일. normal16.2501/7.7436s, byte5.0389/5.3272s; active2frame 정상/byte5.0204/5.0186s. 과거c6의36.8076/45.4897초 실패와 중간23.8308초 실패는 삭제하지 않는다. **normal 첫dispose11.249초 동기 정체/heartbeat11.2445초는 별도 App 응답성 한계**이며 smoothUI/실기기 성능으로 해석하지 않는다. [인수 감사](./integration-qa/water64-d5f0047-intake.md).
3. **Cozyf154 원래 Winter120초 실패 유지**: 동일 DPR/size 생략은 유효하고10coldPNG 동일. 앞3장면78검사 후 원래 긴sequence 재생성 실패는 별도 clean2cycle 성공으로 해소되지 않는다. 기존 구현의 oldGPU완료/새context firstdraw의 좁은 GL 진단을 계속한다. [인수 감사](./integration-qa/cozy65-f154-readonly.md).
4. **Quiet215 / Korean4b5의 좁은 호환성 해소**: Quiet의23source·12PNG와6acceptedstills 바이트 보존, normal/byte 실제 fullsize FBO36053/GL0·state복원·각15life묶음을 독립 확인하고 인수했다. r186private adapter는 Three업그레이드 때 재검증한다. Korean sourcecb0e122의 normal/byte Temple·Scops4fullrun은 오류0, output/ping-pong fullsizeFBO36053·상태복원을 기록했다. 정상4stills와 Rural3stills는 이전과 동일하며 실제byte4뷰의 RGB최대차이는1/255다. 이전20초폐기·60초캡처 실패는 보존한다. Rural의 새 full lifecycle 검증은 아니다. Forest/Cosmic/Living의 기존 byte 증거를 취소하지 않는다.
5. **Rain4**: visual refinement and final acceptance pending.
6. **실제 native 전체 흐름**: Cafe의 위15개 단계는 확인했지만 정상 browser 종료와 다른 owner/Nature 경로의 최종 App 게이트는 남아 있다. Back/Forward·저장/rename·retry·급한교체/lateinit/disposal과 보호2의 최종 회귀도 별도 완료가 필요하다. 과거 hidden touch180초 및 최신cleanup10초 실패는 모두 보존한다. 한 세계의 통과를30개 전체로 확대하지 않는다.


물리기기·실제FPS/발열·실청음은 수행하지 않았다. 독립 harness/wrapper 증거와 실제 App 게이트를 구분한다. 전체30장면 기술 릴리스 게이트는 별도로 완료해야 한다.

## 후속 사실 정정과 좁은 관측

- 실제 Winter→Rural→이탈에서 Winter는21.3233초에 context가 살아 있고 Rural은5.0094초에 trustedcontextloss를 냈다. Cozy의 현재dispose는 자원/renderer.dispose를 호출하고 **context를 browser에 맡기는 의도된 경로**다. 관찰자가 canvas/GL의 강한 참조를 유지하므로 GC반환을 이 테스트의 성공 경로로 삼을 수 없다. 이 결과는 명시적 context-loss 계약과의 불일치이며 dispose미실행·물리GPU누수를 입증하지 않는다. 원래 Winter120초 실패를 면제하거나20초기준을 완화하지 않는다. [증거](./integration-qa/winter-rural-context-loss-proof.json).
- 최신 nativeCafe 실패에는9touch의 실제 hold시간708–1817ms가 기록됐다. 모두 기존600ms tapcutoff보다 길어0callback은 현재계약과 맞는다. start응답을 기다리는 검사 대신 설치된 Playwright공식구현처럼 짧은native start/end를 큐에 넣고 실제이벤트시간을 검증한다. 기준을 늘리거나 실패를 소급pass로 바꾸지 않는다. [원래실패](./integration-qa/native-cafe-afterlayout-failed.json)·[triage](./integration-qa/native-cafe-touch-triage.json).
- Scops의 실제 새가 왼쪽·물이 오른쪽인 구도에 맞춰 lazy 중앙 bridge만 보정했다. owner프로필23파일과 초기음량/저장믹스/보호2를 보존하며7unit이 통과했다. 최신 run5에서 실제 primary 내부+.5/외부−.38769, 독립적으로 식별한 stream+.32287을 확인했으나 PCM 관측5초·정상 browser 종료15초 제한을 넘겼다. 방향성 PCM·청음·최종 오디오 완료로 표시하지 않는다. [실패 원본](./integration-qa/audio-run5-scops/results.json) · [해석](./integration-qa/scops-retention-and-next-gates.md).
- Night의 약한 transmission은 DeepNight/Lakeside 랜턴 유리에만 있다. Three r186은 half/float 확장이 모두 없으면 byte를 선택하고 target/face/mip를 정상 복원한다. 실제 불완전 FBO는 관측되지 않았으며, 별도 forced-byte/FBO 증거는 미검증 목록에 남긴다. 새 renderer 교정이나 미감 차단 사유로 확대하지 않는다. [소스별 범위](./integration-qa/night-transmission-inventory.md).

- 최신 공유 오디오9/9도 정상 종료했다. [run6](./integration-qa/audio-run6-latest9/results.json) · [검증 범위](./integration-qa/audio-latest9-checkpoint.md). 실행은 최종 Korean 인수 전 `index-DFSibu4A.js`이며 현재 새 빌드로 소급 표시하지 않는다. 17개 추적 소스와82응답 해시가 일치했고 page/cleanup 오류0이다.

- 현재 Korean4b5를 포함한 `index-BIpQoT7O.js`에서 Scops 실제 PCM 방향 검사를 통과했다. 자연 호출2회/표본4개에서 내부R/L5.828, 외부L/R1.463, 물소리103window·4.899초에서R/L2.065였다. source17개·응답18개 해시가 일치했다. 마지막 browser process close15초는 실패했고 앱 graph teardown은 입증하지 못했다. [run7 원본](./integration-qa/audio-run7-scops/results.json) · [범위와 한계](./integration-qa/scops-run7-checkpoint.md).

Korean 최종 [인수 검토](./integration-qa/korean4b5-intake.md)는23source·90artifact·19PNG를 독립 대조했다. qa/dist의6개 번들 바이너리는 저장소에 없어 raw report의 manifest 일관성까지만 확인했다. 정확한 owner head CI37241927168은 성공이다.
