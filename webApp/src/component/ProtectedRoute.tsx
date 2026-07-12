import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // 🔍 Read the browser memory cache for the active session passport token
    const token = localStorage.getItem('token');

    // 🔒 GUARD 1: If there is no token, completely block execution
    if (!token) {
        // 'replace' wipes the /dashboard attempt out of browser history 
        // so clicking the browser's "Back" arrow won't get them trapped.
        return <Navigate to="/login" replace />;
    }

    // ✅ GATE OPEN: If the token exists, render the dashboard content safely
    return <>{children}</>;
};