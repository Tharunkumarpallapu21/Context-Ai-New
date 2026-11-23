# ContextRoute AI — Implementation Plan

## Product scope

ContextRoute AI is a frontend-only, Android-first Expo application for context-aware travel planning. This implementation preserves the approved 27-screen inventory and keeps maps, routing, live navigation, authentication, notifications, emergency dispatch, places, and cloud sync disconnected. Where a real integration is required, the UI says so plainly.

## Implementation approach

- Use the fixed Expo Router / React Native / TypeScript starter with a stack for secondary flows and a three-destination bottom navigation for Home, Explore, and Profile.
- Centralize reusable UI in `components/app-ui.tsx` and state in `lib/store.ts` using Zustand with AsyncStorage persistence for local preferences, saved-item examples, theme choice, and local report status.
- Keep screen files thin and route-focused. Each of the approved flows has a named Expo Router entry point, while shared cards, map placeholders, forms, sheets, notices, and empty states come from the component library.
- Use `zod` for frontend validation and React Hook Form for the report/auth forms. No backend calls are made from the new UI.
- Use an original design system: quiet cobalt blue, blue-gray map surfaces, generous 8-point spacing, rounded 20–28px cards, high-contrast type, and clear integration-pending states.

## Design direction: Quiet Wayfinding

Three candidate directions were considered: **Quiet Wayfinding** (0.72), **Signal Atlas** (0.06), and **Civic Compass** (0.04). Quiet Wayfinding is selected.

- **Design movement:** Material 3 utility surfaces softened with modern travel-app editorial spacing.
- **Core principles:** map-first clarity, context before complexity, honest system states, and one-handed reachability.
- **Color philosophy:** cobalt blue provides reliable wayfinding focus; mist backgrounds reduce visual noise; amber and green are reserved for system meaning rather than decoration.
- **Layout paradigm:** an anchored map canvas or reading surface with floating controls and a low, calm information rail instead of dense grids.
- **Signature elements:** cobalt route marker, soft contour-map linework, and a small “Integration pending” status capsule.
- **Interaction philosophy:** every tap has an obvious next state; unavailable operations explain what is missing; local actions never imply cloud success.
- **Animation:** short 180–240ms fades and upward card reveals; no motion is required to understand the interface.
- **Typography:** platform system sans, with 30/36 display, 22/28 section, 16/24 body, and 12/16 label tiers.
- **Brand essence:** a calm route-planning companion for people whose journey depends on more than a destination. Personality: clear, considerate, prepared.
- **Brand voice:** “Plan around what matters.” and “Your route is ready when the data is ready.”
- **Wordmark & logo:** a cobalt square with a white route loop and pin cutout; no baked-in rounded corners.
- **Signature brand color:** `#175CD3` (Context Cobalt).

## Project structure

- `app/`: Expo Router route files for the 27 approved screens and the Home/Explore/Profile tabs.
- `components/app-ui.tsx`: reusable visual system and map-first primitives.
- `lib/store.ts`: local Zustand state and persistence boundary.
- `lib/design-system.ts`: tokens, type scale, and light/dark palettes.
- `UI_REFERENCES/`: source notes for official Material, Google Maps, Citymapper, Waze, and Uber references.
- `*.md`: status, screen inventory, research mapping, design, implementation, navigation, QA, and build documentation.

## Validation and handoff

Run `pnpm check`, `pnpm lint`, and `pnpm test` where applicable. Start Metro and the API through the platform-managed runtime declarations, then verify the web preview and capture representative mobile-width screenshots. Android APK/AAB generation is left to the supported Dashboard build handoff; no release artifact is claimed unless the platform reports one.
