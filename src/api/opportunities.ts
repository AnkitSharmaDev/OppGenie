import axios from 'axios';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: string;
  deadline: string;
  eligibility: string;
  link: string;
  description: string;
  category: string;
  source: string;
  location?: string; // Making location optional
}

interface GitHubRepo {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
}

interface GitHubResponse {
  items: GitHubRepo[];
}

// Fetch opportunities from multiple sources
export async function fetchOpportunities(category?: string, location?: string): Promise<Opportunity[]> {
  try {
    const opportunities: Opportunity[] = [];
    
    // Fetch from GitHub
    const githubOpps = await fetchGitHubOpportunities();
    opportunities.push(...githubOpps);
    
    // Fetch custom curated opportunities
    const customOpps = await fetchCustomOpportunities();
    opportunities.push(...customOpps);
    
    let filteredOpps = opportunities;
    
    // Filter by category if provided
    if (category) {
      filteredOpps = filteredOpps.filter(opp => 
        opp.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by location if provided
    if (location) {
      const searchLocation = location.toLowerCase();
      filteredOpps = filteredOpps.filter(opp => {
        if (!opp.location) return true; // Include if location is not specified
        const oppLocation = opp.location.toLowerCase();
        return oppLocation.includes(searchLocation) || oppLocation === 'remote';
      });
    }
    
    return filteredOpps;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    throw error;
  }
}

// Main GitHub opportunities fetching function
export async function fetchGitHubOpportunities(searchQuery?: string): Promise<Opportunity[]> {
  try {
    const query = searchQuery ? 
      `${searchQuery} in:name,description,readme good-first-issues:>0` :
      'good-first-issues:>0 help-wanted-issues:>0';

    const response = await axios.get<GitHubResponse>('https://api.github.com/search/repositories', {
      params: {
        q: query,
        sort: 'updated',
        order: 'desc',
        per_page: 10
      }
    });

    return response.data.items.map((repo): Opportunity => ({
      id: `gh-${repo.id}`,
      title: repo.name,
      organization: repo.owner.login,
      type: 'Open Source',
      deadline: 'Ongoing',
      eligibility: 'Open to all contributors',
      link: repo.html_url,
      description: repo.description || 'No description available',
      category: 'Technology',
      source: 'GitHub',
      location: 'Remote'
    }));
  } catch (error) {
    console.error('Error fetching GitHub opportunities:', error);
    return [];
  }
}

async function fetchCustomOpportunities(): Promise<Opportunity[]> {
  // Add custom curated opportunities
  return [
    {
      id: 'custom-1',
      title: 'UN Young Leaders Programme',
      organization: 'United Nations',
      type: 'Leadership Program',
      deadline: '2024-12-31',
      eligibility: 'Students and young professionals aged 18-29',
      link: 'https://www.un.org/youthenvoy/young-leaders-for-sdgs/',
      description: 'The Young Leaders Initiative recognizes young people who are leading efforts to combat world\'s most pressing issues.',
      category: 'Social',
      source: 'Custom',
      location: 'Global'
    },
    {
      id: 'custom-2',
      title: 'Global Health Corps Fellowship',
      organization: 'Global Health Corps',
      type: 'Fellowship',
      deadline: '2024-01-15',
      eligibility: 'Early-career professionals under 30',
      link: 'https://ghcorps.org/fellows/',
      description: 'One-year paid fellowship for young professionals passionate about global health equity.',
      category: 'Healthcare',
      source: 'Custom',
      location: 'Multiple Locations'
    }
  ];
}

// Function to get trending opportunities
export async function getTrendingOpportunities(): Promise<Opportunity[]> {
  const allOpportunities = await fetchOpportunities();
  // Sort by some trending criteria (could be based on views, applications, etc.)
  return allOpportunities.sort(() => Math.random() - 0.5).slice(0, 10);
}

// Function to get opportunities by search term
export async function searchOpportunities(query: string): Promise<Opportunity[]> {
  const allOpportunities = await fetchOpportunities();
  const searchTerm = query.toLowerCase();
  return allOpportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchTerm) ||
    opp.description.toLowerCase().includes(searchTerm) ||
    opp.organization.toLowerCase().includes(searchTerm)
  );
}

