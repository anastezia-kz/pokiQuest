import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    limit: 3,
    isDialogOpen: false,
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
});

export default taskSlice.reducer;
