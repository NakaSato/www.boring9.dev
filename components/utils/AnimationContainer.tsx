'use client';

import { AnimationContainerProps } from '@/types';

const AnimationContainer = ({
  children,
  customClassName
}: AnimationContainerProps) => {
  return <div className={customClassName}>{children}</div>;
};

export default AnimationContainer;
