# Working with the Resources page

The Resources page (`resources.html`) has three parts, each built to be edited by
hand. Nothing here needs code knowledge beyond copy, paste, and swap.

---

## 1. Adding a YouTube video

Each video sits in a "slot." There are four to start; the process is the same
for each.

1. On YouTube, open the video → click **Share** → **Embed**.
2. In the code it shows, find the part that looks like:
   ```
   src="https://www.youtube.com/embed/dQw4w9WgXcQ"
   ```
   Copy that whole `https://www.youtube.com/embed/...` URL.
3. In `resources.html`, find the slot you want. It looks like this:
   ```html
   <div class="video-frame">
     <!-- <iframe src="https://www.youtube.com/embed/VIDEO_ID" ... ></iframe> -->
     <div class="video-placeholder"> ... </div>
   </div>
   ```
4. **Uncomment the iframe** (remove the `<!--` at the start and `-->` at the end),
   paste your URL into its `src`, and **delete the entire `<div class="video-placeholder">…</div>`** line.
5. Update the `<h3>` title and `<p>` description in the `.video-meta` below it.

Finished slot:
```html
<div class="video-frame">
  <iframe src="https://www.youtube.com/embed/YOUR_ID" title="Introduction to Ahmadiyyat"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
</div>
```

**Adding a fifth or sixth video:** copy one whole `<div class="video-card">…</div>`
block and paste it after the last one. The grid arranges them automatically.

> Use the `/embed/` URL, not the normal watch URL. `youtube.com/watch?v=ABC`
> won't work in an iframe; `youtube.com/embed/ABC` will.

---

## 2. Adding or changing an official link

Each link is one block:

```html
<a class="link-card" href="https://www.alislam.org" target="_blank" rel="noopener">
  <span class="lc-name">Al Islam <span class="arr">&#8599;</span></span>
  <span class="lc-url">alislam.org</span>
  <p class="lc-desc">Description here.</p>
</a>
```

To add one: copy a block, change the `href`, the name, the visible URL, and the
description. To remove one: delete its block. The grid reflows on its own.

**The links already in the page** are the community's official sites, verified at
the time of building:
- alislam.org — the official website
- mta.tv — the television channel
- reviewofreligions.org — the magazine that ran the codebreaker appeal
- alhakam.org — the weekly newspaper
- trueislam.co.uk — introduction to the faith *(double-check this one — there are
  several "True Islam" sites; swap in whichever you prefer)*
- khalifaofislam.com — about the current Khalifa

Please confirm each URL still works before publishing, and edit any you'd rather
point elsewhere.

---

## 3. Creating a new topic page

The topic grid shows cards for deeper subjects. They start as "coming soon"
placeholders. Turning one into a real page is a two-step job.

### Step A — make the page

1. Copy `about.html` and rename it, e.g. `promised-messiah.html`. Using about.html
   as the base means the nav, footer, fonts and styling all come along for free.
2. Open it and replace: the `<title>`, the `<meta name="description">`, the
   `<h1>` and standfirst, and the body content. Write your material into the
   existing `.prose` blocks.
3. Update the `<link rel="canonical">` and `og:url` to the new address
   (e.g. `https://prophetic-numbers.com/promised-messiah`).

### Step B — link the card to it

In `resources.html`, find the matching topic card:
```html
<a class="topic-card soon" style="--c:var(--ironpeak)">
  <span class="tc-num">01</span>
  <div class="tc-title">The Promised Messiah <span class="badge">Coming soon</span></div>
  ...
</a>
```
Change it to a live link by:
- removing ` soon` from the class,
- adding `href="/promised-messiah"`,
- deleting the `<span class="badge">Coming soon</span>`.

Result:
```html
<a class="topic-card" href="/promised-messiah" style="--c:var(--ironpeak)">
  <span class="tc-num">01</span>
  <div class="tc-title">The Promised Messiah</div>
  ...
</a>
```

### Step C — housekeeping

- Add the new page to `sitemap.xml` (copy an existing `<url>` line).
- If it's a page people should reach from the main menu too, add it to the
  `.nav-links` list — but topic pages usually live only under Resources, which is
  fine.

**Easier option:** just tell me the topic and roughly what you want it to say, and
I'll build the full page and wire up the card for you — same as this one.

---

## A note on the videos

I left the video slots empty on purpose. Specific YouTube videos get renamed,
made private, or deleted, and I didn't want to bake in links that might already be
dead. Pick current videos from the official MTA International or Al Islam channels
and paste them in — that way they're ones you've checked and chosen.
