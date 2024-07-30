import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ Component, ...props }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        const loggedIn = localStorage.getItem('user');
        if (!loggedIn) {
            navigate('/login');
        } else {
            const parsedUser = JSON.parse(loggedIn);
            setUser(parsedUser);
        }
    }, [navigate]);

    // If no user data yet, render nothing or a loader
    if (user === null) {
        return null; // or return a loader/spinner
    }

    // Render component based on whether it needs props or not
    if (Component === 'MyJobs') {
        return (
            <div>
                <Component email={user.email} />
            </div>
        );
    }

    // For components that don't need props
    return (
        <div>
            <Component />
        </div>
    );
}

export default Protected;
