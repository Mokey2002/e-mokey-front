import { createSlice } from '@reduxjs/toolkit';

const sellerAuthSlice = createSlice({
  name: 'sellerAuth',
  initialState: {
    loggedIn: false,
    seller: null,
    token: '',
  },
  reducers: {
    sellerLogin: (state, action) => {
      state.loggedIn = true;
      state.seller = action.payload.seller;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    sellerLogout: (state) => {
      state.loggedIn = false;
      state.buyer = null;
      state.token = '';
      localStorage.removeItem('user');
    },
  },
});

export const { sellerLogin, sellerLogout } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
