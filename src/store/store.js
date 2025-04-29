import { configureStore } from "@reduxjs/toolkit";
import customerStatsReducer from "./customerStatsSlice";

const store = configureStore({
    reducer: {
        customerStats: customerStatsReducer
    }
});

export default store;