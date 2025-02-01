import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const PublicRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  return !token ? children : <Navigate to="/" />;
};