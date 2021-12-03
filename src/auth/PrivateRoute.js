import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './useUser';  

export const PrivateOutlet = () => {
    const user = useUser();
    return user ? <Outlet /> : <Navigate to="/login" /> ;
}