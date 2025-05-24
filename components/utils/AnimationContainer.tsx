'use client';

import { motion } from 'framer-motion';
import { AnimationContainerProps } from '@/types';

const AnimationContainer = ({
  children,
  customDelay = 0.3
}: AnimationContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: customDelay,
        ease: [0.4, 0, 0.2, 1] // Chrome-optimized cubic-bezier
      }}
      style={{
        // Chrome optimization: Enable hardware acceleration
        willChange: "transform, opacity",
        transform: "translateZ(0)"
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationContainer;
