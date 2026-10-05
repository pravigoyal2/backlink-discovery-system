# Fast Backlink Discovery System (Cloudflare Pages + KV)

A lightweight, Google-compliant URL discovery hub for publishing crawlable references to external pages.

## What it does

- Admin dashboard with bulk URL submission
- Stores submitted URLs in Cloudflare KV
- Creates crawlable discovery pages at `/u/<id>`
- Maintains `/latest` with recent URLs
- Generates `/sitemap.xml`
- Generates `/feed.xml`
- Generates `/robots.txt`
- Adds rolling internal links between recent discovery pages
- Includes `index,follow` metadata
- Does NOT misuse Google's Indexing API
- Does NOT guarantee indexing

## 1. Create a KV namespace

Cloudflare Dashboard → Workers & Pages → KV → Create namespace.

Suggested name:

`BACKLINK_DISCOVERY_KV`

## 2. Create a Pages project

Upload this project to GitHub/GitLab or deploy with Wrangler.

Build settings:

- Framework preset: None
- Build command: leave blank
- Build output directory: `public`

## 3. Bind KV to Pages

Cloudflare Dashboard → Pages project → Settings → Functions → KV namespace bindings.

Create binding:

- Variable name: `LINKS_KV`
- KV namespace: your newly created namespace

## 4. Add an admin secret

Pages project → Settings → Environment variables.

Add:

`ADMIN_KEY=replace-with-a-long-random-secret`

Use the same key inside the Admin Dashboard when submitting URLs.

## 5. Deploy

After deployment:

- `/` → public homepage
- `/admin.html` → admin dashboard
- `/latest` → latest discovered resources
- `/sitemap.xml` → sitemap
- `/feed.xml` → RSS feed
- `/robots.txt` → robots
- `/u/<id>` → individual discovery page

## Important

This system improves URL discovery and crawl paths. It cannot guarantee that Google will index an external backlink page. Google decides indexing independently.

Avoid stuffing spam URLs. Use this only for genuine public pages you want crawlers to discover.
