# ContextRoute AI — Known Limitations

- Maps and map tiles are not connected. The map canvas is an original visual placeholder and clearly labeled as unavailable.
- Destination search, places, tourism details, routes, ETAs, traffic, accessibility data, safety scores, hazards, live GPS, and turn-by-turn guidance require future integrations.
- Login and registration are visual forms only. No authentication result is claimed, and no remote account is created.
- Reports are stored locally as “Submitted locally / Pending integration” only. No moderation, cloud submission, emergency-control-room notification, or verified hazard outcome is claimed.
- Notification and saved-item screens use honest empty/local states. Nothing is represented as cloud-synced.
- Native-only behavior such as camera uploads, push notifications, haptics, emergency dialing, and release signing requires device-level verification and supported build credentials.
- The starter API process remains available for the managed Expo runtime, but the new frontend does not connect it to travel, auth, report, sync, or notification functionality.
- Expo preview emits a non-blocking deprecation warning for `shadow*` style props. They are retained for React Native native compatibility until a target-device styling pass confirms an equivalent `boxShadow` implementation.
- APK/AAB artifacts are not claimed until a supported Dashboard/EAS build reports a successful generated artifact.

## Final verification evidence

- TypeScript and lint checks pass.
- Existing tests report 25 passing tests and 1 skipped starter auth test.
- Expo config resolves the portrait Android package and adaptive icon assets.
- The route manifest returns all 27 approved routes with HTTP 200.
- All 27 routes were visually reviewed at 390×844 mobile width without blocking defects.
