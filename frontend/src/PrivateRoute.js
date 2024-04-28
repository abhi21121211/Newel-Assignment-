import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element, isLoggedIn, ...props }) {
    return isLoggedIn ? (
        <Route {...props} element={element} />
    ) : (
        <Navigate to="/login" />
    );
}

export default PrivateRoute;
