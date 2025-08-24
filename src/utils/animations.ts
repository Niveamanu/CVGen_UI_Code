export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" as const },
};

export const slideTransitions = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export const fadeTransitions = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: "easeInOut" as const },
};

export const scaleTransitions = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3, ease: "easeOut" as const },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" as const },
};

export const slideDownCard = {
  initial: {
    opacity: 0,
    y: -100, // Reduced distance - from -120
    scale: 0.95, // Closer to final scale - from 0.9
    rotateX: -5, // Less rotation - from -10
    filter: "blur(5px)", // Less blur - from 10px
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7, // Faster - reduced from 1.2
      ease: "easeOut" as const, // Professional easing curve
      delay: 0.1, // Small delay - reduced from 0.3
    },
  },
};

export const cardStagger = {
  animate: {
    transition: {
      staggerChildren: 0.08, // Faster - reduced from 0.2
      delayChildren: 0.4, // Start sooner - reduced from 1.0
    },
  },
};

export const enhancedStaggerItem = {
  initial: {
    opacity: 0,
    y: 25, // Less distance - reduced from 30
    scale: 0.97, // Closer to final scale - increased from 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35, // Faster - reduced from 0.6
      ease: "easeOut" as const,
      type: "spring",
      stiffness: 140, // More bouncy
      damping: 10, // Less damping for faster settle
    },
  },
};

export const buttonHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const cardHover = {
  whileHover: {
    y: -5,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export const formFieldFocus = {
  whileFocus: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

export const overlayVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

export const stepTransition = {
  initial: { opacity: 0, x: 50, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};
