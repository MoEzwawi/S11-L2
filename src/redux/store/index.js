import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favsReducer from "../reducers/favsReducer";
import fetchReducer from "../reducers/fetchReducer";


const mainReducer = combineReducers({})

const store = configureStore({
    reducer: mainReducer,
})

export default store