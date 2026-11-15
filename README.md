# Nifero — Next.js + Tailwind CSS

Responsive portfolio and services website for Nifero, built with Next.js App Router, React, TypeScript, Tailwind CSS v4 and Lucide icons.

## Open in Visual Studio Code

1. Unzip the project and open the `nifero-nextjs` folder in VS Code.
2. Make sure Node.js 20.9+ is installed (`node -v`). Node.js 22 LTS is a good choice.
3. Open VS Code Terminal and run:

```bash
npm install
npm run dev
```

4. Open **http://localhost:3000**.
5. For a production build, run `npm run build` followed by `npm start`.

## Key files

- `app/page.tsx` — home route
- `app/layout.tsx` — metadata, global fonts and layout
- `app/globals.css` — Tailwind v4 and theme tokens
- `components/NiferoSite.tsx` — site UI, portfolio filtering, navigation and contact demo
- `postcss.config.mjs` — Tailwind PostCSS integration

## Before going live

- **Contact form:** Currently deliberately disabled from sending until you configure it. In `components/NiferoSite.tsx`, replace `REPLACE_WITH_YOUR_EMAIL@example.com` with a real mailbox to enable a `mailto:` handoff, or use a server-side form endpoint (recommended for reliable delivery). Don't ship the placeholder as though it were live.
- **Portfolio:** The three examples are explicitly labelled *concepts*, not completed projects. Replace with genuine case studies as appropriate.
- **Company details and privacy:** Add real contact, company/trading, privacy and cookie information as applicable.
- **Domain and deployment:** Import the project into Vercel, choose the Next.js framework, deploy, then connect `nifero.co.uk` in project settings.
- **Maintenance services:** Establish backup and update procedures, service scope and response times before selling contracts.

## Design

Palette: forest `#111a15`, ink `#17211c`, mist `#f4f5ef`, lime `#cff47c`.
Fonts: Manrope (headings) and DM Sans (body).

## Note

The project is ready for local installation, but dependencies must be installed on your machine. No real submissions, client projects, or success metrics have been fabricated.
