'use client';

import { Suspense } from 'react';
import StaticHeader from './StaticHeader';
import EnhancedHeader from './EnhancedHeader';

const HeaderWrapper = () => {
  return (
    <Suspense fallback={<StaticHeader />}>
      <EnhancedHeader />
    </Suspense>
  );
};

export default HeaderWrapper;
