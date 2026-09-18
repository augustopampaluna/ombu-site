# OMBU Collective static site

Single-page static website for OMBU Collective, an Amsterdam-based live techno collective.

The public page is intentionally small: HTML, CSS, and vanilla JavaScript only. There is no CMS, backend, database, shop, newsletter, or build pipeline.

## Local development

Open `index.html` directly in a browser, or serve the folder with any static server.

Example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

On Windows, depending on the configured Python command:

```bash
python -m http.server 8000
```

## Project structure

```text
/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
|-- robots.txt
|-- sitemap.xml
`-- assets/
    |-- logo/
    |-- artists/
    |-- photos/
    `-- icons/
```

## Assets

Place final assets in these locations:

- Logo SVG: `assets/logo/ombu-logo.svg`
- Artist photos: `assets/artists/artist-01.jpg` through `assets/artists/artist-04.jpg`
- Media photos: `assets/photos/photo-01.jpg` through `assets/photos/photo-08.jpg`
- Favicon: `assets/icons/favicon.svg`
- OpenGraph image: `assets/og-image.jpg`

The current page works without the image files. Missing artist and media images fall back to built-in visual placeholders.

The visible OMBU mark is a typographic placeholder based on the `OM / BU` direction. Replace it with the final SVG logo when it exists.

## Content editing

Most content that will change is centralized in `script.js`:

- Artist names
- Artist short bios
- Artist social links
- Global Instagram, SoundCloud, YouTube, and Bandcamp links
- Booking/contact email
- Media photo paths
- About bio

Unknown public information is intentionally marked as `[TBD]`. Do not replace placeholders until the real content is confirmed.

The short about text currently appears in `index.html` as:

```text
[TBD - OMBU COLLECTIVE BIO]
```

Replace it with the final 60 to 120 word collective bio when ready.

## SEO

Prepared metadata:

- Title: `OMBU Collective - Live Techno Amsterdam`
- Description: `OMBU Collective is an Amsterdam-based live techno collective.`
- Canonical URL: `https://ombucollective.com/`
- OpenGraph and Twitter image path: `assets/og-image.jpg`
- `robots.txt`
- `sitemap.xml`

Add the final `assets/og-image.jpg` before launch so social previews render correctly.

## Deployment

This project can be deployed as a static site on GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any simple static host.

Typical deployment steps:

1. Push this repository to the chosen hosting platform.
2. Configure the platform to publish the repository root.
3. Add the custom domain `ombucollective.com` in the hosting platform.
4. In the DNS provider for `ombucollective.com`, create the records requested by the hosting platform.
5. Enable HTTPS in the hosting platform once DNS has propagated.

Do not assume a specific DNS provider. Follow the DNS instructions shown by the selected host.
