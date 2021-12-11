import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';
import { ApiCheck } from '../components/ApiCheck';
import axios from 'axios';
import { InputWithLabel, BigButton, SmallTextButton } from '../components/FormComponents';
import { Title, LoginContainer, Message } from '../components/LoginComponents';

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
            const response = await axios.post(`/api/score`, {
                mdl:parseInt(mdl),
                spt:parseFloat(spt),
                hrp:parseInt(hrp),
                ...(ltk && {ltk:parseInt(ltk)}),
                sdc:`0:${sdc}`,
                ...(plk && {plk:`0:${plk}`}),
                run:`0:${run}`,
            }, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setResponse(response);

            //const { token: newToken } = response.data;
            //setToken(newToken);
            setShowSuccessMessage(true);
        } catch (error) {
            setResponse(error);
            setShowErrorMessage(true);
        }
    }

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
        <div className="flex flex-col h-screen">
            <div className="max-w-2xl w-full m-auto bg-indigo-100 rounded-md p-5">   
                <ApiCheck />

            <Title>Check Your ACFT Score</Title>
            {response && <Message success>{JSON.stringify(response.data)}</Message>}

            <InputWithLabel label="3-Rep Max Deadlift (MDL)"
                type="text"
                name="mdl"
                value={mdl} 
                placeholder="340"
                onChange={e => setMdl(e.target.value)} />

            <InputWithLabel label="Standing Power Throw (SPT)"
                type="text"
                name="spt"
                value={spt}
                placeholder="10.2"
                onChange={e => setSpt(e.target.value)} />

            <InputWithLabel label="Hand Release Push-ups (HRP)"
                type="text"
                name="hrp"
                value={hrp}
                placeholder="44"
                onChange={e => setHrp(e.target.value)} />

            <InputWithLabel label="Sprint-Drag-Carry (SDC)"
                type="text"
                name="sdc"
                value={sdc}
                placeholder="3:00"
                onChange={e => setSdc(e.target.value)} />

            <InputWithLabel label="Leg Tuck (LTK)"
                type="text"
                name="ltk"
                value={ltk}
                placeholder="15"
                onChange={e => setLtk(e.target.value)} />

            <InputWithLabel label="Plank (PLK)"
                type="text"
                name="plk"
                value={plk}
                placeholder="3:15"
                onChange={e => setPlk(e.target.value)} />   

            <InputWithLabel label="Two-Mile Run (2MR)"
                type="text"
                name="run"
                value={run}
                placeholder="14:50"
                onChange={e => setRun(e.target.value)} />


            <BigButton onClick={onCheckScore}
                disabled={
                    !mdl || !spt || !hrp || 
                    (!run || (run && !run.includes(':'))) || 
                    (!sdc || (sdc && !sdc.includes(':'))) ||
                    !((!plk && ltk) || (!ltk && plk && plk.includes(':')))
                } 
            >
                Check Score
            </BigButton>



            <SmallTextButton left onClick={resetValues}>
                Reset Values
            </SmallTextButton>
            
            <SmallTextButton right onClick={onLogOut}>
                Log Out
            </SmallTextButton>



        </div>
        </div>
    )

}