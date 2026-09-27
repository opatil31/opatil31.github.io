(() => {
  const papers = Array.isArray(window.PAPERS) ? window.PAPERS : [];
  const container = document.getElementById('papers');
  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  };
  if (!papers.length) return;
  container.replaceChildren();
  papers.forEach(paper => {
    const article = element('article', 'paper');
    article.append(element('div', 'paper-year', String(paper.year || '')));
    const body = element('div');
    body.append(element('h3', '', paper.title));
    if (paper.authors) body.append(element('p', 'paper-meta', paper.authors));
    if (paper.venue) body.append(element('p', 'paper-meta paper-venue', paper.venue));
    if (paper.abstract) {
      const details = element('details');
      details.append(element('summary', '', 'Read abstract'), element('p', '', paper.abstract));
      body.append(details);
    }
    const links = element('div', 'paper-links');
    (Array.isArray(paper.links) ? paper.links : []).forEach(link => {
      try {
        const url = new URL(link.url);
        if (!['https:', 'http:'].includes(url.protocol)) return;
        const anchor = element('a', '', (link.label || 'Link') + ' ↗');
        anchor.href = url.href;
        links.append(anchor);
      } catch { /* Ignore incomplete links while editing. */ }
    });
    if (links.children.length) body.append(links);
    article.append(body);
    container.append(article);
  });
})();
