import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'request',
    initialState: {
        requests: [],
    },
    reducers: {
        setRequests(state, action) {
            state.requests = action.payload;
        },
        clearRequests(state) {
            state.requests = [];
        },
        markRequestAsProcessed: (state, action) => {
            const index = state.requests.findIndex(request => request.id === action.payload);
            if (index !== -1) {
                state.requests[index].processed = true;
            }
        },
    },
});

export const { setRequests, clearRequests, markRequestAsProcessed } = requestSlice.actions;

export default requestSlice.reducer;