// Function to get all opportunities with optional filtering
export async function fetchAllOpportunities(searchQuery?: string): Promise<Opportunity[]> {
  try {
    const githubOpps = await fetchGitHubOpportunities(searchQuery);
    const customOpps = await fetchCustomOpportunities();
    
    return [...githubOpps, ...customOpps];
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}

async function fetchLinkedInOpportunities(): Promise<Opportunity[]> {
  // Implementation for LinkedIn opportunities
  // Note: This would require LinkedIn API access
  return [];
}

export const fetchIndeedJobs = async (location: string = '') => {
  // This would be your backend API endpoint that fetches from Indeed
  const response = await axios.get('/api/indeed-jobs', {
    params: { location }
  }).catch(() => ({ data: { items: [] } }));

  return response.data.items.map((job: any) => ({
    id: `in-${job.id}`,
    title: job.title,
    organization: job.company,
    type: 'Job',
    location: job.location,
    posted: job.posted_at,
    deadline: job.deadline,
    description: job.description,
    url: job.url,
    tags: job.skills || [],
    logo: job.company_logo
  }));
};

export const fetchInternships = async (location: string = '') => {
  // This would be your backend API endpoint that fetches internships
  const response = await axios.get('/api/internships', {
    params: { location }
  }).catch(() => ({ data: { items: [] } }));

  return response.data.items.map((internship: any) => ({
    id: `int-${internship.id}`,
    title: internship.title,
    organization: internship.company,
    type: 'Internship',
    location: internship.location,
    posted: internship.posted_at,
    deadline: internship.deadline,
    description: internship.description,
    url: internship.url,
    tags: internship.skills || [],
    logo: internship.company_logo
  }));
};

export const fetchVolunteerOpportunities = async (location: string = '') => {
  // This would be your backend API endpoint that fetches volunteer opportunities
  const response = await axios.get('/api/volunteer', {
    params: { location }
  }).catch(() => ({ data: { items: [] } }));

  return response.data.items.map((opp: any) => ({
    id: `vol-${opp.id}`,
    title: opp.title,
    organization: opp.organization,
    type: 'Volunteer',
    location: opp.location,
    posted: opp.posted_at,
    deadline: opp.deadline,
    description: opp.description,
    url: opp.url,
    tags: opp.categories || [],
    logo: opp.organization_logo
  }));
};

// Mock data for other opportunity types since we don't have real APIs yet
const generateMockOpportunities = (type: string, count: number, location: string = ''): Opportunity[] => {
  const opportunities: Opportunity[] = [];
  const skills = ['JavaScript', 'Python', 'React', 'Node.js', 'Data Science', 'UI/UX', 'Product Management'];
  const companies = ['Tech Corp', 'Innovation Labs', 'Digital Solutions', 'Future Systems', 'Green Tech'];
  
  for (let i = 0; i < count; i++) {
    const randomSkills = skills.sort(() => 0.5 - Math.random()).slice(0, 3);
    const company = companies[Math.floor(Math.random() * companies.length)];
    
    opportunities.push({
      id: `${type.toLowerCase()}-${i}`,
      title: `${type} Opportunity ${i + 1}`,
      organization: company,
      type,
      location: location || 'Remote',
      posted: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      deadline: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      description: `Exciting ${type.toLowerCase()} opportunity to work on cutting-edge projects.`,
      url: '#',
      tags: randomSkills,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=random`
    });
  }
  
  return opportunities;
};

export const fetchAllOpportunities = async (searchQuery: string = '', location: string = '') => {
  try {
    const githubOpps = await fetchGitHubOpportunities(searchQuery);
    
    // Generate mock data for other types
    const mockJobs = generateMockOpportunities('Job', 3, location);
    const mockInternships = generateMockOpportunities('Internship', 3, location);
    const mockVolunteer = generateMockOpportunities('Volunteer', 3, location);

    const allOpportunities = [
      ...githubOpps,
      ...mockJobs,
      ...mockInternships,
      ...mockVolunteer
    ];

    // Filter by location if provided
    return location ? 
      allOpportunities.filter(opp => 
        opp.location.toLowerCase().includes(location.toLowerCase()) ||
        opp.location === 'Remote'
      ) : 
      allOpportunities;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}; 