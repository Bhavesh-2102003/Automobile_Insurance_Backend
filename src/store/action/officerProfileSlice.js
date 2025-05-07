// src/store/officerProfileSlice.js
// store/action/officerProfileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const officerProfileSlice = createSlice({
  name: "officerProfile",
  initialState: {
    officer: null,
  },
  reducers: {
    setOfficerProfile(state, action) {
      state.officer = action.payload.officer;
    },
  },
});

export const { setOfficerProfile } = officerProfileSlice.actions;

export default officerProfileSlice.reducer;

/**
 * createSlice function has 3 params:
 * 1. name : "officerProfile"
 * 2. initialState : { officerProfile: {} }
 * 3. reducers: { setOfficerProfile }
 */
