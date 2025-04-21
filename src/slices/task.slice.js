import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    limit: 3,
    isDialogOpen: false,
    slug: null, 
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setLimit(state, action) {
            state.limit = action.payload;
        },
        setDialogOpen(state, action) {
            state.isDialogOpen = action.payload;
        },
        setSlug(state, action) {
            state.slug = action.payload;
        },
    },
});
export const { setLimit, setDialogOpen, setSlug } = taskSlice.actions;

export default taskSlice.reducer;
