import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';

const GoodApiContainer = () => (
  <div className='text-green-300 p-2 text-center mb-4'>
    <FontAwesomeIcon icon={faCheckCircle} size='6x' />
  </div>
);

const BadApiContainer = () => (
  <div className='text-red-400 p-2 text-center mb-4'>
    <FontAwesomeIcon icon={faSkullCrossbones} size='6x' alt='API is working' />
  </div>
);

export const ApiCheck = () => {
  const [apiTest, setApiTest] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/test');

      setApiTest(result.data);
    };

    fetchData();
  }, []);

  return apiTest === '' ? <BadApiContainer /> : <GoodApiContainer />;
};
