import React from 'react';
import { Navigate } from 'react-router-dom';


// create component here
const PrivateRoute = ({ children }) => {
  // Declare Variable for check status
    const isSignin = false;

    return isSignin ? children : <Navigate to="/" />;
};

export default PrivateRoute;
