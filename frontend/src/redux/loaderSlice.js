import { createSlice } from '@reduxjs/toolkit';
const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: false,
    },  
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});