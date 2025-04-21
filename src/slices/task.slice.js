import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    limit: 3,
    isDialogOpen: false,
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
    },
});
export const { setLimit, setDialogOpen } = taskSlice.actions;

export default taskSlice.reducer;
