import { configureStore } from '@reduxjs/toolkit';

import { api } from '/src/services/api';

import taskReducer from '/src/slices/task.slice';

export const store = configureStore({
    reducer: {
        task: taskReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
