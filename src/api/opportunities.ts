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
  location?: string;
  tags?: string[];
  logo?: string;
  trending?: boolean;
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
  stargazers_count: number;
  updated_at: string;
}

interface GitHubResponse {
  items: GitHubRepo[];
}

// Main GitHub opportunities fetching function
export async function fetchGitHubOpportunities(searchQuery?: string): Promise<Opportunity[]> {
  try {
    const query = searchQuery ? 
      `${searchQuery} in:name,description,readme good-first-issues:>0` :
      'good-first-issues:>0 help-wanted-issues:>0 stars:>100';

    const response = await axios.get<GitHubResponse>('https://api.github.com/search/repositories', {
      params: {
        q: query,
        sort: 'updated',
        order: 'desc',
        per_page: 20
      },
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    return response.data.items.map((repo): Opportunity => ({
      id: `gh-${repo.id}`,
      title: `Contribute to ${repo.name}`,
      organization: repo.owner.login,
      type: 'Open Source',
      deadline: 'Ongoing',
      eligibility: 'Open to all contributors',
      link: repo.html_url,
      description: repo.description || 'No description available',
      category: 'Technology',
      source: 'GitHub',
      location: 'Remote',
      tags: [repo.language, ...repo.topics].filter((tag): tag is string => tag !== null),
      logo: repo.owner.avatar_url,
      trending: repo.stargazers_count > 1000
    }));
  } catch (error) {
    console.error('Error fetching GitHub opportunities:', error);
    return [];
  }
}

async function fetchCustomOpportunities(): Promise<Opportunity[]> {
  // Add real, current opportunities
  return [
    // Technology Category
    {
      id: 'gsoc-2024',
      title: 'Google Summer of Code 2024',
      organization: 'Google',
      type: 'Internship',
      deadline: '2024-04-02',
      eligibility: 'University students 18 years or older',
      link: 'https://summerofcode.withgoogle.com/',
      description: 'Google Summer of Code 2024 is now open! Join this global program focused on bringing more student developers into open source software development. Stipend ranges from $1500-$3300.',
      category: 'Technology',
      source: 'Custom',
      location: 'Remote',
      tags: ['Open Source', 'Programming', 'Student Program'],
      logo: 'https://summerofcode.withgoogle.com/static/favicon.ico',
      trending: true
    },
    {
      id: 'mlh-fellowship-2024',
      title: 'MLH Fellowship Summer 2024',
      organization: 'Major League Hacking',
      type: 'Fellowship',
      deadline: '2024-03-31',
      eligibility: 'Students and recent graduates',
      link: 'https://fellowship.mlh.io/',
      description: 'Applications are now open for MLH Fellowship Summer 2024 batch. Get paid to contribute to real open source projects and build your portfolio. $5000 stipend for 12 weeks.',
      category: 'Technology',
      source: 'Custom',
      location: 'Remote',
      tags: ['Software Engineering', 'Open Source', 'Internship'],
      logo: 'https://fellowship.mlh.io/favicon.ico',
      trending: true
    },
    {
      id: 'microsoft-internship-2024',
      title: 'Microsoft Summer Internship 2024',
      organization: 'Microsoft',
      type: 'Internship',
      deadline: '2024-03-15',
      eligibility: 'Current students in Computer Science or related fields',
      link: 'https://careers.microsoft.com/students/',
      description: 'Join Microsoft as a summer intern! Work on real projects that matter and shape the future of technology. Competitive compensation and housing assistance provided.',
      category: 'Technology',
      source: 'Custom',
      location: 'Various Locations',
      tags: ['Software Development', 'Cloud Computing', 'AI'],
      logo: 'https://careers.microsoft.com/favicon.ico',
      trending: true
    },
    {
      id: 'amazon-sde-intern-2024',
      title: 'Amazon SDE Internship Summer 2024',
      organization: 'Amazon',
      type: 'Internship',
      deadline: '2024-03-30',
      eligibility: 'Currently enrolled students in Computer Science',
      link: 'https://www.amazon.jobs/student-programs',
      description: 'Build the future of technology at Amazon! Summer 2024 internships now open for talented developers. Competitive pay and relocation assistance included.',
      category: 'Technology',
      source: 'Custom',
      location: 'Multiple Locations',
      tags: ['Software Engineering', 'AWS', 'E-commerce'],
      logo: 'https://www.amazon.jobs/favicon.ico',
      trending: true
    },

    // Education Category
    {
      id: 'teach-for-america-2024',
      title: 'Teach For America Corps 2024',
      organization: 'Teach For America',
      type: 'Fellowship',
      deadline: '2024-03-15',
      eligibility: "Bachelor's degree holders",
      link: 'https://www.teachforamerica.org/how-to-join',
      description: "Make a difference in education! Join TFA\u2019s 2024 corps and work towards educational equity. Full salary, benefits, and training provided.",
      category: 'Education',
      source: 'Custom',
      location: 'United States',
      tags: ['Teaching', 'Education', 'Social Impact'],
      logo: 'https://www.teachforamerica.org/favicon.ico',
      trending: true
    },
    {
      id: 'fulbright-2024',
      title: 'Fulbright Teaching Excellence Program 2024',
      organization: 'Fulbright',
      type: 'Fellowship',
      deadline: '2024-04-15',
      eligibility: 'US citizens with teaching experience',
      link: 'https://fulbrightteacher.org/',
      description: 'Teach abroad with Fulbright! Exchange ideas and promote international understanding through education. Fully funded opportunity.',
      category: 'Education',
      source: 'Custom',
      location: 'International',
      tags: ['International Education', 'Cultural Exchange', 'Teaching'],
      logo: 'https://fulbrightteacher.org/favicon.ico',
      trending: true
    },

    // Healthcare Category
    {
      id: 'who-internship-2024',
      title: 'WHO Summer Internship 2024',
      organization: 'World Health Organization',
      type: 'Internship',
      deadline: '2024-03-31',
      eligibility: 'Graduate students in health-related fields',
      link: 'https://www.who.int/careers/internships',
      description: 'WHO is now accepting applications for Summer 2024 internships. Gain hands-on experience in global health initiatives. Positions available in various WHO offices worldwide.',
      category: 'Healthcare',
      source: 'Custom',
      location: 'Various Locations',
      tags: ['Healthcare', 'Public Health', 'International'],
      logo: 'https://www.who.int/favicon.ico',
      trending: true
    },
    {
      id: 'nih-summer-2024',
      title: 'NIH Summer Research Program 2024',
      organization: 'National Institutes of Health',
      type: 'Research',
      deadline: '2024-03-01',
      eligibility: 'Students in biomedical/health fields',
      link: 'https://www.training.nih.gov/programs/sip',
      description: 'Conduct biomedical research at NIH! Summer 2024 program offering hands-on research experience with leading scientists. Stipend provided.',
      category: 'Healthcare',
      source: 'Custom',
      location: 'Bethesda, MD',
      tags: ['Research', 'Biomedical', 'Healthcare'],
      logo: 'https://www.nih.gov/favicon.ico',
      trending: true
    },

    // Social Impact Category
    {
      id: 'un-volunteers-2024',
      title: 'UN Online Volunteering 2024',
      organization: 'United Nations',
      type: 'Volunteer',
      deadline: 'Rolling Applications',
      eligibility: 'Anyone 18+',
      link: 'https://www.onlinevolunteering.org/en',
      description: 'Make a difference from anywhere in the world! Join UN Online Volunteering to support sustainable development and humanitarian projects worldwide.',
      category: 'Social',
      source: 'Custom',
      location: 'Remote',
      tags: ['Social Impact', 'Volunteering', 'Global Development'],
      logo: 'https://www.un.org/favicon.ico',
      trending: true
    },
    {
      id: 'amnesty-2024',
      title: 'Amnesty International Youth Program 2024',
      organization: 'Amnesty International',
      type: 'Program',
      deadline: '2024-03-30',
      eligibility: 'Youth activists 18-25',
      link: 'https://www.amnesty.org/en/youth/',
      description: 'Join the global movement for human rights! Youth program focusing on advocacy, campaigns, and human rights education.',
      category: 'Social',
      source: 'Custom',
      location: 'Global',
      tags: ['Human Rights', 'Advocacy', 'Youth'],
      logo: 'https://www.amnesty.org/favicon.ico',
      trending: true
    },

    // Environment Category
    {
      id: 'greenpeace-2024',
      title: 'Climate Action Fellowship 2024',
      organization: 'Greenpeace',
      type: 'Fellowship',
      deadline: '2024-03-01',
      eligibility: 'Environmental activists and researchers',
      link: 'https://www.greenpeace.org/international/act/',
      description: 'New fellowship program for climate action leaders! Work on crucial environmental campaigns with a focus on climate change mitigation and adaptation strategies.',
      category: 'Environment',
      source: 'Custom',
      location: 'Various Locations',
      tags: ['Environment', 'Climate Action', 'Activism'],
      logo: 'https://www.greenpeace.org/favicon.ico',
      trending: true
    },
    {
      id: 'wwf-2024',
      title: 'WWF Conservation Fellowship 2024',
      organization: 'World Wildlife Fund',
      type: 'Fellowship',
      deadline: '2024-04-15',
      eligibility: 'Conservation and environmental professionals',
      link: 'https://www.worldwildlife.org/about/careers',
      description: 'Work on critical conservation projects worldwide! Fellowship opportunity for passionate environmentalists. Focus on biodiversity and ecosystem preservation.',
      category: 'Environment',
      source: 'Custom',
      location: 'Multiple Locations',
      tags: ['Conservation', 'Wildlife', 'Research'],
      logo: 'https://www.worldwildlife.org/favicon.ico',
      trending: true
    },

    // Global Category
    {
      id: 'un-youth-2024',
      title: 'UN Youth Delegate Programme 2024',
      organization: 'United Nations',
      type: 'Program',
      deadline: '2024-03-15',
      eligibility: 'Youth aged 18-24',
      link: 'https://www.un.org/youthenvoy/',
      description: '2024 applications now open! Represent youth voices at the United Nations. Full funding provided for selected delegates to participate in UN processes.',
      category: 'Global',
      source: 'Custom',
      location: 'Global',
      tags: ['Youth Leadership', 'International Relations', 'Policy'],
      logo: 'https://www.un.org/favicon.ico',
      trending: true
    },
    {
      id: 'aiesec-2024',
      title: 'AIESEC Global Talent Program 2024',
      organization: 'AIESEC',
      type: 'Internship',
      deadline: '2024-03-31',
      eligibility: 'Students and recent graduates',
      link: 'https://aiesec.org/global-talent',
      description: 'Develop your leadership potential through international internships! Professional development opportunities available worldwide.',
      category: 'Global',
      source: 'Custom',
      location: 'Worldwide',
      tags: ['Leadership', 'International', 'Professional Development'],
      logo: 'https://aiesec.org/favicon.ico',
      trending: true
    }
  ];
}

// Function to get all opportunities with optional filtering
export async function fetchAllOpportunities(searchQuery: string = '', location: string = ''): Promise<Opportunity[]> {
  try {
    const [githubOpps, customOpps] = await Promise.all([
      fetchGitHubOpportunities(searchQuery),
      fetchCustomOpportunities()
    ]);
    
    const allOpportunities = [...githubOpps, ...customOpps];
    
    // Filter by location if provided
    if (location) {
      const searchLocation = location.toLowerCase();
      return allOpportunities.filter(opp => {
        if (!opp.location) return true;
        const oppLocation = opp.location.toLowerCase();
        return oppLocation.includes(searchLocation) || oppLocation === 'remote';
      });
    }
    
    return allOpportunities;
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return [];
  }
}

// Function to get trending opportunities
export async function getTrendingOpportunities(): Promise<Opportunity[]> {
  try {
    const allOpportunities = await fetchAllOpportunities();
    // Filter trending opportunities based on criteria:
    // 1. Explicitly marked as trending
    // 2. GitHub repos with high star count
    // 3. Recently updated opportunities
    return allOpportunities
      .filter(opp => opp.trending || 
        (opp.source === 'GitHub' && opp.tags?.includes('trending')))
      .slice(0, 20); // Return top 9 trending opportunities
  } catch (error) {
    console.error('Error fetching trending opportunities:', error);
    return [];
  }
}

// Function to get opportunities by search term
export async function searchOpportunities(query: string): Promise<Opportunity[]> {
  const allOpportunities = await fetchAllOpportunities(query);
  const searchTerm = query.toLowerCase();
  return allOpportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchTerm) ||
    opp.description.toLowerCase().includes(searchTerm) ||
    opp.organization.toLowerCase().includes(searchTerm) ||
    opp.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
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