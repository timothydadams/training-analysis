import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';
import axios from 'axios';
//import 'twin.macro';

export const UserInfoPage = () => {
    const user = useUser();
    const [token, setToken] = useToken();

    const { id, email, info, isVerified } = user;

    const navigate = useNavigate();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || '');
    const [hairColor, setHairColor] = useState(info.hairColor || '');
    const [bio, setBio] = useState(info.bio || '');

    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        // Send a request to the server to
        // update the user's info with any changes we've
        // made to the text input values
        try {
            const response = await axios.put(`/api/users/${id}`, {
                favoriteFood,
                hairColor,
                bio,
            }, {
                headers: { Authorization: `Bearer ${token}`}
            });

            const { token: newToken } = response.data;
            setToken(newToken);
            setShowSuccessMessage(true);
        } catch (error) {
            setShowErrorMessage(true);
        }
    }

    const logOut = () => {
        //remove the JWT
        localStorage.removeItem('token');
        navigate('/login');
    }
    
    const resetValues = () => {
        // Reset the text input values to
        // their starting values (the data we loaded from the server)
        setFavoriteFood(info.favoriteFood);
        setHairColor(info.hairColor);
        setBio(info.bio);
    }
    
    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div className="flex flex-col h-screen">
            <div className="max-w-xs w-full m-auto bg-indigo-100 rounded-md p-5">
                <h1 className="text-center text-xl font-bold mb-2">
                    Update User Information
                </h1>
                {!isVerified && <div className="mb-4 w-full bg-red-400 p-2">You won't be able to change any data until you verify your email.</div>}
                {showSuccessMessage && <div className="mb-4 w-full bg-green-400 p-2">Successfully saved user data!</div>}
                {showErrorMessage && <div className="mb-4 w-full bg-red-400 p-2">Uh oh... something went wrong and we couldn't save changes</div>}


                <label className="block mb-2 text-black" htmlFor="favoriteFood">Favorite Food</label>
                <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                    type="text"
                    name="favoriteFood"
                    value={favoriteFood} 
                    placeholder="steak"
                    onChange={e => setFavoriteFood(e.target.value)} />


                <label className="block mb-2 text-black" htmlFor="hairColor">Hair Color</label>
                <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                    type="text"
                    name="hairColor"
                    value={hairColor} 
                    placeholder="brown"
                    onChange={e => setHairColor(e.target.value)} />


                <label className="block mb-2 text-black" htmlFor="bio">Bio</label>
                <input className="w-full p-2 mb-6 text-black border-b-2 border-black outline-none bg-indigo-100"
                    type="text"
                    name="bio"
                    value={bio} 
                    placeholder="keep it short and sweet"
                    onChange={e => setBio(e.target.value)} />

                <hr />

                <div>   
                    <button  
                        disabled={isVerified}
                        onClick={saveChanges} 
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mb-6 rounded" 
                    >
                    Save Changes
                    </button>       
                </div> 
                <div>   
                    <button
                        className="text-indigo-800 hover:text-black text-sm float-left duration-300" 
                        onClick={resetValues}
                    >
                        Reset Values
                    </button>   
                </div> 

                <div>   
                    <button
                        className="text-indigo-800 hover:text-black text-sm float-right duration-300" 
                        onClick={logOut}
                    >
                        Log Out
                    </button>   
                </div> 
                

            </div> 
        </div>


    );
}