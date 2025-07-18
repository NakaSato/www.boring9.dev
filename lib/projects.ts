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
    id: 'solar-projects-spa',
    title: 'Solar Projects Management SPA',
    description:
      'Enterprise-grade React SPA for solar project management with real-time updates, TypeScript architecture, and comprehensive dashboard. Features JWT authentication, role-based access control, project lifecycle tracking, daily reporting, Gantt charts, and advanced analytics with modern UI/UX design.',
    category: 'web',
    tags: ['react', 'typescript', 'vite', 'solar', 'spa'],
    repo: 'https://github.com/NakaSato/react-vite-spa-internal-app',
    link: 'https://icms.gridtokenx.com',
    featured: true,
    completedAt: '2024-09-25',
    techStack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Bun',
      'SignalR Client',
      'React Router'
    ]
  },
  {
    id: 'solar-projects-api',
    title: 'Solar Projects Management API',
    description:
      'Comprehensive .NET 9.0 REST API for solar project management with real-time SignalR notifications, JWT authentication, role-based access control, and mobile Flutter integration. Features complete project lifecycle management, daily reporting, task tracking, and live dashboard updates.',
    category: 'backend',
    tags: ['csharp', 'dotnet', 'signalr', 'api', 'solar'],
    repo: 'https://github.com/NakaSato/construction-dotnet-rest-api',
    link: 'https://api-icms.gridtokenx.com/index.html',
    featured: true,
    completedAt: '2024-10-20',
    techStack: [
      '.NET 9.0',
      'C#',
      'SignalR',
      'Entity Framework',
      'PostgreSQL',
      'JWT Authentication',
      'Azure'
    ]
  },
  {
    id: 'gridtokenx-blockchain',
    title: 'GridTokenX Blockchain - Energy Trading Platform',
    description:
      'Revolutionary blockchain-based platform for peer-to-peer energy trading in Thailand. Features Oracle Gateway Bridge, real-time grid integration, automated token generation, smart contracts for energy trading, and comprehensive governance system with 1:1 kWh-Token ratio.',
    category: 'blockchain',
    tags: ['rust', 'blockchain', 'substrate', 'energy', 'defi'],
    repo: 'https://github.com/NakaSato/poc-grid-network',
    link: 'https://www.gridtokenx.com',
    featured: true,
    completedAt: '2024-11-15',
    techStack: [
      'Rust',
      'Substrate',
      'Blockchain',
      'WebAssembly',
      'PostgreSQL',
      'Oracle Integration',
      'Smart Contracts'
    ]
  },
  {
    id: 'netool',
    title: 'Network Tools - CIDR Calculator',
    description:
      'Interactive web-based CIDR/netmask/IP address visualizer with real-time subnet analysis, binary representations, and network engineering toolkit. Features advanced network calculations, visual subnet breakdown, and technical notations.',
    category: 'web',
    tags: ['typescript', 'react', 'nextjs', 'networking'],
    repo: 'https://github.com/NakaSato/netool',
    link: 'https://netool.boring9.dev',
    featured: true,
    completedAt: '2024-12-01',
    techStack: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Network Engineering'
    ]
  }
];

export const getProjectById = (id: string): ProjectType | undefined => {
  return projects.find((project) => project.id === id);
};

export const getFeaturedProjects = (): ProjectType[] => {
  return projects.filter((project) => project.featured);
};

export const getProjectCategories = (): string[] => {
  const categories = new Set<string>();
  projects.forEach((project) => categories.add(project.category));
  return Array.from(categories);
};

export const getProjectsByCategory = (category: string): ProjectType[] => {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
};

export const getProjectsByTag = (tag: string): ProjectType[] => {
  return projects.filter((project) => project.tags.includes(tag));
};

export const searchProjects = (query: string): ProjectType[] => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.category.toLowerCase().includes(lowercaseQuery) ||
      project.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(lowercaseQuery)
      )
  );
};

export const getProjectTags = (): string[] => {
  const tags = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
};
