import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../auth/useToken';
import { useUser } from '../../auth/useUser';
import { ApiCheck } from '../../utils/ApiCheck';
import axios from 'axios';
import {
  InputWithLabel,
  InputWithLabelDark,
  BigButton,
  SmallTextButton,
  SmallTextButtonDark,
} from '../../utils/FormComponents';
import { Title, LoginContainer, Message } from '../../utils/LoginComponents';
import DataTable, { createTheme } from 'react-data-table-component';

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
  'customDark',
  {
    background: {
      default: 'rgb(55,65,81)',
    },
  },
  'dark'
);

const columns = [
  {
    name: 'MDL',
    selector: (row) => row.mdl.score,
  },
  {
    name: 'HRP',
    selector: (row) => row.hrp.score,
  },
  {
    name: '2MR',
    selector: (row) => row.run.score,
  },
  {
    name: 'LTK',
    selector: (row) => (row.ltk ? row.ltk.score : ''),
  },
  {
    name: 'PLK',
    selector: (row) => (row.plk ? row.plk.score : ''),
  },
  {
    name: 'SDC',
    selector: (row) => row.sdc.score,
  },
  {
    name: 'SPT',
    selector: (row) => row.spt.score,
  },
];

export const AcftPage = () => {
  const user = useUser();
  const [token, setToken] = useToken();

  const navigate = useNavigate();

  // input controls
  const [mdl, setMdl] = useState('');
  const [spt, setSpt] = useState('');
  const [hrp, setHrp] = useState('');
  const [ltk, setLtk] = useState('');
  const [sdc, setSdc] = useState('');
  const [plk, setPlk] = useState('');
  const [run, setRun] = useState('');

  //form success and error msgs
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [response, setResponse] = useState(null);

  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
        setResponse(null);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const onCheckScore = async () => {
    try {
      const response = await axios.post(
        `/api/score`,
        {
          mdl: parseInt(mdl),
          spt: parseFloat(spt),
          hrp: parseInt(hrp),
          ...(ltk && { ltk: parseInt(ltk) }),
          sdc: `0:${sdc}`,
          ...(plk && { plk: `0:${plk}` }),
          run: `0:${run}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('response from api', response);

      setScoreData((arr) => [...arr, response.data]);

      //const { token: newToken } = response.data;
      //setToken(newToken);
      setShowSuccessMessage(true);
    } catch (error) {
      setResponse(error);
      setShowErrorMessage(true);
    }
  };

  const onLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const resetValues = () => {
    setMdl('');
    setSpt('');
    setHrp('');
    setLtk('');
    setSdc('');
    setPlk('');
    setRun('');
  };

  return (
    <div tw='grid grid-flow-row grid-cols-3 gap-4 p-4'>
      <div tw='col-span-2'>
        <DataTable
          theme='dark'
          columns={columns}
          data={scoreData}
          theme='customDark'
        />
      </div>

      <div className='max-w-xs float-right bg-gray-700 rounded p-2 text-white'>
        <ApiCheck />

        <Title>Check Your ACFT Score</Title>
        {response && <Message success>{JSON.stringify(response.data)}</Message>}

        <InputWithLabelDark
          label='3-Rep Max Deadlift (MDL)'
          type='text'
          name='mdl'
          value={mdl}
          placeholder='340'
          onChange={(e) => setMdl(e.target.value)}
        />

        <InputWithLabelDark
          label='Standing Power Throw (SPT)'
          type='text'
          name='spt'
          value={spt}
          placeholder='10.2'
          onChange={(e) => setSpt(e.target.value)}
        />

        <InputWithLabelDark
          label='Hand Release Push-ups (HRP)'
          type='number'
          name='hrp'
          value={hrp}
          placeholder='44'
          onChange={(e) => setHrp(e.target.value)}
        />

        <InputWithLabelDark
          label='Sprint-Drag-Carry (SDC)'
          type='text'
          name='sdc'
          value={sdc}
          placeholder='3:00'
          onChange={(e) => setSdc(e.target.value)}
        />

        <InputWithLabelDark
          label='Leg Tuck (LTK)'
          type='text'
          name='ltk'
          value={ltk}
          placeholder='15'
          onChange={(e) => setLtk(e.target.value)}
        />

        <InputWithLabelDark
          label='Plank (PLK)'
          type='text'
          name='plk'
          value={plk}
          placeholder='3:15'
          onChange={(e) => setPlk(e.target.value)}
        />

        <InputWithLabelDark
          label='Two-Mile Run (2MR)'
          type='text'
          name='run'
          value={run}
          placeholder='14:50'
          onChange={(e) => setRun(e.target.value)}
        />

        <BigButton
          onClick={onCheckScore}
          disabled={
            !mdl ||
            !spt ||
            !hrp ||
            !run ||
            (run && !run.includes(':')) ||
            !sdc ||
            (sdc &&
              !(
                sdc.split(':').length == 2 &&
                sdc.split(':')[0].length == 1 &&
                sdc.split(':')[1].length == 2
              )) ||
            !(
              (!plk && ltk) ||
              (!ltk &&
                plk &&
                plk.split(':').length == 2 &&
                plk.split(':')[0].length == 1 &&
                plk.split(':')[1].length == 2)
            )
          }
        >
          Check Score
        </BigButton>

        <SmallTextButtonDark left onClick={resetValues}>
          Reset Values
        </SmallTextButtonDark>
      </div>
    </div>
  );
};
