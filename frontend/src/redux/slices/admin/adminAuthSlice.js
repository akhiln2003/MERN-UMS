import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

const setCredentials = (state, action) => {
  state.adminInfo = action.payload;
  localStorage.setItem("adminInfo", JSON.stringify(action.payload));
};

const logout = (state) => {
  state.adminInfo = null;
  localStorage.removeItem("adminInfo");
};

const adminAuthSlice = createSlice({
  name: "adminauth",
  initialState: initialState,
  reducers: {
    setCredentials,
    logout,
  },
});


export const { setCredentials: setAdminCredentials, logout: logoutAuthAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;