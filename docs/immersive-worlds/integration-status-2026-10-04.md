# Brainwave 30장면 인수·검증 현황

UTC 2026-10-04T21:45:04.750437+00:00. Core `7abc25ab` 이후 **미커밋 작업 트리**를 읽었다. main `14940149`/PR51을 보존한다. root가 단독 공유 코어 writer다. 이 표의 owner 무결성 감사와 아래 실제 App 검증을 구분한다.

**30/30 등록, 사용자 시각 수용26개·Rain4개 보류.** Living#67 `02fa38c6`의4개도 반영됐다.11그룹 소유폴더14곳·893파일의 내용/파일모드와 경로 집합이 각 정확한 owner head에 일치한다. 보호 rainyWindow/oilSea44파일+두poster, 총46파일도 main과 바이트 동일하다. 기본 경로는 `components/immersiveWorlds/`이며 모든 entry의 필수 prop은 `active:boolean` 하나다. 전체SHA/tree/entry해시는 동명JSON에 있다.

| ID | Default entry | 수령PR / exact head | 소스/등록 | 시각 상태 | 남은 기능·소스 게이트 |
|---|---|---|---|---|---|
| `amb:morning_forest` | `forest/ForestWorld.tsx` | #63 `7382d7c8` | 정확 일치·등록 | 사용자 수용 | App 통합 대기 |
| `amb:focus_cafe` | `cafe/CafeWorld.tsx` | #50 `e2cc261c` | 정확 일치·등록 | 사용자 수용 | App native/audio 대기 |
| `amb:cosmic` | `cosmic/CosmicWorld.tsx` | #52 `c9383a07` | 정확 일치·등록 | 사용자 수용 | App native/lifecycle 대기 |
| `amb:night_pond` | `waterEdge/NightPondWorld.tsx` | #64 `c6cad439` | 정확 일치·등록 | 사용자 수용 | Valley 정리 실패로 그룹 보류 |
| `nature:summer_valley` | `waterEdge/SummerValleyWorld.tsx` | #64 `c6cad439` | 정확 일치·등록 | 사용자 수용 | Valley 정리 실패로 그룹 보류 |
| `nature:pebble_shore` | `waterEdge/PebbleShoreWorld.tsx` | #64 `c6cad439` | 정확 일치·등록 | 사용자 수용 | Valley 정리 실패로 그룹 보류 |
| `amb:waterfall_valley` | `deepWater/WaterfallWorld.tsx` | #62 `3ecff289` | 정확 일치·등록 | 사용자 수용 | App native/lifecycle 대기 |
| `amb:cave_meditation` | `deepWater/CaveWorld.tsx` | #62 `3ecff289` | 정확 일치·등록 | 사용자 수용 | App native/lifecycle 대기 |
| `nature:deep_sea` | `deepWater/DeepSeaWorld.tsx` | #62 `3ecff289` | 정확 일치·등록 | 사용자 수용 | App native/lifecycle 대기 |
| `relax` | `cozyRooms/HearthWorld.tsx` | #65 `6ba4eee6` | 정확 일치·등록 | 사용자 수용 | Winter 재생성 실패로 그룹 보류 |
| `sleep_prep` | `cozyRooms/SleepRoomWorld.tsx` | #65 `6ba4eee6` | 정확 일치·등록 | 사용자 수용 | Winter 재생성 실패로 그룹 보류 |
| `power_nap` | `cozyRooms/NapTerraceWorld.tsx` | #65 `6ba4eee6` | 정확 일치·등록 | 사용자 수용 | Winter 재생성 실패로 그룹 보류 |
| `nature:winter_lodge` | `cozyRooms/WinterLodgeWorld.tsx` | #65 `6ba4eee6` | 정확 일치·등록 | 사용자 수용 | Winter 재생성 실패로 그룹 보류 |
| `nature:tent_rain` | `rainShelters/RainTentWorld.tsx` | #53 `0dc8e935` | 정확 일치·등록 | 보류 | 접근/승인 보류; Window 호환성 |
| `nature:window_rain` | `rainShelters/GardenWindowWorld.tsx` | #53 `0dc8e935` | 정확 일치·등록 | 보류 | 접근/승인 보류; Window 호환성 |
| `nature:monsoon_eaves` | `rainShelters/MonsoonPorchWorld.tsx` | #53 `0dc8e935` | 정확 일치·등록 | 보류 | 접근/승인 보류; Window 호환성 |
| `amb:summer_storm` | `rainShelters/SummerStormWorld.tsx` | #53 `0dc8e935` | 정확 일치·등록 | 보류 | 접근/승인 보류; Window 호환성 |
| `country_morning` | `livingWoods/MorningPorchWorld.tsx` | #67 `02fa38c6` | 정확 일치·등록 | 사용자 수용 | App cold/native 대기 |
| `amb:rainy_forest` | `livingWoods/RainyForestWorld.tsx` | #67 `02fa38c6` | 정확 일치·등록 | 사용자 수용 | App cold/native 대기 |
| `amb:deep_forest` | `livingWoods/AncientForestWorld.tsx` | #67 `02fa38c6` | 정확 일치·등록 | 사용자 수용 | App cold/native 대기 |
| `nature:bamboo_grove` | `livingWoods/BambooWorld.tsx` | #67 `02fa38c6` | 정확 일치·등록 | 사용자 수용 | App cold/native 대기 |
| `nature:temple_dawn` | `koreanPlaces/TempleWorld.tsx` | #66 `174aa43b` | 정확 일치·등록 | 사용자 수용 | App native/PMREM 호환 경로 대기 |
| `nature:scops_night` | `koreanPlaces/ScopsNightWorld.tsx` | #66 `174aa43b` | 정확 일치·등록 | 사용자 수용 | App native/PMREM 호환 경로 대기 |
| `nature:rural_summer_night` | `koreanPlaces/RuralSummerNightWorld.tsx` | #66 `174aa43b` | 정확 일치·등록 | 사용자 수용 | App native/PMREM 호환 경로 대기 |
| `amb:campfire_night` | `nightFires/MountainCampfireWorld.tsx` | #60 `3ad1292f` | 정확 일치·등록 | 사용자 수용 | App; transmission 증거한계 |
| `amb:deep_night` | `nightFires/DeepNightWorld.tsx` | #60 `3ad1292f` | 정확 일치·등록 | 사용자 수용 | App; transmission 증거한계 |
| `nature:campfire` | `nightFires/LakesideCampWorld.tsx` | #60 `3ad1292f` | 정확 일치·등록 | 사용자 수용 | App; transmission 증거한계 |
| `meditation` | `quietSanctuaries/MeditationCourtWorld.tsx` | #55 `c5a10079` | 정확 일치·등록 | 사용자 수용 | App; target 소스검토 |
| `nature:womb` | `quietSanctuaries/WarmHeartWorld.tsx` | #55 `c5a10079` | 정확 일치·등록 | 사용자 수용 | App; target 소스검토 |
| `amb:snowy_night` | `quietSanctuaries/SnowVillageWorld.tsx` | #55 `c5a10079` | 정확 일치·등록 | 사용자 수용 | App; target 소스검토 |

