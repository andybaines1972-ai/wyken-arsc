# Wyken Artistic Roller Skating Club (WARSC)

Website for Wyken Artistic Roller Skating Club — Coventry, West Midlands.
A static, multi-page site (no build step) using shared `styles.css` and `app.js`.

## Run locally
Any static server, e.g.:
```
npx serve .
```
Then open the printed URL.

## Structure
- `index.html` … `contact.html` — the pages
- `styles.css` — all styles (pink & black palette)
- `app.js` — shared data + nav/footer injection + page behaviour
- `images/` — logo (`warsc-logo.svg`) and photos (`club-team.jpg`, `skaters/`)

## Editing content
All content lives in the DATA arrays at the top of `app.js`
(events, results, skaters, shop, grades, documents, gallery). Nav links are
`NAV_MAIN` / `NAV_MORE`.

> Note: skater names are fictitious placeholders for now. Replace with real
> names/photos once photo consent is in place.

## Deploy
Static site — deploys to Vercel (or GitHub Pages / Netlify) with no config.
