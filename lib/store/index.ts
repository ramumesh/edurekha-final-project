import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./slices/cart";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import checkoutCartSlice, {
  CheckoutState,
} from "./slices/cart";

const persistConfig = {
  key: "persist",
  storage,
};

const rootReducer = combineReducers({
  cart: CartReducer,
  checkoutCart: checkoutCartSlice,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  });

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       cart: CartReducer,
//       checkoutCart: checkoutCartSlice,
//     },
//   });
// };

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
