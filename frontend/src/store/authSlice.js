import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status : false,
    accessToken: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { accessToken } = action.payload;
            state.status = true;
            state.accessToken = accessToken;
        },
        logout(state) {
            state.status = false;
            state.accessToken = null;
        },
    },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
