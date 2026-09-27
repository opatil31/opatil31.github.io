# Oankar Patil — research portfolio

A responsive gold-and-black academic website with a perspective-projected, animated 3D particle surface. Plain HTML, CSS, and JavaScript: no build step or dependencies.

## Edit your website

- **Bio and name:** edit `index.html`.
- **Photo:** upload a portrait to `assets/portrait.jpg`, then change the image `src` in `index.html` from `assets/portrait.svg` to `assets/portrait.jpg` and its `alt` to `Oankar Patil`. A 4:5 crop works well.
- **Papers:** edit `papers.js`. Copy the commented example into `window.PAPERS = [...]`, replace its example values, and separate multiple papers with commas. The order in the file is the order on the page. Abstracts expand when clicked. Authors, venue, year, abstract, and links are optional. Use `links: []` for no links. No example publications are shown on the real site.
- **Colors and layout:** edit `styles.css`.
- **Animation:** edit `background.js`. Visitors can pause it, and it respects the operating system's reduced-motion preference. Animation stops while the page is hidden or the hero is offscreen.

## Preview locally

Run `python3 -m http.server 8000` from this folder and open http://localhost:8000. You can also open `index.html` directly.

## Publish on GitHub Pages

After merging the portfolio pull request, open this repository's **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/ (root)**, and save.

With the current repository name, the expected project URL is **https://opatil31.github.io/oankar.github.io/**. GitHub shows the confirmed URL in Settings → Pages when deployment completes. For a root user site at `https://opatil31.github.io/`, the repository must instead be named `opatil31.github.io`.

All asset paths are relative, so the site works at either location. No email address, invented papers, or third-party tracking is included.
