export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 'product-visualization',
    title: 'Web Application Development',
    description: 'Full-stack web apps built with Next.js and TypeScript, from first prototype to deployment.',
    image: '/images/services/product-visualization.svg',
  },
  {
    id: 'data-science',
    title: 'Data Science & Machine Learning',
    description: 'Data-driven solutions using Python, from data preprocessing and analysis to model development.',
    image: '/images/services/modeling.svg',
  },
  {
    id: 'rendering',
    title: 'API & Backend Development',
    description: 'Clean, documented APIs and server logic that your front end can rely on.',
    image: '/images/services/rendering.svg',
  },
  {
    id: 'character',
    title: 'Computer Vision Prototypes',
    description: 'Proof-of-concept detection and image analysis models, from data preparation to evaluation.',
    image: '/images/services/character.svg',
  },
  {
    id: 'environment',
    title: 'Frontend & UI Engineering',
    description: 'Accessible, responsive interfaces built from your designs.',
    image: '/images/services/environment.svg',
  },
];
