# Specification

## Summary
**Goal:** Build a public Mod Gallery application where anyone can submit, browse, and search game mods without authentication.

**Planned changes:**
- Add a Motoko backend data structure to store mods with fields: id, name, description, features (array), author, category, and createdAt timestamp
- Add a public query method returning all mods sorted newest-first and an update method for adding new mods
- Create a mod submission form with fields: Mod Name, Description, Features, Author Name, and Category; validate that Name and Author are non-empty before submission
- Display all submitted mods in a public gallery as cards showing name, description, features as badges, author, category, and formatted date
- Add a real-time case-insensitive search bar above the gallery that filters by mod name or feature text
- Apply a dark, game-inspired visual theme (deep charcoal background, vivid teal/amber accents, bold typography) consistently across all pages and components

**User-visible outcome:** Visitors can open the Mod Gallery, browse all submitted mods in a styled card grid, search by mod name or feature instantly, and submit their own mod via a form — all without logging in.
