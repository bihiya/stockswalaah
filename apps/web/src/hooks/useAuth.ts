import { useAppSelector } from "../store/hooks";

export function useAuth() {
  return useAppSelector((state) => ({
    isAuthenticated: Boolean(state.auth.accessToken),
    userEmail: state.auth.userEmail,
  }));
}
