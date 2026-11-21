import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  userEmail: string | null;
}
const initialState: AuthState = { accessToken: null, userEmail: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signedIn: (
      state,
      action: PayloadAction<{ accessToken: string; email: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.userEmail = action.payload.email;
    },
    signedOut: (state) => {
      state.accessToken = null;
      state.userEmail = null;
    },
  },
});

export const { signedIn, signedOut } = authSlice.actions;
export default authSlice.reducer;
