# Setting up comments and the contact form

Two features need a few minutes of configuration before they work. Both fail
gracefully in the meantime — nothing looks broken to visitors.

---

## 1. Discussion comments (giscus)

The discussion page uses **giscus**, which stores comments in your repository's
GitHub Discussions. It's free, has no ads, no tracking, and gives you threaded
replies and emoji reactions without any database or server.

### Steps

1. **Turn on Discussions.** On GitHub, go to
   `ahmadiwoking-ops/Prophetic-Numbers` → **Settings** → scroll to **Features**
   → tick **Discussions**.

2. **Make the repository public.** Giscus can't read a private repo. This one
   only holds the website's source, so there's nothing sensitive in it.

3. **Install the giscus app.** Visit `github.com/apps/giscus` → **Install** →
   choose **Only select repositories** → pick `Prophetic-Numbers`.

4. **Generate your IDs.** Go to `giscus.app` and fill in the form:
   - Repository: `ahmadiwoking-ops/Prophetic-Numbers`
   - Page ↔ Discussions mapping: **Discussion title contains page pathname**
   - Discussion category: **General** (or make one called *Site comments*)
   - Enable reactions: **yes** — this is what gives you emoji
   - Theme: **dark_dimmed** (closest match to the site)

5. **Copy the two IDs.** Scroll to the generated code block and find
   `data-repo-id` and `data-category-id`. They look like `R_kgDOL...` and
   `DIC_kwDOL...`.

6. **Paste them into `discuss.html`.** Near the bottom, find:

   ```html
   <div id="giscus-mount"
        data-repo="ahmadiwoking-ops/Prophetic-Numbers"
        data-repo-id="PASTE_REPO_ID_HERE"
        data-category="General"
        data-category-id="PASTE_CATEGORY_ID_HERE"></div>
   ```

   Replace both `PASTE_` values. Commit and push — Vercel redeploys and the
   thread appears.

### Moderating

Comments are GitHub Discussions, so you moderate them from the **Discussions**
tab of the repo: hide, delete, lock threads, or block users. You get email
notifications for new posts. Spam is minimal because posting requires a GitHub
account.

### The one real drawback

**Commenters need a free GitHub account.** For a technical audience that's
nothing; for a general religious readership it will put some people off. If
that matters more to you than the other benefits, swap it out:

| Option | Cost | Sign-in needed | Notes |
|---|---|---|---|
| **giscus** *(installed)* | Free | GitHub account | No ads, no tracking, you own the data |
| **Hyvor Talk** | ~£5/month | Email, Google, social | Closest thing to giscus without the GitHub barrier |
| **Disqus** | Free tier | Email or social | Widest reach, but shows ads on the free plan and tracks visitors |
| **Cusdis** | Free | None at all | Anonymous posting, very light — but no threading or reactions |

To swap, replace the `#giscus-mount` block in `discuss.html` with whatever embed
code the provider gives you. Everything else on the page stays as it is.

---

## 2. Contact form

The contact page works right now — the email address, the copy button and the
"Open in mail app" button all function with no setup. Only the *form* needs
connecting, and until it is, submitting it shows a message directing people to
email instead.

### To make the form send

1. Sign up at **formspree.io** (the free tier allows 50 submissions a month).
2. Create a new form and point it at `Admin@prophetic-numbers.com`.
3. Formspree gives you an endpoint like `https://formspree.io/f/xdorwkbz`.
4. In `contact.html`, find:

   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

   Replace the whole URL with yours. Commit and push.

5. Formspree emails you once to confirm the address. Click the link or nothing
   will arrive.

The form already includes a hidden honeypot field that catches most bots, and
Formspree adds its own spam filtering on top.

### If you'd rather not bother

Delete the entire `<form>` block from `contact.html`. The email card above it
stands on its own perfectly well, and one fewer moving part is one fewer thing
to maintain.

---

## Where things live

```
index.html      the main argument
about.html      background and editorial stance
discuss.html    comments — needs the two giscus IDs
contact.html    email + optional form
styles.css      all styling for all four pages
site.js         all behaviour for all four pages
assets/         the portrait
```

Both `styles.css` and `site.js` are shared, so a change to either applies
everywhere. The element data, row commentary and evidence list are all plain
arrays near the top of `site.js` — edit the text there and every page updates.
