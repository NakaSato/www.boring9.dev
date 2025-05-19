// This is a temporary fix to enable building with correct param types
import { ReactNode } from 'react';

declare global {
  interface PageProps {
    params: Promise<any>;
    searchParams?: Promise<any>;
    children?: ReactNode;
  }
}
