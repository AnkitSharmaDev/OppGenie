import axios from 'axios';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: string;
  location: string;
  posted: string;
  deadline: string;
  description: string;
  url: string;
  tags: string[];
  logo?: string;
}

export const fetchGitHubOpportunities = async (searchQuery: string = '') => {
  try {
    const query = searchQuery ? 
      `${searchQuery} in:name,description,readme good-first-issues:>0` :
      'good-first-issues:>0 help-wanted-issues:>0';

    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: query,
        sort: 'updated',
        order: 'desc',
        per_page: 10
      }
    });

    return response.data.items.map((repo: any) => ({
      id: `gh-${repo.id}`,
      title: repo.name,
      organization: repo.owner.login,
      type: 'Open Source',
      location: 'Remote',
      posted: new Date(repo.created_at).toLocaleDateString(),
      deadline: 'Ongoing',
      description: repo.description || 'No description available',
      url: repo.html_url,
      tags: [repo.language, ...repo.topics || []].filter(Boolean),
      logo: repo.owner.avatar_url
    }));
  } catch (error) {
    console.error('Error fetching GitHub opportunities:', error);
    return [];
  }
};

export const fetchLinkedInJobs = async (location: string = '') => {
  // This would be your backend API endpoint that fetches from LinkedIn
  const response = await axios.get('/api/linkedin-jobs', {
    params: { location }
  }).catch(() => ({ data: { items: [] } }));

  return response.data.items.map((job: any) => ({
    id: `li-${job.id}`,
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