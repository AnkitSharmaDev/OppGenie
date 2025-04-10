import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const opportunities = [
  {
    name: 'Climate Action',
    count: 156,
    category: 'Environment',
    trend: 'up',
    description: 'Join environmental conservation projects and sustainability initiatives. Work on reforestation, clean energy, and waste reduction programs.',
    location: 'Global',
    organization: 'EarthWatch Institute',
    deadline: '2024-05-30',
    requirements: ['Passion for environment', 'Basic understanding of climate science', 'Willingness to work outdoors'],
    link: 'https://earthwatch.org/opportunities',
  },
  {
    name: 'Tech4Good',
    count: 134,
    category: 'Technology',
    trend: 'up',
    description: 'Develop technology solutions for social impact. Build apps and platforms that help nonprofits and social enterprises.',
    location: 'Remote',
    organization: 'Code for Good',
    deadline: '2024-05-15',
    requirements: ['Programming skills', 'Problem-solving ability', 'Team collaboration'],
    link: 'https://codeforgood.net',
  },
  {
    name: 'Youth Education',
    count: 98,
    category: 'Education',
    trend: 'stable',
    description: 'Mentor and teach young students in STEM subjects, arts, and life skills. Make a difference in their educational journey.',
    location: 'Multiple Cities',
    organization: 'Education First',
    deadline: '2024-06-01',
    requirements: ['Teaching experience', 'Patient and empathetic', 'Background check required'],
    link: 'https://educationfirst.org',
  },
  {
    name: 'Healthcare Outreach',
    count: 87,
    category: 'Health',
    trend: 'up',
    description: 'Support healthcare initiatives in underserved communities. Assist in medical camps, health education, and wellness programs.',
    location: 'Various Locations',
    organization: 'Global Health Corps',
    deadline: '2024-05-20',
    requirements: ['Healthcare background', 'First aid certification', 'Multilingual preferred'],
    link: 'https://ghcorps.org',
  },
  {
    name: 'Food Security Initiative',
    count: 76,
    category: 'Community',
    trend: 'up',
    description: 'Combat hunger through food distribution programs. Organize food drives and help manage community gardens.',
    location: 'Local Communities',
    organization: 'FoodShare',
    deadline: '2024-05-25',
    requirements: ['Food safety knowledge', 'Organizational skills', "Valid driver's license"],
    link: 'https://foodshare.org',
  },
  {
    name: 'Mental Health Support',
    count: 72,
    category: 'Health',
    trend: 'up',
    description: 'Provide support for mental health initiatives. Work on awareness campaigns and support group programs.',
    location: 'Nationwide',
    organization: 'Mind Alliance',
    deadline: '2024-06-15',
    requirements: ['Psychology background', 'Counseling experience', 'Empathy and patience'],
    link: 'https://mindalliance.org',
  },
];

export async function seedOpportunities() {
  try {
    for (const opportunity of opportunities) {
      await addDoc(collection(db, 'opportunities'), {
        ...opportunity,
        createdAt: new Date().toISOString(),
      });
    }
    console.log('Successfully seeded opportunities!');
  } catch (error) {
    console.error('Error seeding opportunities:', error);
  }
} 