## 현재 검증 상태

- **최신 typecheck, 535 tests / 60 files, build, bundle/PWA guard 통과.** 초기JS408.8KiB/410, CSS101.0KiB/135. Living4개, 첫 render의 host 동일성 재검사, Tab 순환과 이전 세션 재시도의 선택 취소 수정까지 포함한다. served entry는 `index-DE69dX8D.js`다.
- 실제 공유 host에서 첫 `renderFrame(0)` 직후 engine identity를 다시 검사하여 동기 실패/해제 뒤 `ready`를 내보내지 않도록 한 코드와 회귀 테스트가 추가된 것을 읽었다. 동기 첫 render 실패 callback 회귀를 포함한 host9개 검사도 통과했다.
- Living#67 CI37235908064, Forest#63 CI37234134896, Korean#66 CI37235352339, Cosmic#52 CI37235011440의 exact-head success가 확인된 기록을 반영했다. 다른CI도JSON의 관측시점 상태만 기록한다.
- Cafe를 포함한 **실제 최신 App native/audio·30장면 cold 검증은 미완료**다. owner의 standalone harness·wrapper·QA scheduler 및 선택된 passing jobs는 현재 App의 visible/hidden chrome, focus, routing, history, audio와 clean lifecycle 검증을 대체하지 않는다.

## 보류 및 남은 검토

