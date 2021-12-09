import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export const VerifyEmail = () => {
    const navigate = useNavigate();

    useEffect(() =>{
        setTimeout(()=>{
            navigate('/user');
        }, 3000);
    }, [navigate]);

    return (
        <div className="flex flex-col h-screen">
            <div className="max-w-xs w-full m-auto bg-indigo-100 rounded-md p-5">
                <h1 className="text-center text-xl font-bold mb-2">
                    Action Needed!
                </h1>
                <p>Please verify your email</p>
            </div> 
        </div>
    )
}