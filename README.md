# Chinese Banquet Wedding Site Template

A no-build wedding website built around a Chinese banquet structure: banquet hall details, a collapsible banquet menu, a banquet-style run-of-show (toasts, multi-course dinner, round tables), a red-envelope-first gifts section with an optional registry, a countdown timer, story timeline, FAQ accordion, and a photo gallery grid. Built with plain HTML/CSS/JS, so there's nothing to install.

**Your content lives in three data files, not in `index.html` itself.** That's on purpose: it means you (or Claude) can freely redesign or replace `index.html` later — a new layout, new colors, a template refresh — without losing anything you've already entered, as long as `config.js`, `menu.js`, and `faq.js` stay put.

```
index.html    the page structure and design (safe to replace/redesign)
config.js     names, date, venue, RSVP, and registry details
menu.js       the banquet course list
faq.js        the FAQ questions and answers
site.js       the code that renders config.js/menu.js/faq.js into the page
favicon.svg   the gem icon used as the browser tab icon
```

## 1. Customize

Open `config.js` and fill in your details:

```js
const CONFIG = {
  nameOne: "Partner One",
  nameTwo: "Partner Two",
  weddingDate: "2027-06-12T16:00:00", // powers the live countdown
  dateDisplay: "June 12, 2027",       // human-readable date shown throughout
  banquetCity: "San Jose, CA",

  banquet: { venue: "...", address: "...", time: "...", mapLink: "..." },

  rsvp:     { link: "...", deadline: "May 1, 2027" },
  registry: { link1: "...", link2: "..." }, // set either to "" to hide that link
  email: "hello@example.com"
};
```
- `weddingDate` must stay in `YYYY-MM-DDTHH:mm:ss` format (local time) or the countdown won't run.
- Setting `registry.link1` or `registry.link2` to an empty string `""` hides that link automatically.

Open `menu.js` to edit the banquet course list — add, remove, or reorder entries freely:

```js
const MENU_COURSES = [
  { en: "Roasted Pork Combination Platter", zh: "金豬大拼盤" },
  // ...
];
```

Open `faq.js` to edit the FAQ questions and answers the same way:

```js
const FAQ_ITEMS = [
  { question: "Is there a dress code?", answer: "..." },
  // ...
];
```

Everything else — the "Our Story" timeline and the day-of schedule — lives directly in `index.html` as plain paragraphs and list items, since they're closer to freeform writing than structured data; just rewrite them in place. The Chinese phrases throughout (囍, 百年好合, etc.) are traditional wedding terms — feel free to swap, translate differently, or remove any that don't match your family's dialect or customs. There's no tea ceremony section on this page by design, since it's assumed to be a private family event — add one back in if yours isn't.

## 2. Add photos (optional)

Create an `images/` folder next to `index.html`, drop your photos in, then replace the `<div class="photo-placeholder">photo-1.jpg</div>` blocks in the Gallery section with:

```html
<img src="images/photo-1.jpg" alt="Description of the photo" style="width:100%;height:100%;object-fit:cover;">
```

## 3. Publish with GitHub Pages

1. Create a new GitHub repository (public repos get free Pages hosting).
2. Add `index.html`, `config.js`, `menu.js`, `faq.js`, `site.js`, `favicon.svg`, and your `images/` folder (if used) to the repo root.
3. Commit and push.
4. In the repo, go to **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to "Deploy from a branch."
6. Choose the `main` branch and `/ (root)` folder, then **Save**.
7. Your site will be live in a minute or two at:
   `https://<your-username>.github.io/<repo-name>/`

To use a custom domain instead, add a `CNAME` file with your domain name to the repo root and configure DNS per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Notes

- Fonts load from Google Fonts (Fraunces, Work Sans, JetBrains Mono) — no local font files needed.
- The countdown silently does nothing if `CONFIG.weddingDate` isn't a valid date string.
- `favicon.svg` (the pear-cut gem icon) needs to stay in the same folder as `index.html` — it's linked by a relative path in the `<head>`.
- All five files (`index.html`, `config.js`, `menu.js`, `faq.js`, `site.js`) need to stay in the same folder — `index.html` loads the other four via relative `<script src="...">` tags, in that order.
- Fully responsive, with a collapsible mobile nav and reduced-motion support for the entrance animations.
