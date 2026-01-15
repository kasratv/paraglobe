
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export interface VisionResponse {
  summary: string;
  technologies: string[];
  strategicImpact: string;
}

export enum NavigationSection {
  HERO = 'hero',
  SERVICES = 'services',
  PHILOSOPHY = 'philosophy',
  AI_VISION = 'ai-vision',
  FOOTER = 'footer'
}