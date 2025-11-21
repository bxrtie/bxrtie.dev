export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface NavLink {
  name: string;
  href: string;
}