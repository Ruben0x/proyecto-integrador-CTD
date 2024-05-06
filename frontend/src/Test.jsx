import React, { useEffect } from 'react';

export const Test = () => {
  useEffect(() => {
    fetch('http://localhost:3000/hola')
      .then((res) => res.status)
      .then((data) => console.log(data));
  }, []);

  return <div>Test</div>;
};
