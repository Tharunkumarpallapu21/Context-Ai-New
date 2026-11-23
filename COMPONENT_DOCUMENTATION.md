# ContextRoute AI — Component Documentation

The shared UI layer lives in `components/app-ui.tsx`.

- `Screen`: safe-area, background, and scroll behavior.
- `TopBar`: consistent title, back affordance, and actions.
- `PrimaryButton` / `SecondaryButton`: high-contrast action styles with accessible labels.
- `SearchField`: destination/search entry with clear affordance.
- `MapPlaceholder`: original map-like canvas with explicit integration-pending messaging; it does not contain fake roads or locations.
- `ChoiceCard` / `RouteCard`: selection and route states.
- `StatusPill` / `NoticeBanner`: text-first honest status signaling.
- `EmptyState` / `PermissionCard`: unavailable and permission-required states.
- `ListRow`: settings, saved items, notifications, and profile rows.
- `ModalSheet`: controlled sheet for small decisions such as theme choice.
