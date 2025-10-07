import { createSlice } from '@reduxjs/toolkit';

const buyerAuthSlice = createSlice({
  name: 'buyerAuth',
  initialState: {
    loggedIn: false,
    buyer: null,
    token: '',
    refresh:'',
    
  },
  reducers: {
    buyerLogin: (state, action) => {
      state.loggedIn = true;
      state.buyer = action.payload.buyer;
      state.token = action.payload.token;
      state.refresh=action.payload.refresh;
     
    },
    buyerLogout: (state) => {
      state.loggedIn = false;
      state.buyer = null;
      state.token = '';
      state.refresh='';

    },
  },
});

export const { buyerLogin, buyerLogout } = buyerAuthSlice.actions;
export default buyerAuthSlice.reducer;
