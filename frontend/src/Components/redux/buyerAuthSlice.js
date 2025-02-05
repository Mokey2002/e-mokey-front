import { createSlice } from '@reduxjs/toolkit';

const buyerAuthSlice = createSlice({
  name: 'buyerAuth',
  initialState: {
    loggedIn: false,
    buyer: null,
    token: '',
  },
  reducers: {
    buyerLogin: (state, action) => {
      state.loggedIn = true;
      state.buyer = action.payload.buyer;
      state.token = action.payload.token;
      localStorage.setItem('buyerUser', JSON.stringify(action.payload));
    },
    buyerLogout: (state) => {
      state.loggedIn = false;
      state.buyer = null;
      state.token = '';
      localStorage.removeItem('buyerUser');
    },
  },
});

export const { buyerLogin, buyerLogout } = buyerAuthSlice.actions;
export default buyerAuthSlice.reducer;
