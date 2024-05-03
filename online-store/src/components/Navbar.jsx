import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../config/Config.js';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Global/CartContext';

export const Navbar = ({ userName }) => { // Change prop name to userName

    const history = useNavigate();
    const { totalQty } = useContext(CartContext);

    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        });
    };

    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt="" />
            </div>
            {!userName && <div className='rightside'> {/* Update condition */}
                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>}
            {userName && <div className='rightside'> {/* Update condition */}
                <span><Link to="/" className='navlink'>{userName}</Link></span> {/* Update prop */}
                <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                <span className='no-of-products'>{totalQty}</span>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
    );
};

Navbar.propTypes = {
    userName: PropTypes.string, // Validate userName prop
};