import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {cartActions} from "../../store/cart";

const CartButton = (props) => {
    const dispatch = useDispatch();
    const totalItems = useSelector(state => state.cart.totalItems);

    const toggleHandler = () => {
        dispatch(cartActions.toggle());
    }

    return (
        <button className={classes.button} onClick={toggleHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalItems}</span>
        </button>
    );
};

export default CartButton;
