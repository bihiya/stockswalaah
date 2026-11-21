import { apiClient } from "./apiClient";

interface LoginResponse {
  data: { accessToken: string };
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse["data"]> {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data.data;
  },
};
