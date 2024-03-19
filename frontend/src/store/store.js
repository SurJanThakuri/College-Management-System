import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from './teacherSlice';

const store = configureStore(
    {
        reducer: {
            teacher: teacherReducer,
            //other reducers
        }
    }
);
export default store;