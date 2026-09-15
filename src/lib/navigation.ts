export type PageType =
  | 'about'
  | 'projects'
  | 'contact'
  | 'gallery'
  | 'blog'
  | 'video-gallery'
  | 'education'
  | 'post'
  | 'publications'
  | 'search'
  | 'analytics'
  | 'github';

export interface PageDescriptor {
  page: PageType;
  label: string;
  description: string;
  keywords: string[];
}

export const pageDescriptors: PageDescriptor[] = [
  {
    page: 'about',
    label: 'About',
    description: 'Academic profile, research background, and professional journey.',
    keywords: ['home', 'profile', 'research', 'journey'],
  },
  {
    page: 'post',
    label: 'Post Feed',
    description: 'Interactive posts, comments, likes, and image sharing.',
    keywords: ['posts', 'feed', 'community', 'comments', 'likes'],
  },
  {
    page: 'projects',
    label: 'Projects',
    description: 'Research, collaboration, and software project portfolio.',
    keywords: ['portfolio', 'github', 'demo', 'research'],
  },
  {
    page: 'publications',
    label: 'Publications',
    description: 'Selected papers, conference outputs, and academic writing.',
    keywords: ['papers', 'journal', 'conference', 'citations'],
  },
  {
    page: 'education',
    label: 'Education',
    description: 'Academic qualifications and international study history.',
    keywords: ['bsc', 'msc', 'phd', 'study'],
  },
  {
    page: 'gallery',
    label: 'Gallery',
    description: 'Visual highlights from projects, teaching, and events.',
    keywords: ['images', 'photos', 'events', 'teaching'],
  },
  {
    page: 'video-gallery',
    label: 'Video Gallery',
    description: 'Recorded lectures, demos, and YouTube-based content.',
    keywords: ['videos', 'youtube', 'lectures', 'tutorials'],
  },
  {
    page: 'blog',
    label: 'Blog',
    description: 'Thoughts and articles on software engineering and web development.',
    keywords: ['articles', 'insights', 'typescript', 'react'],
  },
  {
    page: 'contact',
    label: 'Contact',
    description: 'Contact details, message form, and collaboration links.',
    keywords: ['email', 'phone', 'linkedin', 'location'],
  },
  {
    page: 'search',
    label: 'Search',
    description: 'Global search across portfolio sections and capabilities.',
    keywords: ['find', 'lookup', 'discover', 'quick access'],
  },
  {
    page: 'analytics',
    label: 'Analytics',
    description: 'Local usage analytics including page visits and search activity.',
    keywords: ['insights', 'events', 'stats', 'usage'],
  },
  {
    page: 'github',
    label: 'GitHub',
    description: 'Live GitHub profile and repository integration.',
    keywords: ['repositories', 'stars', 'followers', 'profile'],
  },
];

export const primaryNavItems: PageType[] = [
  'about',
  'post',
  'projects',
  'publications',
  'search',
  'github',
  'analytics',
  'contact',
  'gallery',
  'video-gallery',
  'education',
];