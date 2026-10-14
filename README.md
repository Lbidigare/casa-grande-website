# Casa Grande Apartments: Website

Website for Casa Grande Apartments, Harrison Township, MI.
Built with [Astro](https://astro.build) and published free on GitHub Pages.

---

## Updating the website (no coding needed)

Almost everything that changes lives in **one file**:
[`src/data/casa-grande.yaml`](src/data/casa-grande.yaml)

It controls rent, availability, apartment descriptions, contact details,
amenities and which photos appear where.

**To make a change on github.com:**

1. Open `src/data/casa-grande.yaml` and click the pencil icon (Edit).
2. Change the value, e.g. `rent: 995` → `rent: 1025`
   or `availability: Available December 1`.
3. Click **Commit changes**.
4. The site rebuilds and goes live in about 2 minutes. Check progress under the
   **Actions** tab. A green check means it's live; a red X means something in
   the file needs fixing (the live site stays unchanged until it's fixed).

**Tips**
- Write `TBD` for anything not yet confirmed. The site shows a marked placeholder instead of guessing.
- Keep the spacing at the start of each line exactly as it is. YAML uses indentation.
- Put text containing a colon (`:`) in quotes.

### Adding photos

1. Upload the photo into the matching folder under `src/assets/photos/`
   (`exterior`, `living`, `kitchens`, `bedrooms`, `bathrooms`, `basements`, `community`).
   On github.com: open the folder → **Add file → Upload files**.
2. Reference it in `casa-grande.yaml`, e.g. in the `gallery` list:
   ```yaml
   gallery:
     - file: exterior/front-entrance.jpg
       category: exterior
       alt: Front entrance of Casa Grande Apartments
   ```
   or as an apartment photo (`photos:`), a floor plan (`floor_plan:`, file in
   `src/assets/floorplans/`) or the homepage photo (`hero_photo:`).

Upload full-quality originals. The build creates small, fast versions for
phones and computers automatically. Original files are never modified.

### The logo

Place the logo file (SVG preferred, or a high-resolution PNG) in
`src/assets/brand/`. It replaces the text name in the header automatically.

---

## Preview mode and launch

`preview_mode: true` at the top of `casa-grande.yaml` marks every unconfirmed
detail with a yellow **to confirm** tag and keeps search engines away.

At launch, set `preview_mode: false`. The build then **refuses to publish**
while anything is still `TBD` or unconfirmed, and lists what's missing, so
unverified information can't go live by accident.

See [`docs/launch-checklist.md`](docs/launch-checklist.md).

---

## For developers

```bash
npm install
npm run dev       # local preview at http://localhost:4321/casa-grande-website/
npm run build     # production build into dist/
```

| Path | Purpose |
|---|---|
| `src/data/casa-grande.yaml` | All property information |
| `src/assets/` | Logo, photos, floor plans (originals) |
| `src/components/` | Reusable sections (header, apartment card, gallery…) |
| `src/pages/` | One file per page |
| `src/styles/global.css` | Colors, fonts and spacing (design tokens at the top) |
| `.github/workflows/deploy.yml` | Build & publish to GitHub Pages |
| `docs/design-decisions.md` | Approved design choices and their sources |

No forms, databases or tracking: the site collects no visitor data.
