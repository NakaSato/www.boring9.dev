/**
 * Project data for the portfolio
 */

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  repo: string;
  link: string;
  image?: string;
  featured: boolean;
  completedAt: string; // YYYY-MM-DD format
  techStack: string[];
}

export const projects: ProjectType[] = [
  {
    id: 'gridtokenx',
    title: 'The Future of Energy in Thailand',
    description: 'Our commitment to green energy is paving the way for a cleaner, healthier planet. Join us on a journey towards a future where clean, renewable energy sources transform the way we power our lives.',
    category: 'web',
    tags: ['typescript', 'react', 'nextjs'],
    repo: '',
    link: 'https://www.gridtokenx.com',
    image: '/images/projects/gridtokenx.png',
    featured: true,
    completedAt: '2025-01-15',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description: 'A personal portfolio website built with Next.js and Tailwind CSS showcasing my projects, skills, and experience.',
    category: 'web',
    tags: ['typescript', 'react', 'nextjs'],
    repo: 'https://github.com/enwuft/portfolio',
    link: 'https://boring9.dev',
    image: '/images/projects/portfolio.png',
    featured: true,
    completedAt: '2024-12-20',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'blog-platform',
    title: 'Modern Blog Platform',
    description: 'A full-featured blog platform with markdown support, SEO optimization, and affiliate link management.',
    category: 'web',
    tags: ['typescript', 'react', 'nextjs'],
    repo: 'https://github.com/enwuft/blog-platform',
    link: 'https://www.boring9.dev/blog',
    image: '/images/projects/blog-platform.png',
    featured: true,
    completedAt: '2025-03-10',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB']
  },
  {
    id: 'ecommerce-api',
    title: 'E-Commerce API',
    description: 'A RESTful API built with Node.js and Express for e-commerce applications with features like product management, cart functionality, and payment integration.',
    category: 'backend',
    tags: ['nodejs', 'express', 'mongodb'],
    repo: 'https://github.com/enwuft/ecommerce-api',
    link: '',
    image: '/images/projects/ecommerce-api.png',
    featured: false,
    completedAt: '2024-11-05',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT']
  },
  {
    id: 'weather-app',
    title: 'Weather Dashboard',
    description: 'A weather dashboard application that displays current weather and forecasts for multiple locations using the OpenWeatherMap API.',
    category: 'web',
    tags: ['javascript', 'html', 'css', 'api'],
    repo: 'https://github.com/enwuft/weather-app',
    link: 'https://weather.boring9.dev',
    image: '/images/projects/weather-app.png',
    featured: false,
    completedAt: '2024-09-15',
    techStack: ['HTML', 'CSS', 'JavaScript', 'OpenWeatherMap API']
  },
  {
    id: 'task-manager',
    title: 'Task Manager CLI',
    description: 'A command-line task manager application built with Python that helps you organize your tasks and stay productive.',
    category: 'cli',
    tags: ['python', 'cli'],
    repo: 'https://github.com/enwuft/task-manager-cli',
    link: '',
    image: '/images/projects/task-manager.png',
    featured: false,
    completedAt: '2024-08-20',
    techStack: ['Python']
  }
];

export const getProjectById = (id: string): ProjectType | undefined => {
  return projects.find(project => project.id === id);
};

export const getFeaturedProjects = (): ProjectType[] => {
  return projects.filter(project => project.featured);
};

export const getProjectCategories = (): string[] => {
  const categories = new Set<string>();
  projects.forEach(project => categories.add(project.category));
  return Array.from(categories);
};

export const getProjectsByCategory = (category: string): ProjectType[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getProjectsByTag = (tag: string): ProjectType[] => {
  return projects.filter(project => project.tags.includes(tag));
};

export const searchProjects = (query: string): ProjectType[] => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.category.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    project.techStack.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
};

export const getProjectTags = (): string[] => {
  const tags = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};
