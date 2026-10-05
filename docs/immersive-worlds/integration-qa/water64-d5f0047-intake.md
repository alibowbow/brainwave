# WaterEdge PR64 d5f0047 인수 감사

기준 UTC2026-10-04T22:17:27.744039+00:00. 정확한 head **`d5f00475ad86cde3e489157e25e0aa14b400c9e8`**, 비교 기준은 `c6cad439abbaae54884292c6cc6ea60c76587e32`다. **기존20초 정리 게이트는 수정 소스에서 해소됐다. 실제 App 응답성·기능 검증은 별도 게이트다.**

## 소유 범위·출처

- 변경75경로 모두 `components/immersiveWorlds/waterEdge/**` 안이다. 실행 코드 차이는 `runtime.ts`와 새 `gpuSubmission.ts` 두 파일뿐이다. 세 장면 builder, 재질·조명·카메라·target 설정·entry/wrapper·props·event payload·공유/보호 경로는 그대로다.
- final 전체tree `35d21cd88fc6ebe9ce12e9df3e45297bbd0d1c41`, 소유tree `452ca7e26d6bdef933385833f6738d60548e5b8a`.
- 실제 source checkpoint는 published `e4a11dd135c7979b644d667755f6a68fa4ea529d`; final head까지 production delta 없음.8개 publication map의 published Git tree가 기록값과 일치한다. 로컬 capture SHA를 GitHub SHA로 오인하지 않았다.
- exact-head CI **37238657908 completed/success**를 `fetch_commit_workflow_runs`의 structured 결과로 독립 확인했다. 이는 owner CI이며 현재 통합 App CI가 아니다.

## 독립 증거 확인

| 항목 | 확인 |
|---|---|
| 실행 소스 |13/13 파일SHA 및 aggregate `27794d8a365d0c32d3396f06849aa8b557908963f7a093495943c42dbd10b9da` 일치|
| Harness |5/5 파일SHA 및 aggregate `5a8c9e998bb6332fa0691d89c369de40c468bfff41f8db8893bc8c8a39371f42` 일치|
| Verifier/helper/generator |기록 SHA 모두 일치|
| 최종 raw reports |24/24 해시·passed·동일 source/harness/bundle·오류없음 확인|
| 최종 실제PNG |28/28 SHA·byte size·dimensions 일치|
| 승인된 정지 화면 |10쌍 모두 c6 원본과 PNG bytes 및 decode된RGBA 완전 동일|
| 기존 증거 |40개 파일을 c6 Git blob과 비교해 모두 동일; 원래 Valley 실패2개 계속 failed|
| 이전 시도 |baseline4pass/1blocked, dedup-only2pass/1fail 원본 해시와 상태 보존|

Manifest 자체SHA `23ab398c71283330eecd9437369becb39c67f9acc682fe2974b4f800a3224f83`도 일치한다. 실제 bundle bytes는 미게시이므로 bundle digest `789f1cf3…`는 일관된 보고서 연결까지 확인했으며 독립 bundle 재해시/재빌드는 하지 않았다.

세 장면의 post-native-input 실제PNG와 Valley normal/byte static portrait를 직접 열었다. 서로 다른 연못·계곡·자갈해변 공간과 기존 물·식생·재질이 유지되며 placeholder 대체가 보이지 않는다. 전체28개 해시를 검증했지만 이번 refresh에서 직접 연 이미지는5개다. 새로운 미감 변경을 제안하지 않는다.

## 제출·실패·정리 코드 판단

- Factory cube/PMREM와 첫 정상 view를 하나의 batch로 fence한다. 이후 active RAF·paused resize·holder·interaction final frame이 모두 같은1개 in-flight gate를 통과한다.
- 완료 판정은 zero-timeout `clientWaitSync`의 `ALREADY_SIGNALED`/`CONDITION_SATISFIED`뿐이다. TIMEOUT은 대기하고, null fence·WAIT_FAILED·unknown·context loss·query throw는 fail-closed다. 고정FPS/품질 축소/`gl.finish`/busy wait를 추가하지 않았다.
- busy 상태에서 simulation time과 backing size를 전진시키지 않는다. 최신 resize/성공 interaction은 dirty frame으로 남겨 pause/재획득 뒤 표시한다. 같은 크기 paused 호출은 중복 draw를 생략하고, 초기 생성 외 detached 제출은 막는다.
- 부분 render throw도 finally에서 fence된다. dispose는 먼저 disposed를 세워 새 draw를 막고 단일RAF와 소유sync를 한 번만 정리한다. sync 삭제를 GPU 완료나 물리VRAM 반환으로 간주하지 않는다.
- 실제 초기 draw에서 동기 context 실패가 발생한 뒤 잘못 ready를 발행하지 않도록 하는 root의 shared-host identity guard와 맞는다. 새 필수 source blocker는 발견하지 않았다. Active-render 예외 뒤 running/RAF 상태 복구는 비차단 hardening 항목이며 이 감사에서 조치하지 않았다.

## 20초 통과와 응답성의 구분

모든 clean lifecycle report는 capture/readback/추가 diagnostic drain 없이 두 release→실제 trusted context loss→fresh remount를 수행했다. verifier는 callback 대기시간이 아니라 실제 detach/loss timestamp 차이를 기존20000ms와 비교한다. intrinsic production fence는 유지한다. 최종 상태created3/disposed2/live1은 두 번째 fresh remount가 살아 있는 의도된 상태이며 세 번째 release를 주장하지 않는다.

| Valley 실행 | Detach→실제 loss | Dispose 동기 시간 | 최대 heartbeat 지연 |
|---|---:|---:|---:|
| Normal cycle1 |16.2501s|11.2490s|11.2445s|
| Normal cycle2 |7.7436s|2.7432s|2.6992s|
| Byte cycle1 |5.0389s|0.0382s|0.0346s|
| Byte cycle2 |5.3272s|0.3268s|0.3223s|

**기존20초 게이트는 수정 소스에서 통과했다.11.24초 이벤트 루프 정지를 부드러운 성능이나 responsive teardown 승인으로 바꾸지 않는다.** 이전c6 실패36.8/45.5초와 dedup-only active 실패23.83초도 기록에 남아 있다. 정상/byte 두-frame active diagnostic 성공 역시 지속 처리량·장시간 성능 증명이 아니다.

root가 현재 audio source/build freeze를 끝낸 뒤 exact owned tree를 인수하고, 새 통합 source-bound App에서 chrome visible/hidden·제어섬/focus·native tap/drag·history/holder/재생성·audio 및 실제 응답성을 확인하면 된다. Owner harness는 최종 Player/Nature/Immersive를 대체하지 않는다. 물리기기·OS tab 전환·열/FPS·실청음·물리VRAM 회수시간은 미검증이다.

검증 JSON: `water64-d5f0047-integrity.json`. 이 감사는 unique read-only ref fetch/외부archive·보고서만 사용했다. 저장소 코드·commit·push·PR·merge·GPU 실행은 없으며 현재 통합repo의 소유tree를 바꾸지 않았다.
