import {createSlice} from "@reduxjs/toolkit";

const cartInitialState = {
    totalItems: 0,
    totalPrice: 0,
    items: [],
    changed: false
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: cartInitialState,
    reducers: {
        replaceCart(state, action){
          state.items = action.payload.items || [];
          state.totalItems = action.payload.totalItems;
          state.totalPrice = action.payload.totalPrice;
        },
        addItem(state, action) {
            const newItem = action.payload;
            const item = state.items.find(p => p.id === newItem.id);
            if (item)
            {
                item.quantity++;
                item.totalPrice += item.price;
            }
            else
            {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            state.totalPrice += newItem.price;
            state.totalItems++;
            state.changed = true;
        },
        removeItem(state, action) {
            const item = state.items.find(p => p.id === action.payload);
            const quantity = item.quantity;
            if (quantity === 1)
            {
                state.items = state.items.filter(p => p.id !== action.payload);
            }
            else {
                item.quantity -= 1;
                item.totalPrice -= item.price;
            }
            state.totalPrice -= item.price;
            state.totalItems--;
            state.changed = true;
        }
    }
});



export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

