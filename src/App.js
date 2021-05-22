import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import Notification from "./components/UI/Notification";
import React from "react";
import {sendCartData, fetchCartData} from "./store/cart-actions";

let initial = true;

function App() {
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    useEffect(() =>{
        if (initial)
        {
            initial = false;
            return;
        }
        if (cart.changed)
        {
            dispatch(sendCartData(cart));
        }
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
