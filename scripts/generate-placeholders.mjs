// Membuat render placeholder (SVG) untuk portfolio, services, dan avatar.
// Ganti file hasilnya dengan render asli (jpg/webp/png) dan sesuaikan path di data/portfolio.ts.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const hsl = (h, s, l, a = 1) => `hsla(${h},${s}%,${l}%,${a})`;
const rng = (seed) => { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
const f = (n) => Math.round(n * 10) / 10;
let uid = 0;

function smooth(pts) {
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const n = pts.length;
  let d = `M${f(mid(pts[0], pts[1])[0])},${f(mid(pts[0], pts[1])[1])}`;
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n], m = mid(p, pts[(i + 1) % n]);
    d += ` Q${f(p[0])},${f(p[1])} ${f(m[0])},${f(m[1])}`;
  }
  return d + 'Z';
}

function shape(kind, cx, cy, s, h, rot = 0) {
  const id = `g${uid++}`;
  const lin = `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hsl(h, 90, 80)}"/><stop offset=".45" stop-color="${hsl(h, 75, 45)}"/><stop offset="1" stop-color="${hsl(h, 55, 11)}"/></linearGradient>`;
  const rad = `<radialGradient id="${id}r" cx=".32" cy=".28" r=".85"><stop offset="0" stop-color="${hsl(h, 95, 86)}"/><stop offset=".3" stop-color="${hsl(h, 80, 56)}"/><stop offset=".75" stop-color="${hsl(h, 60, 17)}"/><stop offset="1" stop-color="${hsl(h, 50, 7)}"/></radialGradient>`;
  const shadow = `<ellipse cx="${f(cx)}" cy="${f(cy + s * 1.12)}" rx="${f(s * 0.85)}" ry="${f(s * 0.14)}" fill="#000" opacity=".6" filter="url(#sh)"/>`;
  const gloss = (x, y, rx, ry, a) => `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="#fff" opacity=".38" filter="url(#soft)" transform="rotate(${a} ${f(x)} ${f(y)})"/>`;
  let body = '';
  if (kind === 'sphere') {
    body = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(s)}" fill="url(#${id}r)"/>` + gloss(cx - s * 0.36, cy - s * 0.42, s * 0.26, s * 0.13, -35);
  } else if (kind === 'torus') {
    body = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(s * 0.72)}" fill="none" stroke="url(#${id})" stroke-width="${f(s * 0.52)}"/>` +
      `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(s * 0.9)}" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="3"/>`;
  } else if (kind === 'cube') {
    const k = s * 0.95, a = 0.866 * k, p = (x, y) => `${f(cx + x)},${f(cy + y)}`;
    const face = (pts, l) => `<polygon points="${pts.join(' ')}" fill="${hsl(h, 70, l)}" stroke="${hsl(h, 70, l)}" stroke-width="${f(s * 0.03)}" stroke-linejoin="round"/>`;
    body = face([p(0, -k), p(a, -k / 2), p(0, 0), p(-a, -k / 2)], 66) + face([p(a, -k / 2), p(a, k / 2), p(0, k), p(0, 0)], 36) + face([p(-a, -k / 2), p(0, 0), p(0, k), p(-a, k / 2)], 19);
  } else if (kind === 'pyramid') {
    const p = (x, y) => `${f(cx + x * s)},${f(cy + y * s)}`;
    body = `<polygon points="${p(0, -1.05)} ${p(-0.95, 0.7)} ${p(0.12, 0.98)}" fill="${hsl(h, 70, 52)}" stroke="${hsl(h, 70, 52)}" stroke-width="${f(s * 0.02)}" stroke-linejoin="round"/>` +
      `<polygon points="${p(0, -1.05)} ${p(0.12, 0.98)} ${p(0.98, 0.58)}" fill="${hsl(h, 65, 20)}" stroke="${hsl(h, 65, 20)}" stroke-width="${f(s * 0.02)}" stroke-linejoin="round"/>`;
  } else if (kind === 'capsule') {
    body = `<rect x="${f(cx - s * 0.45)}" y="${f(cy - s * 1.05)}" width="${f(s * 0.9)}" height="${f(s * 2.1)}" rx="${f(s * 0.45)}" fill="url(#${id})"/>` +
      `<rect x="${f(cx - s * 0.3)}" y="${f(cy - s * 0.85)}" width="${f(s * 0.1)}" height="${f(s * 1.2)}" rx="${f(s * 0.05)}" fill="#fff" opacity=".35" filter="url(#soft)"/>`;
  } else if (kind === 'rings') {
    body = [-25, 35, 95].map((a, i) => `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(s)}" ry="${f(s * 0.36)}" fill="none" stroke="url(#${id})" stroke-width="${f(s * 0.09)}" transform="rotate(${a} ${f(cx)} ${f(cy)})" opacity="${1 - i * 0.12}"/>`).join('') +
      `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(s * 0.22)}" fill="url(#${id}r)"/>`;
  } else {
    const r = rng(Math.floor(cx * 7 + cy * 13));
    const pts = Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2, q = s * (0.78 + r() * 0.34); return [cx + Math.cos(a) * q, cy + Math.sin(a) * q * 0.92]; });
    body = `<path d="${smooth(pts)}" fill="url(#${id}r)"/>` + gloss(cx - s * 0.3, cy - s * 0.4, s * 0.24, s * 0.1, -30);
  }
  return `<defs>${lin}${rad}</defs>${shadow}<g transform="rotate(${rot} ${f(cx)} ${f(cy)})">${body}</g>`;
}

