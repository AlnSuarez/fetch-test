import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    

    // useEffect(() => {
    //   if (!user) { 
    //     // user is not authenticated
    //     return <Navigate to="/" />;
    //   }
    // }, [])
    
    return (
        <div>
            {children}
        </div>
    )
  }
