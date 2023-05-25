import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
          auth: authSlice.reducer,
    },
    devTools: true,
  });

// const store = configureStore({
//   reducer: {
//     test: testSlice.reducer,
//     result: resultSlice.reducer,
//     auth: authSlice.reducer,
//     product: productSlice.reducer,
//     cart: cartSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

export const wrapper = createWrapper(makeStore);
