import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {
    const cart = useSelector(state => state.cart);

    useEffect(() =>{
        const updateCart = async () => {
            await fetch('https://meals-971f8-default-rtdb.firebaseio.com/cart.json', {
                method: "PUT",
                body: JSON.stringify(cart)
            });
        }
        updateCart();
    }, [cart]);

    const showCart = useSelector(state => state.ui.showCart);

    return (
        <Layout>
            {showCart && <Cart/>}
            <Products/>
        </Layout>
    );
}

export default App;
