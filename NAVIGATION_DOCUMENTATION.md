# ContextRoute AI — Navigation Documentation

Expo Router is used for all navigation.

- `/(tabs)` is the root tab group with Home, Explore, and Profile. The tab bar uses three labeled destinations and remains minimal.
- Secondary flows are stack routes: onboarding, authentication, search, planning context, traveler details, preferences, routes, details, navigation, discovery, reporting, emergency, notifications, saved items, and settings.
- Back controls use `router.back()` and are exposed as visible top-bar affordances.
- Primary planning actions move forward in a predictable sequence: Search → Context → Travelers → Preferences → Routes → Route Details → Navigation.
- Screens that require a real integration do not automatically navigate into false success states. They show an explanation and a route to the relevant frontend surface.
- Local state is shared through Zustand. Route params are used only for deterministic UI variants, not live production data.
