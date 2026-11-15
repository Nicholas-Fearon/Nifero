# Nifero — Next.js + Tailwind CSS

Responsive portfolio and services website for Nifero, built with Next.js App Router, React, TypeScript, Tailwind CSS v4 and Lucide icons.

## Run locally

1. Use Node.js 22 or newer.
2. Copy `.env.example` to `.env.local` and follow the enquiry setup below.
3. Run:

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
- `components/NiferoSite.tsx` — site UI, portfolio filtering, navigation and contact form
- `app/thank-you/page.tsx` — confirmation after successful submission
- `app/admin/page.tsx` — private enquiries dashboard
- `postcss.config.mjs` — Tailwind PostCSS integration

## Enquiry setup

1. Create a Supabase project. Run `supabase/migrations/202611150001_enquiries.sql` in its SQL Editor or apply it with the Supabase CLI.
2. Disable public user sign-ups in Supabase Auth. In **Authentication → Users**, create and confirm the owner's email/password account. Copy its user UUID and run this once in the SQL Editor:

   ```sql
   insert into public.enquiry_admins (user_id)
   values ('REPLACE_WITH_YOUR_USER_UUID'::uuid)
   on conflict do nothing;
   ```

3. Set the variables from `.env.example` in your hosting provider and redeploy. Keep the Supabase secret key in server environment variables. Use a separate Supabase project for preview deployments that accept test submissions.
4. Submit a test enquiry. Check that the site redirects to `/thank-you` and that the enquiry appears after signing in at `/admin`. In a signed-out window, verify that `/admin` shows the sign-in form.

For rate limiting, the app uses the sender address and, on Vercel, the platform-provided client IP. Both are hashed in the rate-limit table.

The three portfolio examples are labelled as concepts. Confirm business details and privacy information before opening the live contact form to the public.

## Design

Palette: forest `#111a15`, ink `#17211c`, mist `#f4f5ef`, lime `#cff47c`.
Fonts: Manrope (headings) and DM Sans (body).
