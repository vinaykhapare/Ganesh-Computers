import { Variants, Transition } from 'framer-motion';

// Premium spring transitions inspired by Linear and Apple
export const transitions: Record<string, Transition> = {
  springGentle: {
    type: 'spring',
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  },
  springSnappy: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  },
  springBouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 18,
  },
  smoothFade: {
    duration: 0.45,
    ease: [0.16, 1, 0.3, 1],
  },
  smoothSlow: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  },
};

// Fade up staggered reveal
export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const itemFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const itemFadeScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const heroHeadlineVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const floatMotion = {
  y: [-4, 4, -4],
  transition: {
    duration: 4.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const pulseGlow = {
  opacity: [0.4, 0.8, 0.4],
  scale: [1, 1.05, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
