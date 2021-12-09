import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';


const GoodApiContainer = () => (
    <div className="bg-gradient-to-r from-green-300 to-green-500 p-2 uppercase text-center rounded mb-4 font-bold text-white">
        API: <FontAwesomeIcon icon={faCheckCircle} />
    </div>
);

const BadApiContainer = () => (
    <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-2 uppercase text-center rounded mb-4 font-bold">
       API: <FontAwesomeIcon icon={faSkullCrossbones} />
    </div>
);

export const ApiCheck = () => {
    const [apiTest, setApiTest] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          '/api/test',
        );
  
        setApiTest(result.data);
      };
  
      fetchData();
    }, []);

    return apiTest === '' ? <BadApiContainer /> : <GoodApiContainer />
}