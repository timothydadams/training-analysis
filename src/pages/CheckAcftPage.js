import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';
import { ApiCheck } from '../components/ApiCheck';
import axios from 'axios';


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
                setShowErrorMessage(false);
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
                ltk:parseInt(ltk),
                sdc:`0:${sdc}`,
                plk:`0:${plk}`,
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
            <div className="max-w-md w-full m-auto bg-indigo-100 rounded-md p-5">   
                <ApiCheck />

            <p className="text-center text-xl font-bold mb-2">Check Your ACFT Score</p>
            {response && <div >{JSON.stringify(response.data)}</div>}

            <label className="block mb-2 text-black" htmlFor="email">3-Rep Max Deadlift (MDL)</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                 type="text"
                 name="mdl"
                value={mdl} 
                placeholder="340"
                onChange={e => setMdl(e.target.value)} />


            <label className="block mb-2 text-black" htmlFor="password">Standing Power Throw (SPT)</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="text"
                name="spt"
                value={spt}
                placeholder="10.2"
                onChange={e => setSpt(e.target.value)} />

            <label className="block mb-2 text-black" htmlFor="password">Hand Release Push-ups (HRP)</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="text"
                name="hrp"
                value={hrp}
                placeholder="44"
                onChange={e => setHrp(e.target.value)} />

            <label className="block mb-2 text-black" htmlFor="password">Sprint-Drag-Carry (SDC)</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="text"
                name="sdc"
                value={sdc}
                placeholder="3:00"
                onChange={e => setSdc(e.target.value)} />

            <label className="block mb-2 text-black" htmlFor="password">Leg Tuck (LTK)</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="text"
                name="ltk"
                value={ltk}
                placeholder="15"
                onChange={e => setLtk(e.target.value)} />


            <label className="block mb-2 text-black" htmlFor="password">Plank (PLK)</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="text"
                name="plk"
                value={plk}
                placeholder="3:15"
                onChange={e => setPlk(e.target.value)} />   


            <label className="block mb-2 text-black" htmlFor="password">Two-Mile Run (2MR)</label>
            <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                type="text"
                name="run"
                value={run}
                placeholder="14:50"
                onChange={e => setRun(e.target.value)} />





            <button 
                disabled={
                    !mdl || !spt || !hrp || !sdc || !run ||
                    ((!ltk && plk) || (ltk && !plk))
                }
                onClick={onCheckScore}
                className="w-full bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded"
                >
                    Check Score
                    </button>



                    <button 
                onClick={resetValues}
                className="w-full bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 mb-6 rounded"
                >
                    Reset Values
                    </button>
            
            <button 
                onClick={onLogOut}
                className="w-full bg-indigo-300 hover:bg-indigo-500 text-white font-bold py-2 px-4 mb-6 rounded"
                >
                    Log Out
                    </button>



        </div>
        </div>
    )

}