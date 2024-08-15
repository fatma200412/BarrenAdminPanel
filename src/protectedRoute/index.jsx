import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminAuth } from '../context/adminAuth';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isLoginAdmin, userRole } = useContext(AdminAuth);

  if (!isLoginAdmin || !allowedRoles.includes(userRole)) {
    return <Navigate to="/admin" />;
  }

  return element;
};

export default ProtectedRoute;
