# LaunchStack

LaunchStack turns one SaaS brief into platform-aware launch scripts, destination links, audience angles, and a repeatable distribution workspace.

The current release is a browser-local MVP. It supports a catalog of 250 launch destinations, a free 10-platform kit, a 30-platform Launch plan, and a 50+ platform Scale plan. Plan selection is currently a local product-preview gate; connect server-side entitlements and payments before charging users.

## Local development

```bash
pnpm install
pnpm dev
```

The development server honors `PORT` and defaults to `3000`.

```bash
pnpm check
pnpm test
pnpm build
pnpm start
```

Database helpers are available through `pnpm db:migrate` and `pnpm db:push` when durable campaigns and billing entitlements are implemented.

## Product behavior

A founder enters a product name, product idea, website link, audience, positioning line, and optional homepage screenshot. The workspace exposes the 250-row catalog with search, access labels, platform categories, and direct links. Unlocked platforms receive editable deterministic scripts. Founder, Marketing, and Developer angles adapt the emphasis of the script while the platform format remains visible.

The MVP stores the campaign locally in the browser. Login, cross-device persistence, server-side plan enforcement, payments, and automated submission are intentionally not represented as complete features yet.

## Project structure

- `client/src/pages/Home.tsx`: landing page, pricing, campaign intake, plan gate, and workspace.
- `client/src/data/platforms.ts`: catalog of platform names, URLs, and access classifications.
- `client/src/index.css`: LaunchStack visual system and responsive layout.
- `server/`: Manus OAuth, tRPC, database, and storage integration points.
- `drizzle/`: current user schema and future campaign/entitlement migrations.
