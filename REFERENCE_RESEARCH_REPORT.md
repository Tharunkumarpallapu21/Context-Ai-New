# ContextRoute AI — Reference Research Report

The reference pass focused on visual and interaction patterns only. It did not copy product logic, routing algorithms, business rules, or production data.

## Material 3

Material 3 recommends bottom navigation for three to five top-level mobile destinations, with short labels and a visible active indicator. It also calls out filled active icons, compact touch-friendly items, and keeping navigation unobstructed except during temporary flows. These patterns informed the Home / Explore / Profile bar and its 48px minimum touch targets. [1]

Material 3 bottom-sheet guidance recommends a visible drag handle with an accessible 48dp interaction area and a single-pointer alternative to dragging. ContextRoute AI uses sheets as information rails and keeps their primary actions reachable without gesture-only interaction. [2]

## Google Maps Places UI

Google Maps Platform exposes place discovery patterns around autocomplete, nearby search, place details, and map-linked cards. ContextRoute AI uses the same broad visual relationship—search field, result surface, and map context—without connecting a provider or presenting invented places. [3]

## Citymapper

Citymapper positions journey planning as an operational “making cities usable” experience and emphasizes trip planning, mode choice, and navigation continuity. ContextRoute AI adapts the calm planning hierarchy and stepwise route flow, while keeping all route content integration-pending. [4]

## Waze

Waze presents community road alerts and route context as prominent map-adjacent signals. ContextRoute AI adapts the idea of a clear reporting entry point and status feedback, while avoiding fabricated hazards or live alerts. [5]

## Uber

Uber’s rider-architecture write-up emphasizes small, independently testable modules, explicit routers, and one-way state flow between service data and views. ContextRoute AI keeps screens thin, shared components reusable, and local state separated from future service boundaries. [6]

## Adaptation decisions

The final UI is original: cobalt route markers, cool mist map surfaces, oversized rounded cards, and compact “Integration pending” capsules. Reference products are not used as final assets or backgrounds, and no reference screenshots are bundled because the research pass verified source pages and documented the patterns rather than redistributing third-party imagery.

## References

[1]: https://m3.material.io/components/navigation-bar/guidelines "Material 3 Navigation Bar Guidelines"
[2]: https://m3.material.io/components/bottom-sheets/accessibility "Material 3 Bottom Sheets Accessibility"
[3]: https://mapsplatform.google.com/demos/places-ui-kit/ "Google Maps Platform Places UI Kit"
[4]: https://citymapper.com/?lang=en "Citymapper official product page"
[5]: https://www.waze.com/waze-app "Waze official app page"
[6]: https://www.uber.com/us/en/blog/new-rider-app-architecture/ "Uber rider app architecture"
