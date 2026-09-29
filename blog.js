(() => {
  const root = new URL('./', document.currentScript.src);
  const node = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };
  const seen = new Set();
  const posts = (Array.isArray(window.POSTS) ? window.POSTS : []).filter(post => {
    if (!post || post.draft || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug || '') || !post.title || seen.has(post.slug)) return false;
    seen.add(post.slug); return true;
  }).sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  const href = post => new URL('blog/' + post.slug + '.html', root).href;
  const paperFor = post => (window.PAPERS || []).find(p => p.id && p.id === post.publicationId);
  const paperLink = paper => {
    const link = node('a', '', paper.title);
    link.href = new URL('index.html#paper-' + encodeURIComponent(paper.id), root).href;
    return link;
  };
  window.Blog = { posts, href };
  const list = document.getElementById('posts');
  if (list && posts.length) {
    list.replaceChildren();
    posts.forEach(post => {
      const card = node('article', 'blog-card');
      const time = node('time', 'blog-date', post.date || '');
      if (/^\d{4}-\d{2}-\d{2}$/.test(post.date || '')) time.dateTime = post.date;
      const content = node('div');
      const title = node('h3');
      const link = node('a', '', post.title + ' ↗'); link.href = href(post); title.append(link);
      content.append(title);
      if (post.summary) content.append(node('p', '', post.summary));
      const paper = paperFor(post);
      if (paper) { const related = node('p', 'blog-related', 'Related publication: '); related.append(paperLink(paper)); content.append(related); }
      card.append(time, content); list.append(card);
    });
  }
  const related = document.getElementById('related-publication');
  const post = posts.find(p => p.slug === document.body.dataset.post);
  const paper = post && paperFor(post);
  if (related && paper) {
    related.hidden = false;
    related.append(node('p', 'eyebrow', 'RELATED PUBLICATION'), paperLink(paper));
  }
})();
