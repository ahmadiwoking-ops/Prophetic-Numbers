# Updating the live site

These files replace what's currently in the repository. From Git Bash, in your
`Website` folder:

```bash
# remove the old single-page version (keep .git!)
git rm DEPLOY.md          # optional — superseded by SETUP.md
```

Then copy the new files in, overwriting where they clash, and:

```bash
git add .
git commit -m "Add About, Contact and Discussion pages; fix portrait aspect ratio"
git push
```

Vercel redeploys automatically within about a minute.

## Check afterwards

- `/` — portrait should now be a tidy 4:5 plate, not stretched
- `/about` — loads (no `.html` needed; `cleanUrls` in vercel.json handles this)
- `/contact` — copy button works, mail button opens your mail app
- `/discuss` — shows the setup panel until you add the giscus IDs

If `/about` 404s, `vercel.json` didn't get committed. Check it's in the repo.
