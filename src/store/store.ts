import {configureStore} from "@reduxjs/toolkit";
import {ipAccessApi} from "../api/ipAccessApi.ts";
import {usersApi} from "../api/usersApi.ts";
import notificationsSlice from "./notificationsSlice.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        notifications: notificationsSlice,
        [ipAccessApi.reducerPath]: ipAccessApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ipAccessApi.middleware, usersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector