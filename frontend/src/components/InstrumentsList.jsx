import React from 'react';
import { InstrumentCard } from './InstrumentCard';

export const InstrumentsList = ({ instrumentsList }) => {
  return (
    <div>
      <h1>lista de instrumentos</h1>
      {instrumentsList.map((item) => (
        <InstrumentCard key={item.id} instrument={item} />
      ))}
    </div>
  );
};
