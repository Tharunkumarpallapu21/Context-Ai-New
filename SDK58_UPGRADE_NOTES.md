# Expo SDK 58 Upgrade Notes

**Updated:** 2026-11-23

The project is being upgraded from Expo SDK 57 to SDK 58 to match the user’s installed Expo Go client. Expo’s official upgrade walkthrough recommends upgrading one SDK at a time, installing the target Expo package, running `npx expo install --fix`, and then running `npx expo-doctor`.

For SDK 58, Expo’s official version reference lists React Native `0.88`, React `19.3.0`, React Native Web `0.21.0`, and Node.js `22.13.x` or newer. The installed project now uses the SDK 58-compatible React Native and React versions. The project has no generated `android/` or `ios/` directories, so there is no previous native tree to migrate or delete.

The SDK 58 install could not edit the dynamic `app.config.ts` automatically. The required config plugins reported by Expo were added manually: `expo-font`, `expo-image`, `expo-secure-store`, `expo-status-bar`, and `expo-web-browser`. Existing app plugins and configuration were preserved.

Expo Doctor initially found stale peer-resolution entries for `@expo/dom-webview` and Metro packages. The dependency tree is being repaired without changing application screens, navigation, UI, assets, or product behavior.

## Official sources

- [Expo SDK upgrade walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [Expo SDK 58 changelog](https://expo.dev/changelog/sdk-58)
- [Expo SDK 58 version reference](https://docs.expo.dev/versions/v58.0.0/)
- [Expo Go setup guidance](https://docs.expo.dev/get-started/expo-go/)
