'use client';

import { motion } from 'framer-motion';

const animation = {
  hide: { opacity: 0, y: -20 },
  show: {
    y: 0,
    opacity: 1
  }
};

const CirclesColorBg = () => {
  return (
    <div className="darkBackgroundCirclesColors">
      <motion.div
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.9 }}
      ></motion.div>
    </div>
  );
};

export default CirclesColorBg;
