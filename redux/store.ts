import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export default store;
