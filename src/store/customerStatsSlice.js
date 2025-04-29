import { createSlice } from "@reduxjs/toolkit";

const customerStatsSlice = createSlice({
    name: "customerStats",
    initialState: {
        count: 0
    },
    reducers: {
        setCustomerCount(state, action) {
            state.count = action.payload;
        },
        incrementCustomerCount(state) {
            state.count = state.count + 1;
        },
        decrementCustomerCount(state) {
            state.count = state.count - 1;
        }
    }
});

export const { setCustomerCount, incrementCustomerCount, decrementCustomerCount } = customerStatsSlice.actions;
export default customerStatsSlice.reducer;


/*
1. Redux Store & Slice
customerStatsSlice.js: Manages the customer count in Redux state, with actions to set, increment, and decrement the count.
store.js: Configures your Redux store to use the customerStats slice.
2. Async Action
customerAction.js: Contains an async action (fetchCustomerCount) that fetches the count from your backend (/api/customer/count) and updates the Redux store.
3. App Integration
main.jsx: Wraps your app with the Redux <Provider>, making the store available everywhere.
4. OfficerDashboard.jsx
Uses useSelector to read the customer count from Redux.
Dispatches fetchCustomerCount() on mount to always show the latest count.
Updates the displayed customer count in real-time when Redux state changes.
5. CustomerList.jsx
After adding a customer, dispatches fetchCustomerCount() so the dashboard updates instantly, even if both components are open at the same time  */
