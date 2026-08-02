# Deploying prophetic-numbers.com

Everything in this folder is a plain static site. There is no build step, no
framework, no dependencies. Vercel serves it as-is.

```
index.html      the whole site (CSS and JS are inline)
assets/
  portrait.jpg  photograph of Hazrat Mirza Ghulam Ahmad
vercel.json     caching + security headers
robots.txt
sitemap.xml
```

---

## Part 1 — Get it onto Vercel

### The quickest route: drag and drop

1. Sign in at **vercel.com** (a free Hobby account is enough for this site).
2. On the dashboard, choose **Add New… → Project**.
3. Look for the **deploy a folder / drag-and-drop** option and drop this entire
   folder onto it. Drop the *folder*, not just `index.html` — otherwise the
   portrait won't be included.
4. Vercel gives you a preview URL like `prophetic-numbers-abc123.vercel.app`.
   Open it and check the site looks right before going further.

### The better route if you'll keep editing: GitHub

1. Create a new repository on GitHub — `prophetic-numbers` — and upload these
   files to it.
2. In Vercel: **Add New… → Project → Import Git Repository**, and pick it.
3. When Vercel asks about framework settings, select **Other**. Leave build
   command and output directory blank.
4. Click **Deploy**.

From then on, every time you push a change to GitHub, the live site updates by
itself. Worth the extra ten minutes.

---

## Part 2 — Point the GoDaddy domain at it

### Step 1: Tell Vercel about the domain

In your Vercel project: **Settings → Domains**, type `prophetic-numbers.com`,
and click **Add**. Accept the prompt to also add `www.prophetic-numbers.com`.

Vercel will now show you a card with the **exact DNS records this project
needs**. Keep that screen open — you'll copy from it in a moment.

> **Important:** Vercel used to give everyone the same IP (`76.76.21.21`).
> Newer projects get their own address from an anycast pool instead — something
> like `216.198.79.1` — and the `www` CNAME is now project-specific too, e.g.
> `d1d4fc829fe7bc7c.vercel-dns-017.com`. **Use the values on your own domain
> card.** Copying an IP from a tutorial (including this one) is the single most
> common reason these setups fail.

### Step 2: Edit the DNS at GoDaddy

1. Sign in to GoDaddy → **My Products** → find `prophetic-numbers.com` → **DNS**
   (or *Manage DNS*).
2. **Delete GoDaddy's parking records first.** A fresh domain usually ships with
   an `A` record on `@` pointing at a GoDaddy holding page, and a `CNAME` on
   `www` pointing to `@`. Both must go, or they'll fight your new records.
   Also delete any **AAAA** record on `@` — Vercel doesn't serve custom domains
   over IPv6 from third-party DNS, and a stray AAAA will stall the SSL
   certificate.
3. Add these two records, using the values from your Vercel domain card:

   | Type  | Name  | Value                                | TTL       |
   |-------|-------|--------------------------------------|-----------|
   | A     | `@`   | *(the IP shown on your Vercel card)* | 1 hour    |
   | CNAME | `www` | *(the hostname on your Vercel card)* | 1 hour    |

4. Save.

Leave your MX records alone if you have email on this domain.

### Step 3: Wait, then check

Propagation is usually 10–30 minutes, occasionally a few hours. Back on the
Vercel **Domains** screen, the status flips from *Invalid Configuration* to
**Valid**, and Vercel issues a free SSL certificate on its own — you don't need
to do anything for HTTPS.

If it's still red after an hour, click **Refresh** on the domain card and
re-read the values; a mistyped CNAME is the usual culprit.

### Alternative: hand DNS to Vercel entirely

Instead of steps 2–3 you can change the nameservers at GoDaddy to
`ns1.vercel-dns.com` and `ns2.vercel-dns.com`. Vercel then manages all DNS for
the domain. It's simpler day to day, but if you have email on this domain you'd
have to re-create those MX records inside Vercel first. For a single site, the
A + CNAME method above is less disruptive.

---

## Editing the content later

Everything lives in `index.html`. Near the bottom, inside `<script>`, there are
plain data blocks you can edit without touching any layout code:

- `EL` — the fifteen elements, their names and origin categories
- `ROWS` — the five rows of numbers and the commentary under each
- `LADDER` — the stellar burning stages
- `EQS` — the four equations
- `CLAIMS` — the numbered evidence list in section VI
- `QS` — the open questions in section VII

Change the text in those and the page rebuilds itself on load. The colours are
CSS variables at the very top of the file under `:root`.

---

## Two things to consider adding

**A social preview image.** When someone shares the link on WhatsApp or X right
now, no picture appears. Make a 1200×630 image, save it as
`assets/og-image.jpg`, and add this inside `<head>`:

```html
<meta property="og:image" content="https://prophetic-numbers.com/assets/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

**Analytics.** Vercel has a built-in, cookie-free analytics tab you can switch
on in project settings — no code needed, and nothing to disclose under GDPR.
