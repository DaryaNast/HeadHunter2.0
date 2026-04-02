import { configureStore } from '@reduxjs/toolkit';
import { vacancyApi } from '../api/api';

export const store = configureStore({
    reducer: {
        [vacancyApi.reducerPath]: vacancyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(vacancyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

