# LaunchStack MVP outcomes

## Outcome 1 — 250-platform catalog
- [x] The catalog exposes 250 rows with platform name, website link, and Free/Freemium/Paid access label.
- [x] The UI supports platform search, result count, access filtering, direct links, and a compact platform list.
- [x] Platform rows show a derived category such as Community, Launch community, Review / profile, AI / tool directory, or Startup directory.
- [x] Each selected platform shows a caution about paid visibility, proof, editorial approval, or current-rule verification.

## Outcome 2 — Founder launch intake
- [x] A founder can enter product name, one-line idea, website link, target audience, positioning, and homepage screenshot.
- [x] Screenshot files over 2 MB are rejected before being stored in browser local storage.
- [x] The screenshot appears as a thumbnail in the launch kit summary.
- [x] The campaign state is saved locally so the founder can return without paying for a backend.

## Outcome 3 — Channel-specific launch scripts
- [x] The product generates deterministic, editable launch copy from the founder inputs.
- [x] The workspace supports Founder, Marketing, and Developer copy angles.
- [x] The selected angle is included in priority and long-tail script outputs.
- [x] The workspace shows platform-aware scripts for Product Hunt, Hacker News, Reddit, Indie Hackers, and additional catalog platforms.
- [x] Each script includes the destination platform link and a copy action.

## Outcome 4 — Real local plan gating
- [x] The landing page communicates the 10-platform free tier, 30-platform $29 tier, and 50+ platform $57.99 tier.
- [x] A founder can select a plan to update the launch kit scope in the local workspace.
- [x] Platforms outside the selected plan remain discoverable but show a Locked state and cannot replace the selected platform or generate its script.
- [x] The UI clearly distinguishes free, freemium, and paid submission destinations.
- [ ] Server-side entitlements and payment verification remain future work before charging users.

## Outcome 5 — Launch-ready marketing surface
- [x] The home page clearly explains the LaunchStack motto: launch once, adapt everywhere.
- [x] The page includes a founder-oriented CTA, catalog quantity proof, workflow explanation, and a path from free launch to paid campaign.
- [x] The README and package metadata use LaunchStack branding rather than starter Trust Ledger branding.
- [x] The first release does not require a paid API or account backend.
- [ ] Cross-device campaign persistence remains future work for the production release.

## Outcome 6 — Manus OAuth and database-backed user identity
- [x] The header starts the real Manus OAuth flow instead of showing a planned-login alert.
- [x] The existing OAuth callback creates or updates the authenticated user in the MySQL-compatible `users` table.
- [x] The authenticated account name or email is shown in the header with a real sign-out action.
- [x] The application session uses the existing `webdev_app_session` cookie and protected tRPC context.
- [ ] Campaign rows are not yet persisted per user; the current campaign editor remains browser-local.
