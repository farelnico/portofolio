export const categories = [
  'Full-stack Development',
  'Backend Engineering',
  'Data Science & Analytics',
  'Machine Learning',
  'Computer Vision',
  'Other Projects',
] as const;
export type Category = (typeof categories)[number];

export interface ProjectImage { src: string; alt: string }
export interface WorkflowStep { title: string; text: string }
export interface Project {
  slug: string;
  title: string;
  category: Category;
  year: number;
  summary: string;
  description: string[];
  role: string;
  tools: string[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  workflow: WorkflowStep[];
  featured?: boolean;
}

const images = (slug: string, title: string) => ({
  cover: { src: `/images/portfolio/${slug}/cover.jpg`, alt: `${title}, main screenshot` },
  gallery: [1, 2, 3].map((n) => ({ src: `/images/portfolio/${slug}/g${n}.jpg`, alt: `${title}, screenshot ${n}` })),
});

const workflows: Record<Category, WorkflowStep[]> = {
  'Full-stack Development': [
    { title: 'Requirements and planning', text: 'Clarify the problem, the users, and what done looks like.' },
    { title: 'Design and architecture', text: 'Sketch the data model, API, and interface before writing code.' },
    { title: 'Build', text: 'Implement the frontend and backend in small, reviewable steps.' },
    { title: 'Test and deploy', text: 'Test the key flows, deploy, and fix what real usage reveals.' },
  ],
  'Backend Engineering': [
    { title: 'Requirements and API contract', text: 'Agree on what the service must do and define its endpoints first.' },
    { title: 'Data modeling', text: 'Design the schema and relationships around the main queries.' },
    { title: 'Implementation', text: 'Build the services with clear structure, validation, and error handling.' },
    { title: 'Testing and documentation', text: 'Cover the critical paths with tests and document how to use the API.' },
  ],
  'Data Science & Analytics': [
    { title: 'Question and data', text: 'Turn a vague goal into a specific question and find the data to answer it.' },
    { title: 'Cleaning and exploration', text: 'Clean the data and explore it to spot patterns and problems.' },
    { title: 'Analysis and modeling', text: 'Apply statistics or models to answer the question.' },
    { title: 'Insights and communication', text: 'Present the findings with clear charts and plain-language conclusions.' },
  ],
  'Machine Learning': [
    { title: 'Problem framing', text: 'Define the prediction task, the target, and how success is measured.' },
    { title: 'Data and features', text: 'Prepare the dataset and engineer features the model can learn from.' },
    { title: 'Training and tuning', text: 'Train candidate models and tune their key hyperparameters.' },
    { title: 'Evaluation and iteration', text: 'Evaluate on held-out data, study the errors, and improve.' },
  ],
  'Computer Vision': [
    { title: 'Problem and data', text: 'Define the detection task and prepare the dataset and annotations.' },
    { title: 'Model training', text: 'Train candidate models and tune the key hyperparameters.' },
    { title: 'Evaluation', text: 'Compare the models on the same held-out data using agreed metrics.' },
    { title: 'Documentation', text: 'Write up the findings so the results can be reproduced.' },
  ],
  'Other Projects': [
    { title: 'Idea and scope', text: 'Decide what the project should do and keep the scope small.' },
    { title: 'Build', text: 'Implement the core idea as simply as possible.' },
    { title: 'Refine', text: 'Fix rough edges and improve what matters most.' },
    { title: 'Ship and document', text: 'Release it and write down how it works.' },
  ],
};

const make = (p: Omit<Project, 'cover' | 'gallery' | 'workflow'> & { workflow?: WorkflowStep[] }): Project => ({
  ...p,
  ...images(p.slug, p.title),
  workflow: p.workflow ?? workflows[p.category],
});

export const projects: Project[] = [
  
  make({
    slug: 'tanyapc', title: 'TanyaPC - PC Building Consultation Platform', category: 'Full-stack Development', year: 2025, featured: true,
    summary: 'A web-based PC building consultation platform that connects users with expert consultants to plan PC builds based on their needs, component compatibility, and budget.',
    description: [
      'TanyaPC is a web-based platform designed to simplify the PC building consultation process. It connects users with PC consultants through online and offline consultation services, helping users choose the right components based on their requirements and budget.',
      'The platform features user authentication, consultation scheduling, Zoom integration, admin and consultant dashboards, transaction management, payment verification, and consultation history. It also streamlines communication between users and consultants through an integrated consultation workflow.',
    ],
    role: 'Full-stack Developer', tools: ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'HTML', 'CSS', 'Bootstrap', 'Zoom API'],
  }),
  
  // make({
  //   slug: 'backend-project', title: '[Backend Project Name]', category: 'Backend Engineering', year: 2026, featured: true,
  //   summary: '[One sentence: what the service does and who consumes it.]',
  //   description: [
  //     '[What the service or API does and the problem behind it.]',
  //     '[A design decision, performance result, or tradeoff worth mentioning.]',
  //   ],
  //   role: '[e.g. API design and implementation]', tools: ['[Language]', '[Framework]', '[Database]'],
  // }),
  
  // make({
  //   slug: 'data-analytics-project', title: '[Data Analytics Project Name]', category: 'Data Science & Analytics', year: 2026, featured: true,
  //   summary: '[One sentence: the question you answered with data.]',
  //   description: [
  //     '[The dataset, the question, and why it mattered.]',
  //     '[The main finding or insight, and how you reached it.]',
  //   ],
  //   role: '[e.g. Data cleaning, analysis, visualization]', tools: ['Python', '[pandas]', '[Jupyter]'],
  // }),
  // TODO: ganti dengan project machine learning aslimu
  // make({
  //   slug: 'ml-project', title: '[Machine Learning Project Name]', category: 'Machine Learning', year: 2026, featured: true,
  //   summary: '[One sentence: what the model predicts and how well it does.]',
  //   description: [
  //     '[The prediction task and the data you used.]',
  //     '[The models you compared and the key result, with the metric.]',
  //   ],
  //   role: '[e.g. Modeling and evaluation]', tools: ['Python', '[scikit-learn]'],
  // }),
  
  make({
    slug: 'tb-chest-xray-detector', title: 'Tuberculosis Detection in Thoracic X-ray Image', category: 'Computer Vision', year: 2026, featured: true,
    summary: 'Undergraduate thesis comparing YOLOv8m and RT-DETR for detecting tuberculosis in chest X-rays.',
    description: [
      'My undergraduate thesis in Informatics Engineering. I trained and compared two object detection models, YOLOv8m and RT-DETR, on chest X-ray images to see which one detects tuberculosis findings more reliably.',
      'The work covers dataset preparation, training, and evaluation using mAP, precision, recall, and F1-score.',
    ],
    role: 'Research, model training, evaluation', tools: ['YOLOv8m', 'RT-DETR', 'Python'],
  }),
  // TODO: ganti dengan project lain yang tidak masuk kategori di atas
  // make({
  //   slug: 'other-project', title: '[Other Project Name]', category: 'Other Projects', year: 2025, featured: true,
  //   summary: '[One sentence: what it is.]',
  //   description: [
  //     '[What it is and why you made it.]',
  //     '[Something you learned or a result worth sharing.]',
  //   ],
  //   role: '[Your role]', tools: ['[Tool 1]', '[Tool 2]'],
  // }),
].sort((a, b) => b.year - a.year);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}