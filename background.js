// Perspective-projected 3D torus, with no external libraries or network requests.
(() => {
  const canvas = document.getElementById('field');
  const ctx = canvas.getContext('2d');
  const button = document.getElementById('motion');
  if (!ctx) { button.hidden = true; return; }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches, frame = 0, time = 0, last = 0, width, height;
  const points = [];
  for (let i = 0; i < 105; i++) {
    const u = i / 105 * Math.PI * 2;
    for (let j = 0; j < 26; j++) {
      const v = j / 26 * Math.PI * 2;
      const r = 1.6 + .52 * Math.cos(v);
      points.push([r * Math.cos(u), r * Math.sin(u), .52 * Math.sin(v), u, v]);
    }
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const small = width < 600;
    const centerX = width * (small ? .9 : .74), centerY = small ? 410 : 390;
    const scale = Math.min(width * .25, 345);
    const a = .72 + time * .11, b = -.45 + time * .07;
    const projected = points.map(([x,y,z,u,v]) => {
      const wave = 1 + .06 * Math.sin(u * 3 + v * 2 + time * .6);
      x *= wave; y *= wave;
      const ry = y * Math.cos(a) - z * Math.sin(a);
      const rz = y * Math.sin(a) + z * Math.cos(a);
      const rx = x * Math.cos(b) + rz * Math.sin(b);
      const depth = -x * Math.sin(b) + rz * Math.cos(b);
      const perspective = 4.5 / (4.5 + depth);
      return [centerX + rx * scale * perspective * .65, centerY + ry * scale * perspective * .65, depth, perspective];
    });
    // Fine lines follow both dimensions of the surface, revealing its volume.
    projected.forEach((p, i) => {
      const next = projected[Math.floor(i / 26) * 26 + (i + 1) % 26];
      ctx.strokeStyle = `rgba(207,164,78,${.045 + (2.3 - p[2]) * .018})`;
      ctx.lineWidth = .55;
      ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(next[0],next[1]);ctx.stroke();
      if (i % 2 === 0) {
        const q = projected[(i + 26) % projected.length];
        ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke();
      }
    });
    projected.sort((p,q) => q[2] - p[2]).forEach(p => {
      ctx.fillStyle = `rgba(232,193,114,${.24 + (2.3-p[2])*.13})`;
      ctx.beginPath();ctx.arc(p[0],p[1],Math.max(.5,p[3]*.95),0,Math.PI*2);ctx.fill();
    });
  }
  function resize() {
    width = canvas.clientWidth; height = canvas.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * dpr;canvas.height = height * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);draw();
  }
  function tick(now) {
    if (last) time += Math.min((now-last)/1000,.05);
    last = now;draw();frame=requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);last=0;
    button.setAttribute('aria-pressed',String(paused));
    button.textContent=paused ? 'Resume animation ▷' : 'Pause animation Ⅱ';
    if (!paused && !document.hidden && window.scrollY < height) frame=requestAnimationFrame(tick);
  }
  button.addEventListener('click',()=>{paused=!paused;sync();});
  preference.addEventListener('change',e=>{paused=e.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  let inView=true;
  window.addEventListener('scroll',()=>{const next=window.scrollY<height;if(next!==inView){inView=next;sync();}},{passive:true});
  window.addEventListener('resize',resize);
  resize();sync();
})();
