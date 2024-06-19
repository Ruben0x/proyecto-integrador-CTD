import React, { useEffect, useState } from 'react';
import { Sidenav } from '../admin/Sidenav';
import { ErrorAdmin } from './ErrorAdmin';

export const AdminPage = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 600px)').matches
  );
  // const isMobile = window.matchMedia('(max-width: 600px)').matches;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 600px)').matches);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <ErrorAdmin />
      ) : (
        <>
          <Sidenav />
        </>
      )}
    </>
  );
};
