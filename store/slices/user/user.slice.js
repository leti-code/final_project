import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    logged: false,
    token: null,
    username: null  ,
    email : null,
    img : null,
    active_maps : null,
    actual_flag : null,
    scores : null,
    maps_owned : null      
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogged: (state, action) => {
            state.logged = action.payload.logged;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.img = action.payload.img;
            state.active_maps = action.payload.active_maps;
            state.actual_flag = action.payload.actual_flag;
            state.scores = action.payload.scores;
            state.maps_owned = action.payload.maps_owned;
            window.localStorage.setItem("byb_token", action.payload.token);
        }
    }
});

export const{setLogged} = userSlice.actions;
export default userSlice.reducer;