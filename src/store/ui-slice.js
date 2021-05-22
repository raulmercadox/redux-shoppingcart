import {createSlice} from "@reduxjs/toolkit";

const uiInitialState = {
    showCart: false,
    notification: {}
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers: {
        toggle(state) {
            state.showCart = !state.showCart
        },
        setNotification(state, action) {
            state.notification.status = action.payload.status;
            state.notification.title = action.payload.title;
            state.notification.message = action.payload.message;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
