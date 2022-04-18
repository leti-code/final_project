import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    logged: false,
    token: null,
    username: null        
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogged: (state, action) => {
            state.logged = action.payload.logged;
            state.token = action.payload.token;
            state.username = action.payload.username;
            window.localStorage.setItem("byb_token", action.payload.token);
        }
    }
});

export const{setLogged} = userSlice.actions;
export default userSlice.reducer;