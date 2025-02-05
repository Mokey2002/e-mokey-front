import { configureStore } from '@reduxjs/toolkit';

import buyerAuthReducer from './buyerAuthSlice';
import sellerAuthReducer from './sellerAuthSlice';

const store = configureStore({
  reducer: {
    buyerAuth: buyerAuthReducer,
    sellerAuth: sellerAuthReducer,
  },
});

export default store;
