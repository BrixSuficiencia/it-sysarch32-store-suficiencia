import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../Global/CartContext';
import { Navbar } from './Navbar';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/Config.js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PF3CpP4xQq2qLvr3xByt0bJIGauoa5Sj5k6n1BeRWPLIJKawLfHbs32RBMaf0xzGzg406GJpGvZYP2ASYY83uq300J6PzJliB');

export const Cart = ({ user }) => {
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    const history = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/login');
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = async () => {
        const stripe = await stripePromise;
    
        const totalPrice = shoppingCart.reduce((total, cartItem) => total + cartItem.TotalProductPrice, 0); // Calculate total price
    
        const response = await fetch('http://localhost:4000/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ totalPrice }), // Send total price to the backend
        });
    
        if (response.ok) {
            const session = await response.json();
    
            const result = await stripe.redirectToCheckout({ sessionId: session.id });
    
            if (result.error) {
                setError(result.error.message);
            }
        } else {
            setError('Error creating checkout session');
        }
    };    

    return (
        <>
            <Navbar user={user} />
            <>
                {shoppingCart.length !== 0 && <h1>Cart</h1>}
                <div className='cart-container'>
                    {shoppingCart.length === 0 && <>
                        <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                        <div><Link to="/">Return to Home page</Link></div>
                    </>}
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>
                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>
                            <div className='cart-name'>{cart.ProductName}</div>
                            <div className='cart-price-orignal'>₱ {cart.ProductPrice}.00</div>
                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>
                            <div className='quantity'>{cart.qty}</div>
                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>
                            <div className='cart-price'>
                                ₱ {cart.TotalProductPrice}.00
                            </div>
                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))}
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty</span>
                            <span>{totalQty}</span>
                        </div>
                        <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px'}} onClick={handleClick}>Checkout</button>
                    </div>}
                </div>
                {error && <div>{error}</div>}
            </>
        </>
    );
};

Cart.propTypes = {
    user: PropTypes.object
};
