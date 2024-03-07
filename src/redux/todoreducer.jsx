import { createReducer } from "@reduxjs/toolkit";

const initialstates = {
    isloading2:false,
    iserror:null,
    todosarray:[]
}

export const todoreducer = createReducer(initialstates , (builder)=>{
    builder.addCase("getalltodopending" , (state)=>{
        state.isloading2=true
    })
    builder.addCase("getalltodossuccess" , (state,action)=>{
        state.isloading2=false
        state.todosarray=action.payload
    })
    builder.addCase("getalltodoserror" , (state,action)=>{
        state.isloading2=false
        state.iserror=action.payload
    })
    builder.addCase("addtodosuccess" , (state,action)=>{
        state.todosarray=[...state.todosarray , action.payload]
    })
    builder.addCase("addtodoerror" , (state,action)=>{
        state.iserror=action.payload
    })
    builder.addCase("deleteupdatetodo" , (state,action)=>{
        state.todosarray=action.payload
    })
})