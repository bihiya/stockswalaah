import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  userEmail: string | null;
  userName: string | null;
}

const saved = (() => {
  try {
    const value = localStorage.getItem("stockwallah-auth");
    return value ? (JSON.parse(value) as Partial<AuthState>) : {};
  } catch {
    return {};
  }
})();

const initialState: AuthState = {
  accessToken: saved.accessToken ?? null,
  userEmail: saved.userEmail ?? null,
  userName: saved.userName ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signedIn: (
      state,
      action: PayloadAction<{ accessToken: string; email: string; name?: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.userEmail = action.payload.email;
      state.userName = action.payload.name ?? null;
      localStorage.setItem("stockwallah-auth", JSON.stringify(state));
    },
    signedOut: (state) => {
      state.accessToken = null;
      state.userEmail = null;
      state.userName = null;
      localStorage.removeItem("stockwallah-auth");
    },
  },
});

export const { signedIn, signedOut } = authSlice.actions;
export default authSlice.reducer;
