// Perspective-projected 3D branching lightning particle field, with no external libraries or network requests.
(() => {
  const canvas = document.getElementById('field');
  const ctx = canvas.getContext('2d');
  const button = document.getElementById('motion');
  if (!ctx) { button.hidden = true; return; }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches, frame = 0, time = 0, last = 0, width, height;
  // Stable, seeded branches in 3D with softly traveling electric pulses.
  let seed = 31;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const bolts = [];
  function branch(origin, direction, count, length, depth) {
    const points = [origin];
    for (let i = 1; i <= count; i++) {
      const previous = points[i - 1];
      points.push([
        previous[0] + direction[0] * length + (random() - .5) * length * 1.9,
        previous[1] + direction[1] * length + (random() - .5) * length * .7,
        previous[2] + direction[2] * length + (random() - .5) * length * 1.3
      ]);
    }
    bolts.push({ points, depth, phase: random() * Math.PI * 2 });
    if (depth < 2) {
      for (let i = 4; i < count - 2; i += 5) {
        branch(points[i], [(random() > .5 ? 1 : -1) * (.6 + random()), .5 + random() * .5, (random() - .5) * 1.5], Math.max(5, Math.floor(count * .43)), length * .8, depth + 1);
      }
    }
  }
  branch([-.25, -2.2, 0], [.12, 1, .05], 30, .14, 0);
  branch([.7, -1.9, 1.1], [-.16, 1, -.1], 26, .14, 1);
  const dust = Array.from({ length: 240 }, () => [
    (random() - .5) * 5.5, (random() - .5) * 5.2, (random() - .5) * 4, random() * Math.PI * 2
  ]);
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const small = width < 600;
    const centerX = width * (small ? .83 : .75), centerY = small ? 410 : 405;
    const scale = Math.min(width * (small ? .33 : .17), 230);
    const yaw = -.22 + Math.sin(time * .16) * .24;
    function project(point, phase = 0) {
      const [x, y, z] = point;
      const drift = Math.sin(time * .35 + y * 1.6 + phase) * .035;
      const rx = (x + drift) * Math.cos(yaw) + z * Math.sin(yaw);
      const rz = -(x + drift) * Math.sin(yaw) + z * Math.cos(yaw);
      const perspective = 5 / (5 + rz);
      return [centerX + rx * scale * perspective, centerY + y * scale * perspective, perspective];
    }
    ctx.globalCompositeOperation = 'lighter';
    dust.forEach(([x, y, z, phase]) => {
      const p = project([x + Math.sin(time * .12 + phase) * .08, y, z]);
      const alpha = .12 + .16 * (.5 + .5 * Math.sin(time * .6 + phase));
      ctx.fillStyle = `rgba(222,173,70,${alpha})`;
      ctx.beginPath(); ctx.arc(p[0], p[1], Math.max(.4, p[2] * .8), 0, Math.PI * 2); ctx.fill();
    });
    bolts.forEach(bolt => {
      const projected = bolt.points.map(p => project(p, bolt.phase));
      const pulse = .55 + .45 * Math.sin(time * 1.15 + bolt.phase);
      const strength = (1 - bolt.depth * .26) * (.5 + pulse * .5);
      // Layered halos and fine gold cores create glow without full-screen flashes.
      [[9, .025], [3, .10], [.7, .65]].forEach(([lineWidth, alpha]) => {
        ctx.lineWidth = lineWidth * (1 - bolt.depth * .2);
        ctx.strokeStyle = `rgba(231,178,70,${alpha * strength})`;
        ctx.beginPath();
        projected.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
        ctx.stroke();
      });
      for (let i = 0; i < projected.length - 1; i++) {
        const p = projected[i], q = projected[i + 1];
        for (let j = 0; j < 4; j++) {
          const fraction = j / 4;
          const progress = (i + fraction) / (projected.length - 1);
          const wave = Math.pow(.5 + .5 * Math.cos(progress * Math.PI * 4 - time * 1.8 + bolt.phase), 8);
          ctx.fillStyle = `rgba(255,221,143,${(.18 + wave * .78) * strength})`;
          ctx.beginPath();
          ctx.arc(p[0] + (q[0] - p[0]) * fraction, p[1] + (q[1] - p[1]) * fraction, (.6 + wave * 1.15) * p[2], 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    ctx.globalCompositeOperation = 'source-over';
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
