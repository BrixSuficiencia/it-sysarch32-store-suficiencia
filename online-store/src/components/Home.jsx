import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from './Navbar';
import { Products } from "./Products";
import { useNavigate } from 'react-router-dom'; // Import Link
import { auth } from '../config/Config.js';

export const Home = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Force user to sign up
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/login');
            }
        });
    }, [navigate]);

    return (
        <div className='wrapper'>
            <Navbar userName={user ? user.Name : null} /> {/* Pass userName instead of user */}
            <Products />
        </div>
    );
};

Home.propTypes = {
    user: PropTypes.object // Define prop type for 'user'
};
