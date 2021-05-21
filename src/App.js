import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {uiActions} from "./store/ui";
import Notification from "./components/UI/Notification";
import React from "react";

let initial = true;

function App() {
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    useEffect(() =>{

        const updateCart = async () => {
            dispatch(uiActions.setNotification({
                status: 'pending',
                title: 'Sending Cart...',
                message: 'The cart is sending to the repository.'
            }))
            const response = await fetch('https://meals-971f8-default-rtdb.firebaseio.com/cart.json', {
                method: "PUT",
                body: JSON.stringify(cart)
            });

            if (!response.ok)
            {
                throw new Error("There was a problem sending the data");
            }

            dispatch(uiActions.setNotification({
                status: 'success',
                title: 'Cart sent successfully',
                message: 'The cart was sent successfully.'
            }))
        }
        if (initial)
        {
            initial = false;
            return;
        }
        updateCart().catch(error => {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error sending Cart',
                message: 'There was an error when sending the cart.'
            }))
        });
    }, [cart, dispatch]);

    const showCart = useSelector(state => state.ui.showCart);

    return (
        <React.Fragment>
            {notification.status && <Notification status={notification.status} title={notification.title} message={notification.message} />}
            <Layout>
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </React.Fragment>
    );
}

export default App;
