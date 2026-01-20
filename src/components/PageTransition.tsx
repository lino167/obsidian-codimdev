import { ReactNode } from 'react';
import TransitionOverlay from './TransitionOverlay';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      <TransitionOverlay />
      {children}
    </>
  );
};

export default PageTransition;
