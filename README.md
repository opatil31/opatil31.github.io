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

## Blog posts and publication links

1. Copy `blog/post-template.html` to `blog/my-post.html`. Use a unique lowercase, hyphenated filename.
2. In the copy, change `data-post="your-slug"` to `data-post="my-post"`. Edit the title, description, heading, date, and article body. Remove the robots `noindex` tag when publishing.
3. Add an entry to `window.POSTS` in `posts.js`:
   ```js
   {
     slug: "my-post",
     title: "My post title",
     date: "2026-09-29",
     summary: "A short introduction.",
     publicationId: "seana"
   }
   ```
4. Commit and push both files. The post has its own URL: `https://opatil31.github.io/blog/my-post.html`.

The optional `publicationId` must match a unique `id` in `papers.js`. Your existing paper has `id: "seana"`. This adds links in both directions: the publication gets a blog link, and the post gets a related-publication link. Several posts can reference the same paper. Omit `publicationId` for independent posts. An unknown ID shows no publication link.

Posts are sorted newest first. Use YYYY-MM-DD dates. The template is unlisted and marked noindex; no sample posts appear in the blog. Setting `draft: true` hides an entry from listings, but an uploaded HTML file remains publicly accessible. Keep private drafts off the repository.

Post bodies are ordinary HTML, so their content remains readable without JavaScript. The index and related-publication links use JavaScript. When you rename a slug, also rename its HTML file and update its `data-post` attribute.
