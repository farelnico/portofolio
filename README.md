# 3D Designer Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind CSS + React Three Fiber + Drei + Framer Motion + Lucide.

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # versi produksi
npm run typecheck
```

Butuh Node.js 18.17 atau lebih baru.

## Yang perlu kamu ganti

| Apa | Di mana |
| --- | --- |
| Nama, role, email, link Instagram/LinkedIn/Behance | `data/site.ts` (email dan link sosial masih placeholder) |
| Project portfolio | `data/portfolio.ts` (semua project sekarang contoh) |
| Gambar project | `public/images/portfolio/<slug>/` (cover + galeri). Ganti `.svg` placeholder dengan render asli (`.webp`/`.jpg`) dan sesuaikan path di data |
| Layanan | `data/services.ts` |
| Tools & skill | `data/skills.ts` (logo resmi: taruh di `public/icons`, isi field `icon`) |
| Foto profil | `public/images/about.svg` -> ganti dengan fotomu, update path di `components/About.tsx` |
| Warna | `tailwind.config.ts` (`ink`, `electric`) |

Menambah project: tambahkan satu objek ke `projects` di `data/portfolio.ts`. Halaman `/portfolio/<slug>` dan sitemap dibuat otomatis.

Placeholder gambar bisa dibuat ulang dengan `npm run placeholders`.

## Objek 3D hero

`components/HeroScene.tsx` memakai torus knot prosedural (tanpa file model). Untuk model sendiri, taruh file `.glb` di `public/models/` dan muat dengan `useGLTF` dari Drei. Jika WebGL tidak ada atau scene gagal dimuat, `HeroFallback` ditampilkan. Scene berhenti merender saat di luar layar.

## Form kontak

Validasi berjalan di client dan server (`lib/contact.ts`). Pengiriman email lewat [Resend](https://resend.com):

1. Salin `.env.example` ke `.env.local`.
2. Isi `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (alamat pengirim harus domain yang sudah diverifikasi di Resend).

Selama env belum diisi, API mengembalikan 501 dan form menampilkan bahwa pesan **belum terkirim**. Pesan "terkirim" hanya muncul jika Resend menerima email. Untuk produksi, tambahkan rate limiting (mis. Upstash) di `app/api/contact/route.ts`.

## Catatan

- Animasi menghormati `prefers-reduced-motion`; kursor kustom hanya aktif di perangkat dengan mouse.
- Smooth scroll memakai Lenis, transisi halaman lewat `app/template.tsx`.
- Gambar OG untuk project memakai cover `.svg`; ganti ke `.jpg`/`.png` agar tampil di media sosial.
