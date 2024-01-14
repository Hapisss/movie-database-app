import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
    name: 'status',
    initialState: {
        loading: true,
        error: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
});

export const { setLoading, setError } = statusSlice.actions;

export default statusSlice.reducer;