function art({ w, h, hue, kind, seed, variant }) {
  const r = rng(seed * 97 + variant * 13);
  const base = Math.min(w, h);
  const parts = [];
  if (variant === 3) parts.push(shape('rings', w * 0.5, h * 0.52, base * 0.52, hue + 20, 0));
  if (variant === 2) {
    [-0.27, 0, 0.27].forEach((dx, i) => parts.push(shape(kind, w * (0.5 + dx), h * (0.5 + (i - 1) * 0.04), base * (0.17 + i * 0.045), hue + i * 14, r() * 30 - 15)));
  } else {
    const big = variant === 1 ? 0.4 : 0.29;
    const cx = variant === 1 ? w * (0.36 + r() * 0.28) : w * 0.5;
    parts.push(shape(kind, cx, h * 0.5, base * big, hue, r() * 24 - 12));
  }
  for (let i = 0; i < 3; i++) parts.push(shape('sphere', w * (0.12 + r() * 0.76), h * (0.14 + r() * 0.62), base * (0.025 + r() * 0.04), hue + 30, 0));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
<defs>
<radialGradient id="bg" cx=".3" cy=".22" r="1.05"><stop offset="0" stop-color="${hsl(hue, 50, 21)}"/><stop offset=".55" stop-color="${hsl(hue, 32, 9)}"/><stop offset="1" stop-color="#0c0d11"/></radialGradient>
<radialGradient id="floor" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${hsl(hue, 85, 55, 0.35)}"/><stop offset="1" stop-color="${hsl(hue, 85, 55, 0)}"/></radialGradient>
<filter id="sh" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="${f(base * 0.018)}"/></filter>
<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${f(base * 0.008)}"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<ellipse cx="${w * 0.5}" cy="${h * 0.86}" rx="${w * 0.42}" ry="${h * 0.12}" fill="url(#floor)"/>
${parts.join('\n')}
</svg>`;
}

const write = (rel, svg) => { const p = join(out, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, svg); };

const projects = [
  ['obsidian-sneaker', 245, 'blob'], ['halcyon-watch', 210, 'torus'], ['warden-07', 275, 'pyramid'],
  ['moss-courier', 190, 'capsule'], ['drift-basin', 225, 'sphere'], ['lantern-quarter', 255, 'cube'],
  ['fluxfold', 285, 'rings'], ['glass-tide', 200, 'blob'], ['atrium-house', 235, 'cube'],
  ['pavilion-study', 265, 'pyramid'], ['type-in-volume', 220, 'capsule'],
];
projects.forEach(([slug, hue, kind], i) => {
  ['cover', 'g1', 'g2', 'g3'].forEach((name, v) => write(`portfolio/${slug}/${name}.svg`, art({ w: 1600, h: 1200, hue, kind, seed: i + 1, variant: v })));
});
[['product-visualization', 240, 'capsule'], ['modeling', 205, 'cube'], ['rendering', 265, 'sphere'], ['character', 280, 'blob'], ['environment', 220, 'pyramid']]
  .forEach(([id, hue, kind], i) => write(`services/${id}.svg`, art({ w: 1200, h: 900, hue, kind, seed: 40 + i, variant: 0 })));

// Avatar placeholder: kepala + bahu abstrak
{
  const w = 800, h = 1000, hue = 250;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
<defs><radialGradient id="bg" cx=".4" cy=".2" r="1"><stop offset="0" stop-color="${hsl(hue, 50, 22)}"/><stop offset=".6" stop-color="${hsl(hue, 32, 9)}"/><stop offset="1" stop-color="#0c0d11"/></radialGradient>
<filter id="sh" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="10"/></filter><filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
${shape('capsule', 400, 1010, 330, hue, 90)}
${shape('sphere', 400, 410, 190, hue + 10, 0)}
</svg>`;
  write('about.svg', svg);
}
console.log('Placeholder images generated in public/images');
