import { motion } from 'framer-motion';
import React from 'react';

export interface TimelineEventProps {
  active?: boolean;
  children: React.ReactNode;
  last?: boolean;
}

export interface ExternalLinkProps {
  href: string;
  customClassName?: string;
  children: React.ReactNode;
  title?: string;
}

export interface NavItemHeaderAnimation {
  name: string;
  x: number;
  y: number;
  w: string;
}

export interface NavItemProps {
  href: string;
  text: string;
}

export interface AnimationContainerProps
  extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  customClassName?: string;
  customDelay?: number;
}

export interface CardProjectProps {
  id?: string;
  title: string;
  des: string;
  // category: string[];
  category: string; // FIX THIS
  repo: string;
  link: string;
}
