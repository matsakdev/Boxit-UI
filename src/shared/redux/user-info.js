import {createSlice} from "@reduxjs/toolkit";
import {LocalStorage} from "../../utils/localStorage";

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        token: ''
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            LocalStorage.setItem('authToken', state.token);
        },
        clearToken: (state) => {
            state.token = '';
            LocalStorage.removeItem('authToken');
        },
    }
});

export const { setToken, clearToken } = userInfoSlice.actions;

export const getUserToken = state => state.userInfo.token;
export default userInfoSlice.reducer;
