# kirk-folio

Jessie Kirk Recio's personal portfolio, built with Nuxt 4, Vue, TypeScript, and Tailwind CSS.

The single-page site includes a profile, tools, experience, four selected projects, education, a downloadable resume, and a contact form. Content and types are separate from presentation; composables handle interaction and SEO, while the contact service handles submissions.

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Run one development server at a time. The default address is `http://localhost:3000`.

## Checks

```sh
npm run format:check
npm run lint
npm run typecheck
npm run test:vue-bindings
npm run build
npm run test:seo
```

The SEO browser check requires installed Google Chrome and an existing `npm run build` output. It starts and closes an isolated local server. With the development server running, `npm run test:contact` checks contact behavior using mocked requests; no email is sent. `CONTACT_TEST_URL` can point this check at another local server.

`npm run assets:social` regenerates the social card and round portrait favicons using local assets and installed Chrome. Generated assets are committed so deployment does not require a browser. `npm run generate` is available for static output.

## Project structure

- `app/components/`: reusable UI, sections, header, and footer.
- `app/data/` and `app/types/`: editable content and shared contracts.
- `app/composables/`: form state, navigation, animations, and SEO registration.
- `app/services/` and `app/utils/`: contact transport and pure helpers.
- `app/dependencies/` and `app/homepage/`: scoped exports used by grouped imports.
- `app/assets/`: Tailwind theme, local font declarations, and social-card source.
- `public/`: resume, portrait, project captures, fonts, icons, and attribution.
- `server/routes/` and `shared/`: robots, sitemap, and validated site settings.
- `scripts/`: verification and asset-export tools.

Use Tailwind utilities first. Add Vue style blocks only when utilities cannot reasonably express the requirement. See [CONTRIBUTING.md](CONTRIBUTING.md) for commit conventions.

## Deploying to Vercel

Import this repository into Vercel and select the Nuxt framework preset. The app is at the repository root; use Node.js 24, `npm ci` for installation, and `npm run build` for the build. Keep the framework's output-directory default. No custom Vercel configuration is required. See [Vercel's Nuxt guide](https://vercel.com/academy/nuxt-on-vercel/deploy-nuxt-to-vercel).

Builds default to a non-indexable preview. `.env.example` documents the settings. Keep these preview values until the public URL is chosen:

```dotenv
NUXT_PUBLIC_SITE_ENVIRONMENT=preview
NUXT_PUBLIC_SITE_URL=
```

For the final public deployment, set `NUXT_PUBLIC_SITE_ENVIRONMENT=production` and `NUXT_PUBLIC_SITE_URL` to the actual HTTPS origin, without a path. Rebuild after changing them. Production requires that URL and enables canonical/social URLs and a homepage sitemap. Leave Vercel Preview environment variables in preview mode.

The contact form uses FormSubmit. Recipient activation and an actual inbox delivery check remain required before launch. The automated tests mock delivery.

## Assets

The portrait, resume, and project captures belong to their respective owners. Icon attribution is included under `public/icons/`. Font provenance and the Proxima Nova webfont licensing follow-up are documented in [public/fonts/LICENSES.md](public/fonts/LICENSES.md). No blanket open-source license is granted for the personal content or third-party assets.
