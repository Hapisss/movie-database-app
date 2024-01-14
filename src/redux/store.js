import { configureStore } from '@reduxjs/toolkit';
import connectionReducer from './slices/connectionSlice';
import movieReducer from './slices/movieSlice';
import statusReducer from './slices/statusSlice';
import requestSlice from './slices/requestSlice';
import modalSlice from './slices/modalSlice';

const store = configureStore({
    reducer: {
        connection: connectionReducer,
        movies: movieReducer,
        status: statusReducer,
        request: requestSlice,
        modal: modalSlice,
    },
});

export default store;