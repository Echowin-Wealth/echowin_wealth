# Echowin Wealth — Deployment Guide

## Prerequisites
- Node.js 20+
- Supabase project (free tier works)
- Vercel account (free tier works)

---

## Step 1: Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the full schema:
   ```
   supabase/schema.sql
   ```
   This creates all tables, RLS policies, seeds initial data, and sets up the admin role trigger.

3. Create Storage bucket:
   - Go to **Storage → Buckets → New Bucket**
   - Name: `site-assets`
   - Toggle **Public bucket: ON**
   - Add storage policies (or run the SQL in the schema file)

4. Create admin user:
   - Go to **Authentication → Users → Invite User**
   - Use an email listed in the `set_admin_role` trigger (e.g. `admin@echowin.in`)
   - Set a password

5. Get your keys from **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret, server only)

---

## Step 2: Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Fill in your Supabase keys in .env.local

# Run dev server
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin/login` for the CMS.

---

## Step 3: Deploy to Vercel

### Option A: Vercel CLI
```bash
npx vercel --prod
```

### Option B: Vercel Dashboard
1. Push this repo to GitHub/GitLab
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Add environment variables (see below)
5. Deploy

### Environment Variables to set in Vercel:
| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `NEXT_PUBLIC_SITE_URL` | `https://echowin.in` |
| `REVALIDATION_SECRET` | Random 32-char string (`openssl rand -hex 32`) |

---

## Step 4: Configure Supabase Auth Redirect

In Supabase Dashboard → **Authentication → URL Configuration**:
- Add Site URL: `https://echowin.in`
- Add redirect URL: `https://echowin.in/admin`

---

## Admin Panel Usage

| URL | Description |
|---|---|
| `/admin/login` | Sign in with your admin credentials |
| `/admin` | Dashboard overview |
| `/admin/homepage` | Edit hero text, CTAs, badges |
| `/admin/about` | Edit About Us content |
| `/admin/offerings` | Add/edit/delete service offerings |
| `/admin/contact` | Update office addresses and contact info |
| `/admin/seo` | Edit page titles, meta descriptions, OG tags |
| `/admin/media` | Upload/manage images and files |

**After saving any content**, the live website revalidates within seconds via on-demand ISR.

---

## Project Structure

```
src/
├── app/
│   ├── (marketing)/       # Public website pages
│   ├── admin/             # Admin CMS (protected)
│   └── api/admin/         # API routes for CMS mutations
├── components/
│   ├── ui/                # ShadCN primitives
│   ├── layout/            # Navbar, Footer, AdminSidebar
│   ├── home/              # Homepage sections
│   ├── shared/            # Reusable components
│   └── admin/             # Admin-specific components
├── lib/
│   ├── supabase/          # 3 Supabase clients (browser/server/admin)
│   ├── data/              # Data fetchers with fallbacks
│   └── constants/         # Site config + default content
└── styles/
    └── animations.ts      # Framer Motion variants
```

---

## Custom Domain

In Vercel → **Domains** → Add `echowin.in` and configure DNS as instructed.
