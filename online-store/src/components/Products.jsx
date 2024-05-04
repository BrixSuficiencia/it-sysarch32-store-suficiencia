import React, { useContext, useMemo } from 'react';
import { ProductsContext } from '../Global/ProductsContext';
import { CartContext } from '../Global/CartContext';

export const Products = () => {
    const { products } = useContext(ProductsContext);
    const { dispatch } = useContext(CartContext);

    // Memoize the products array
    const memoizedProducts = useMemo(() => products, [products]);

    return (
        <>
            {memoizedProducts.length !== 0 && <h1>Products</h1>}
            <div className='products-container'>
                {memoizedProducts.length === 0 && <div>Slow internet...no products to display</div>}
                {memoizedProducts.map(product => (
                    <div className='product-card' key={product.id}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="Product" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            ₱ {product.ProductPrice}.00
                        </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.id, product })}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    );
};
