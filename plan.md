# LaunchStack product plan

## Product
LaunchStack is a SaaS launch-distribution workspace for founders. A founder enters a product idea, website URL, target audience, and homepage screenshot. LaunchStack generates channel-specific launch scripts with the correct platform link and a launch checklist for 250 directories and communities.

## Required behavior
- Use the supplied 250-row startup-launch-directories.xlsx as the platform catalog source of truth.
- Let a founder enter product name, product idea, website URL, audience type, positioning, and screenshot.
- Display the platform catalog with search, audience/format grouping, access label, and direct website link.
- Generate tailored copy for the first free platforms and show a preview for Product Hunt, Reddit, Indie Hackers, Hacker News, and other selected channels.
- Present pricing as: 10 free platforms, 30 platforms at $29, and 50+ platforms at $57.99.
- Keep the first release browser-local and zero-cost to operate. Login should be represented as a future-ready UI state rather than requiring a backend in this MVP.

## Implementation
Use the existing static React/Vite project. Store catalog data in `client/src/data/platforms.ts`, keep launch brief state in localStorage, and generate deterministic channel-specific scripts without paid AI APIs. Use the supplied homepage screenshot in the product intake form and show a small thumbnail preview.

## Structure
- `client/src/pages/Home.tsx`: landing page, onboarding intake, launch workspace, pricing.
- `client/src/data/platforms.ts`: spreadsheet-derived platform catalog.
- `client/src/index.css`: editorial launch studio visual system.
- `client/public/manus-routes.json`: static route manifest.

## Design direction
Three options: launch studio editorial (0.04), neon growth dashboard (0.07), founder operating system (0.09). Chosen: **launch studio editorial**.

- Design movement: calm editorial SaaS with print-like typography and dashboard utility.
- Core principles: clarity before volume; every channel has a job; show the copy before export; confidence without hype.
- Color philosophy: warm paper background, ink-green navigation, acid-lime accents for growth and activation, muted coral for attention.
- Layout: asymmetric hero into a two-column workspace; catalog rails and script preview instead of a centered card grid.
- Signature elements: large serif headlines with italic green phrase; numbered platform rows; sticky “launch kit” summary card.
- Interaction: progressive disclosure; the founder sees their campaign inputs reflected immediately in every generated script.
- Animation: restrained lift/opacity transitions only; no noisy loading effects.
- Typography: Georgia/serif display paired with Inter/system sans for controls and metadata.
- Brand: “Launch once. Adapt everywhere.” For ambitious founders; focused, practical, a little editorial.
- Voice: direct, supportive, operational. Example: “Your launch has 250 doors. We write the right knock for each one.”
- Wordmark: a lime launch flag tucked into the L of LaunchStack.
- Signature color: launch lime #b3d45e.
