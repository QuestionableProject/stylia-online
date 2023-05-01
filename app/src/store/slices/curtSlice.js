import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    curt: null,
    priseCurt: null
};

const curtSlice = createSlice({
    name: "curt", 
    initialState,
    reducers: {
        setCurt(state, action) {
            state.curt = action.payload.curt
            state.priseCurt = action.payload.priseCurt
        },
        removeCurt(state) {
            state.curt = null
            state.priseCurt = null
        }
    }
})

export const {setCurt, removeCurt} = curtSlice.actions

export default curtSlice.reducer;