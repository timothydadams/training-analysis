import React from 'react';
import { AppRoutes } from './Routes';
//import bg from './assets/peaks.svg';
//style={{ backgroundImage: `url(${bg})` }}

export const App = () => {
  return (
    <div className='h-screen bg-gradient-to-b from-electric to-ribbon'>
      <div className='bg-cover'>
        <AppRoutes />
      </div>
    </div>
  );
};
