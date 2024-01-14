import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: 'movieList',
    initialState: {
        movies: [],
        watchedMovies: []
    },
    reducers: {
        setMovieList: (state, action) => {
            state.movies = action.payload;
        },
        setWatchedMovieList: (state, action) => {
            state.watchedMovies = action.payload;
        },
    },
});

export const { setMovieList, setWatchedMovieList } = movieSlice.actions;

export default movieSlice.reducer;