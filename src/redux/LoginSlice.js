import { createSlice } from '@reduxjs/toolkit'

export const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    login: null,
  },
  reducers: {
    loggedin: (state, action) => {
      state.login = action.payload;
    },
    loggedout: (state) => {
      state.login = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loggedin, loggedout } = LoginSlice.actions
export const  selectLogin = (state) => state.login.login;
export default LoginSlice.reducer