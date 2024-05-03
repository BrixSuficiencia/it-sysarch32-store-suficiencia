import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { CartReducer } from './CartReducer';

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const [cart, dispatch] = useReducer(CartReducer, { shoppingCart: [], totalPrice: 0, totalQty: 0 });

    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    );
}

// Prop types validation for the props object
CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired // Validate children prop to be a node and required
};
