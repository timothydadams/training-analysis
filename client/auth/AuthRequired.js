import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './useUser';  

export const AuthRequired = ({children}) => {
    const user = useUser();
    const location = useLocation();

    return user ? {...children} : <Navigate to="/login" state={{path:location.pathname}}/> ;
}