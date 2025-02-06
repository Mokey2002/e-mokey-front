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
     
    },
    sellerLogout: (state) => {
      state.loggedIn = false;
      state.seller = null;
      state.token = '';
      
    },
  },
});

export const { sellerLogin, sellerLogout } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
