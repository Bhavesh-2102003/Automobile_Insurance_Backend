// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import officerProfileReducer from "./action/officerProfileSlice";

const store = configureStore({
  reducer: {
    officerProfile: officerProfileReducer,
  },
});

export default store;
