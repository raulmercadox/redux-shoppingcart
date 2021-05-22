import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const sendCartData = cart => {
    return async dispatch => {
        dispatch(uiActions.setNotification({
            status: 'pending',
            title: 'Sending Cart...',
            message: 'The cart is sending to the repository.'
        }));

        const updateCart = async cart => {
            const response = await fetch('https://meals-971f8-default-rtdb.firebaseio.com/cart.json', {
                method: "PUT",
                body: JSON.stringify({
                    totalItems: cart.totalItems,
                    totalPrice: cart.totalPrice,
                    items: cart.items,
                })
            });

            if (!response.ok)
            {
                throw new Error("There was a problem sending the data");
            }
        }

        try {
            await updateCart(cart);
            dispatch(uiActions.setNotification({
                status: 'success',
                title: 'Cart sent successfully',
                message: 'The cart was sent successfully.'
            }))
        }
        catch (error) {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error sending Cart',
                message: 'There was an error when sending the cart.'
            }))
        }
    }
}

export const fetchCartData = () => {
    return async dispatch => {
        const fetchCart = async () => {
            const response = await fetch('https://meals-971f8-default-rtdb.firebaseio.com/cart.json')
            if (!response.ok)
            {
                throw new Error('It was an error fetching the cart data.')
            }
            const data = await response.json();
            return data;
        }
        try {
            const cart = await fetchCart();
            dispatch(cartActions.replaceCart(cart));
        }
        catch(error)
        {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error sending Cart',
                message: 'There was an error when sending the cart.'
            }))
        }
    }
}