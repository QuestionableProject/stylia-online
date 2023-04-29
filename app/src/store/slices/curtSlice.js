import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    curt: null
};

const curtSlice = createSlice({
    name: "curt", 
    initialState,
    reducers: {
        setCurt(state, action) {
            state.curt = action.payload.curt
        },
        removeCurt(state) {
            state.curt = null
        }
    }
})

export const {setCurt, removeCurt} = curtSlice.actions

export default curtSlice.reducer;