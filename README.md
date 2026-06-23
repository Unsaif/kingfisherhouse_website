# Kingfisher House

Marketing site for **Kingfisher House** — wild, foraged vinegars from the
hedgerows of the Blackwater Valley, Ireland.

🌐 Live at **[kingfisherhouse.ie](https://kingfisherhouse.ie)**

## About

A static website showcasing the Kingfisher House range of three vinegars:

- **Hawthorn**
- **Elderflower**
- **Cleaver**

The site is a set of hand-written HTML pages styled with an inline design
system and a shared `support.js` runtime. There is no build step — what is in
the repository is what is served.

## Pages

| File              | Page                          |
| ----------------- | ----------------------------- |
| `index.html`      | Home                          |
| `hawthorn.html`   | Hawthorn Vinegar              |
| `elderflower.html`| Elderflower Vinegar           |
| `cleaver.html`    | Cleaver Vinegar               |
| `story.html`      | Our Story                     |
| `our-place.html`  | Our Place                     |

## Project structure

```
.
├── *.html                # Site pages
├── support.js            # Shared front-end runtime used by every page
├── favicon-32x32.png     # Site icon (browser tab)
├── favicon-180x180.png   # Apple touch icon
├── favicon-512x512.png   # High-resolution / PWA icon
├── assets/
│   ├── kingfisher_logo_tight.png
│   ├── og/               # 1200x630 link-preview (Open Graph) images
│   └── pictures/         # Photography used on the live pages
├── uploads/              # Product label + bottle mockup images
├── pictures/             # Original photography (working copies)
├── design/               # Label artwork + logo source files (not served)
└── CNAME                 # Custom domain (kingfisherhouse.ie) for GitHub Pages
```

> Private working documents (costing model, compliance/awards plan, label spec)
> live in a local `docs/` folder that is **git-ignored** — this is a public
> repository, so they are deliberately kept out of it.

The favicons are generated from `design/kingfisher_house_enhanced.png` (the
kingfisher logo). To regenerate them, crop the source to a centred square and
resize:

```bash
sips -c 1024 1024 design/kingfisher_house_enhanced.png --out /tmp/kf.png
for s in 32 180 512; do sips -z $s $s /tmp/kf.png --out favicon-${s}x${s}.png; done
```

A few legacy/unused assets are kept on disk but **git-ignored** (not part of the
repo): `script.js`, `styles.css`, and `design/{cleaver.png,
content_capped_resolution.webp, kingfisher_house.svg}`. None are referenced by
any page.

## Link previews (social cards)

Each page carries Open Graph + Twitter Card tags in its `<head>`, so sharing a
link on WhatsApp, iMessage, Slack, Facebook, etc. shows a title, description and
preview image. Preview images live in `assets/og/` (one per page, 1200x630).

> Open Graph `og:image`/`og:url` values use **absolute** URLs
> (`https://kingfisherhouse.ie/...`) — link scrapers do not resolve
> root-relative paths. If the domain ever changes, update those tags.

To refresh a preview image, regenerate a 1200x630 crop, e.g.:

```bash
sips --resampleWidth 1200 -c 630 1200 -s format jpeg -s formatOptions 72 \
  uploads/vinegar_bottle_mockup_hawthorn_cap.png --out assets/og/hawthorn.jpg
```

After deploying, you can force a re-scrape with Facebook's
[Sharing Debugger](https://developers.facebook.com/tools/debug/) (also clears
caches used by other apps).

## Waitlist signups

The "Join the Waitlist" form on the home page (`#signup`) posts to
[Web3Forms](https://web3forms.com), which emails each signup to
**tim@kingfisherhouse.ie**. No server of our own is required.

**One-time setup:** get a free access key at <https://web3forms.com> (enter
`tim@kingfisherhouse.ie` as the destination), then paste it into `index.html`:

```js
WEB3FORMS_ACCESS_KEY = 'YOUR-WEB3FORMS-ACCESS-KEY';
```

Until a real key is in place the form will validate the email and show an error
on submit rather than confirming. Once the key is set, submitting shows
"You're on the list." and the address arrives in the inbox. The contact email
links throughout the site also point at `tim@kingfisherhouse.ie`.

## Hosting

The site is published with **GitHub Pages** from the `main` branch. The
`CNAME` file points the custom domain `kingfisherhouse.ie` at it. Pushing to
`main` deploys automatically.

## Local preview

No tooling required — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

> Note: the favicon and image links use root-relative paths (e.g.
> `/favicon-32x32.png`), which resolve correctly when served from
> the domain root or a local server. Opening the files directly with `file://`
> may not load those root-relative assets.
