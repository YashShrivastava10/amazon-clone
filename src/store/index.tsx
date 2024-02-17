import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import persistConfig from "../../persist";
import rootReducer from "./rootReducer";

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
}) 

export const persistor = persistStore(store)