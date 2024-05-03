import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';

export const CartReducer = (state, action) => {
    const { shoppingCart, totalPrice, totalQty } = state;

    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingProduct = shoppingCart.find(product => product.ProductID === action.id);
            if (existingProduct) {
                toast.info('This product is already in your cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                return state;
            } else {
                const newProduct = { ...action.product, qty: 1, TotalProductPrice: action.product.ProductPrice };
                return {
                    shoppingCart: [newProduct, ...shoppingCart],
                    totalPrice: totalPrice + newProduct.ProductPrice,
                    totalQty: totalQty + 1
                };
            }
        }

        case 'INC': {
            const updatedCartInc = shoppingCart.map(product =>
                product.ProductID === action.id
                    ? { ...product, qty: product.qty + 1, TotalProductPrice: product.ProductPrice * (product.qty + 1) }
                    : product
            );
            return {
                shoppingCart: updatedCartInc,
                totalPrice: totalPrice + action.cart.ProductPrice,
                totalQty: totalQty + 1
            };
        }

        case 'DEC': {
            const updatedCartDec = shoppingCart.map(product =>
                product.ProductID === action.id && product.qty > 1
                    ? { ...product, qty: product.qty - 1, TotalProductPrice: product.ProductPrice * (product.qty - 1) }
                    : product
            );
            return {
                shoppingCart: updatedCartDec.filter(product => product.qty > 0),
                totalPrice: totalPrice - action.cart.ProductPrice,
                totalQty: totalQty > 0 ? totalQty - 1 : 0
            };
        }

        case 'DELETE': {
            const updatedCartDelete = shoppingCart.filter(product => product.ProductID !== action.id);
            const deletedProduct = shoppingCart.find(product => product.ProductID === action.id);
            return {
                shoppingCart: updatedCartDelete,
                totalPrice: totalPrice - (deletedProduct.qty * deletedProduct.ProductPrice),
                totalQty: totalQty - deletedProduct.qty
            };
        }

        case 'EMPTY':
            return { shoppingCart: [], totalPrice: 0, totalQty: 0 };

        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return state;
    }
};
