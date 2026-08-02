# Getting listed on Google

The site is now set up correctly for search — proper titles, descriptions,
structured data, a sitemap, and a social preview card. What's left is telling
Google the site exists and being patient. This walks through it.

## First, a realistic expectation

Two different things are easy to confuse:

- **Being *indexed*** — appearing in Google at all when someone searches your
  site name or a specific phrase from it. This is achievable in days to a couple
  of weeks, and the steps below make it happen.
- ***Ranking* for competitive terms** — showing up near the top when someone
  searches broad phrases like "true Islam" or "Ahmadiyya". This is a different
  and much harder game. Those terms are contested by large, long-established
  sites, and no amount of meta tags will place a new site above them. Ranking
  there comes from other sites linking to yours, time, and sustained relevant
  content — not from configuration.

So: the work below gets you *found*. Climbing for big keywords is a longer road,
and honestly, the most useful thing you can do for it is get the site linked
from established Ahmadiyya community pages and let people share it.

## Step 1 — Google Search Console

This is the tool that tells Google to look at your site, and shows you what it
finds.

1. Go to **search.google.com/search-console** and sign in.
2. Click **Add property** → choose the **URL prefix** option → enter
   `https://prophetic-numbers.com`.
3. Google asks you to verify ownership. The easiest method for a Vercel site is
   the **HTML tag** option:
   - It gives you a tag like
     `<meta name="google-site-verification" content="abc123..." />`
   - Copy just the `content` value.
   - In `index.html`, find the line that already reads
     `<!-- google-site-verification goes here -->` and replace it with the full
     tag Google gave you.
   - Commit, push, wait for Vercel to deploy, then click **Verify**.

   > Alternatively, if you moved DNS to Vercel's nameservers, you can verify by
   > the **Domain** method with a TXT record instead — but the HTML tag is
   > simpler and doesn't touch DNS.

## Step 2 — Submit the sitemap

Once verified, in Search Console:

1. Open **Sitemaps** in the left menu.
2. Enter `sitemap.xml` and click **Submit**.

That hands Google the list of all four pages at once. The sitemap is already in
your repo and already lists every page.

## Step 3 — Ask for indexing directly

Don't wait for Google to wander over on its own:

1. In Search Console, paste `https://prophetic-numbers.com` into the search bar
   at the very top (the **URL Inspection** tool).
2. When it loads, click **Request indexing**.
3. Repeat for `/about`, `/discuss` and `/contact`.

This puts each page in Google's priority queue. It's still not instant —
typically a few days — but far faster than waiting.

## Step 4 — Bing too, while you're at it

Bing also powers DuckDuckGo and others, so it's worth five minutes:

1. Go to **bing.com/webmasters**.
2. You can **import directly from Google Search Console** — one click, no
   re-verification.
3. Submit the same `sitemap.xml`.

## Checking progress

After a few days, search Google for:

```
site:prophetic-numbers.com
```

That query shows exactly which of your pages Google has indexed. Empty at first;
pages appear as they're crawled. Once they show up there, the site is officially
listed.

## What helps ranking over time (the honest list)

- **Links from other sites.** The single biggest factor. A link from an
  established Ahmadiyya site, a forum post, a shared article — each one is a vote
  Google counts. This matters more than everything else combined.
- **Being shared.** The social card is built (`assets/og-image.jpg`) so the link
  looks good on WhatsApp, Facebook and X. Shares lead to links.
- **More genuine content.** If the discussion page fills with real exchanges, or
  you add articles over time, Google sees an active, deepening site.
- **Time.** New domains sit under a natural probation. Six months from now the
  same pages rank better than they will next week, for nothing more than having
  existed.

## What was already done for you

You don't need to touch any of this — it's built in:

- Unique title and description on every page, written around the real subject
- `keywords`, `author` and `robots` meta tags naming Mirza Ghulam Ahmad, the
  Ahmadiyya Muslim Community / Jamaat Ahmadiyya, Qadian, and the Promised Messiah
- **JSON-LD structured data** on the homepage, which tells Google in a language
  it reads that the site is an article about a named person and organisation —
  this is what can earn richer search listings
- Open Graph and Twitter Card tags so shared links show a proper preview
- A 1200×630 preview image (`assets/og-image.jpg`)
- `sitemap.xml` and `robots.txt`, both already correct
- Clean URLs (`/about`, not `/about.html`)
