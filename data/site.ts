// Ganti semua nilai di file ini dengan data aslimu.
export const site = {
  name: 'Farel Nicolessuranto',
  brand: 'Farel',
  role: 'Software Engineer & Informatics Engineering Student',
  description:
    'Software engineer building web applications, machine learning models, data analytics, and computer vision prototypes. A selection of projects, services, and contact information.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  email: 'farelnicholas123@gmail.com',
  socials: [
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/frrlnclss' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/farelnicolessuranto' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/farelnico' },
  ],
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/contact' },
] as const;
