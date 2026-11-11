export interface Tool {
  name: string;
  /** Dua huruf untuk monogram. Letakkan logo resmi di public/icons lalu isi `icon` jika mau memakainya. */
  mark: string;
  icon?: string;
  use: string;
}

export const tools: Tool[] = [
  { name: 'TypeScript',      mark: 'Ts', use: 'Typed code for web apps and tools' },
  { name: 'React & Next.js', mark: 'Nx', use: 'Interactive interfaces and full-stack apps' },
  { name: 'Python',          mark: 'Py', use: 'Scripting, data processing, and model training' },
  { name: 'OpenCV',          mark: 'Cv', use: 'Image processing and computer vision applications' },
  { name: 'Git & GitHub',    mark: 'Gt', use: 'Version control and collaboration' },
  { name: 'Figma',           mark: 'Fg', use: 'Reading designs and prototyping layouts' },
];

export const skills = [
  'Full-stack web development',
  'Machine learning & deep learning',
  'Computer vision',
  'API design',
  'Responsive & accessible UI',
  'Clean, maintainable code',
];
