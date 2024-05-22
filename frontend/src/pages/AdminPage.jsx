import React, { useEffect, useState } from 'react';
import { Sidenav } from '../admin/Sidenav';
import { Error404 } from './Error404';

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
        <Error404 />
      ) : (
        // <Container>
        //   <Typography align='center'>
        //     Lo sentimos, el panel de Adminitracion no está disponible en
        //     dispositivos móviles.
        //   </Typography>
        // </Container>
        <>
          <Sidenav />
        </>
      )}
    </>
  );
};
