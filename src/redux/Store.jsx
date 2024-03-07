import { configureStore } from "@reduxjs/toolkit";
import { todoreducer } from "./todoreducer";

export const store = configureStore({
    reducer:{
        todo:todoreducer
    }
})