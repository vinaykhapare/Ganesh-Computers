import { Transition, Variants } from 'framer-motion';

// Minimal, purposeful retail micro-transitions (no blurs, no float loops, no heavy spring jumps)
export const transitionFast: Transition = {
  duration: 0.15,
  ease: [0.2, 0, 0, 1],
};

export const transitionMedium: Transition = {
  duration: 0.25,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};