1. **WaterEdge#64 / Valley**: clean normal36.8076s·byte45.4897s가 기존20s 정리 gate를 초과한다. secondcycle/remount 미실행. Pond/shore의 기록된 clean 성공과 분리하며 그룹 최종 승인은 보류한다. 동일 owner가 후속을 맡는다.
2. **Cozy#65 / Winter**: full suite와 단독 retry 모두 recreated-ready120s 실패. 나머지3장면의 완료된 검사와 분리한다. CI나 별도 disposal 시간으로 실패를 해제하지 않으며 동일 owner 후속을 기다린다.
3. **Rain#53**: 거절된 업로드2개는 접근하지 않았고 인라인·다른 경로로도 취득하지 않았다. 공개 원본만 등록했다. 새 미감 교정·최종 품질승인은 접근/승인 의존성이 풀릴 때까지 보류하며 GardenWindow 호환성도 미완료다.
4. **Living#67**: 같은 runtime의 morning15s cold GPU settlement 실패가 보존되어 있다. 후속 선택 작업의 성공을 모든 시도 성공이나 안정적 cold-load 증명으로 바꾸지 않는다. 실제 통합 cold 검증에서 다시 확인한다.
5. **소스/증거 검토**: Quiet pool의 실제 FBO 검사와 환경 PMREM, Korean Temple/Scops의 암묵적 HalfFloat PMREM에 호환 경로가 남아 있다. Forest/Cosmic/Living의 기존 allocation+byte 증거는 유지하며 stock Reflector callback의 추가 상태 복원은 현 default-target 흐름에서 비차단 보강이다. Night implicit transmission은 Three의 extension OR/byte 경로가 있으며 실제 FBO 관측 증거가 남아 있다. 사용자 수용26개의 미감을 재설계하거나 수용을 철회하는 근거로 사용하지 않는다.

## 남은 순서

1. root가 최신30개+host 수정의 전체 단위 검사·typecheck/build/budget/PWA를 완료하고 source/build를 고정한다.
2. 실제 App cold gallery와 native Player/Nature/Immersive 검증을 진행한다. visible/hidden chrome, 제어섬·keyboard focus, tap/drag,1tap=1callback,3.6초 hide, 늦은 초기화/holder/dispose를 확인한다. synthetic pointer dispatch로 대체하지 않는다.
3. autoplay 관찰은 첫 실제 입력 전 사용자 활성화를 만들지 않도록 검증하고, 기존AudioContext/output 주입·custom/restore/edited mix·source/global mute·late-start 취소를 확인한다. 보호2/PR45 autoplay, Back/Forward, save/restore/rename, retry 회귀도 남아 있다.
4. Water/Cozy owner 후속과 Rain 보류, 남은 소스 검토를 해소한 뒤 exact-head guard로 인수문서를 갱신한다. 전체 실제 게이트와 기존 최종merge 해제 조건 충족 전 main merge/운영 완료로 표시하지 않는다.

물리기기/FPS/발열·30믹스 실청음은 수행하지 않았다. 일부 owner bundle은 manifest만 공개된 한계도 유지한다. 최종 handoff/PR이 게시됐다는 사실만으로 owner Work 종료를 추측하지 않는다.

## 실제 App 검사 — 완료와 실패를 분리

- 오디오 `audio-live-run2`: 최초 입력 전 raw CDP 관측에서 userActivation=false, suspended AudioContext1개, graph/start0. 실제 Play 후 초기믹스 UI/저장 일치와 실제 컵1tap→1callback→기존bg/master/safety graph의 제한된 cue가 통과했다. 출처별/전체 mute 검사는 이후 조절 버튼이 보이지 않아60s에서 중단됐고 cleanup15s도 실패했다. 18개 served asset은 해당 build와 일치. 전체 오디오 통과가 아니다.
- 입력 `native-cafe-30-focusfixed`: route/실제재생 및 visible chrome의1tap=1callback은 통과했지만 hidden chrome native touch가180s 제한에서 실패했고 cleanup10s도 실패했다. source는 실행 전후 동일. 이 실패를 새 focus 수정의 통과로 바꾸지 않는다.
- 이전 `native-cafe-portrait-final`은 Player의 visible/hidden touch·drag/cancel·controls·details pan-y와 Immersive의 visible/hidden touch·drag/cancel까지 통과한 뒤 키보드 순환에서 실패했다. 해당 중앙 버그는 이후 수정했지만 새 exact-source 전체 통과는 아직 없다.
- 검사도 실제 기능과 맞추어 갱신 중이다. 오래된 SVG/video 배경, full-cover drag chrome, 이전 믹스 개수 기대를 새3D/투명 chrome/초기프로필에 맞추며 보호 장면·history·오디오 실패/복구 게이트는 유지한다.
- 개별 과거 실패 JSON을 삭제하거나 기한 확대만으로 통과 처리하지 않는다. 아래 보존 JSON은 원래 실행 당시 체크포인트·dirty source hashes를 그대로 갖는다.
