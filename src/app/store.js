import {configureStore} from "@reduxjs/toolkit";
import userInfoReducer from "../shared/redux/user-info";

export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
    },
});
