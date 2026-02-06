# Specification

## Summary
**Goal:** Enable users to create and browse persisted “mod idea” concepts with a themed “mod workshop” UI.

**Planned changes:**
- Add Motoko canister stable storage and methods to create a mod idea and list all mod ideas (newest first), including validation and clear error results.
- Store each mod idea with: id, title, description, game/platform, tags (string list), createdAt timestamp, and author principal (when available).
- Build a frontend form page to submit mod ideas (Title, Description, Game/Platform, comma-separated Tags) with inline validation and success/error feedback.
- Build a frontend list view that fetches mod ideas on load, shows cards with truncated description + expand/collapse, empty/loading/error states, and simple client-side filtering by game/platform and/or tag (case-insensitive).
- Implement data fetching and creation via React Query (query + mutation) with cache invalidation/refetch after successful creation.
- Apply a consistent, creative “mod workshop” visual theme using Tailwind + shadcn component composition (avoiding default/plain styling and avoiding blue/purple as dominant colors).

**User-visible outcome:** Users can design a mod idea via a form, submit it, and immediately see it appear in a themed list that supports filtering and expandable descriptions; ideas persist across canister upgrades/restarts.
