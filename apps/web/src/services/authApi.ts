import { apiClient } from "./apiClient";
import type { LoginResponse, SignupResponse } from "./authTypes";

interface ApiResponse<T> {
  data: T;
}

export const authApi = {
  async signup(name: string, email: string, password: string): Promise<SignupResponse> {
    const response = await apiClient.post<ApiResponse<SignupResponse>>("/auth/signup", {
      name,
      email,
      password,
    });
    return response.data.data;
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", {
      email,
      password,
    });
    return response.data.data;
  },
};
