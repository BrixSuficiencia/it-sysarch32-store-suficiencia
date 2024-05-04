import React, { createContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { db } from '../config/Config.js';

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
    state = {
        products: []
    };

    componentDidMount() {
        db.collection('Products').onSnapshot(snapshot => {
            const products = [];
            snapshot.forEach(doc => {
                products.push({
                    ProductID: doc.id,
                    ProductName: doc.data().ProductName,
                    ProductPrice: doc.data().ProductPrice,
                    ProductImg: doc.data().ProductImg
                });
            });
            this.setState({ products });
        });
    }

    render() {
        return (
            <ProductsContext.Provider value={{ products: this.state.products }}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}

// Prop types validation for children prop
ProductsContextProvider.propTypes = {
    children: PropTypes.node.isRequired // Validate children prop to be a React node
};
