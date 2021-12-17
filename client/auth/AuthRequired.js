import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from './useUser';
import { Dashboard } from '../dashboard/pages/DashboardWrapper';

export const AuthRequired = ({ children }) => {
  const user = useUser();
  const location = useLocation();

  return user ? (
    <Dashboard>{children}</Dashboard>
  ) : (
    <Navigate to='/login' state={{ path: location.pathname }} />
  );
};
