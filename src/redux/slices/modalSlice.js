import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalAddOpen: false,
        modalDetail: {
            open: false,
            movie: null,
        },
    },
    reducers: {
        setModalAddOpen: (state, action) => {
            state.modalAddOpen = action.payload;
        },
        setModalDetail: (state, action) => {
            state.modalDetail.open = action.payload;
            state.modalDetail.movie = action.payload ? action.payload.movie : null;
        },
        resetModalDetail: (state) => {
            state.modalDetail.open = false;
            state.modalDetail.movie = null;
        }
    },
});

export const { setModalAddOpen, setModalDetail, resetModalDetail } = modalSlice.actions;

export default modalSlice.reducer;