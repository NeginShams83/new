// API Configuration for Maktab90 Server
const API_BASE_URL = "https://nervous-jackson-pvcf9esfp.liara.run";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  access_token?: string; // Alternative token field name
  user?: {
    id: string | number;
    username: string;
    email?: string;
    role?: string;
    name?: string;
  };
  admin?: {
    id: string | number;
    username: string;
    email?: string;
    role?: string;
    name?: string;
  };
  message?: string;
  success?: boolean;
  [key: string]: any; // Allow for additional fields
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("admin-token")
        : null;

    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      let errorMessage = "خطا در ارتباط با سرور";

      // Handle different HTTP status codes
      switch (response.status) {
        case 400:
          errorMessage = errorData.message || "اطلاعات ارسالی نامعتبر است";
          break;
        case 401:
          errorMessage =
            errorData.message || "نام کاربری یا رمز عبور اشتباه است";
          break;
        case 403:
          errorMessage = errorData.message || "شما دسترسی لازم را ندارید";
          break;
        case 404:
          errorMessage = errorData.message || "سرویس مورد نظر یافت نشد";
          break;
        case 500:
          errorMessage = errorData.message || "خطای داخلی سرور";
          break;
        default:
          errorMessage =
            errorData.message ||
            `خطا ${response.status}: ${response.statusText}`;
      }

      throw {
        message: errorMessage,
        status: response.status,
        errors: errorData.errors || {},
      } as ApiError;
    }

    return response.json();
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.makeRequest<LoginResponse>("/@admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<void> {
    try {
      await this.makeRequest("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      // Even if logout fails on server, clear local storage
      console.warn("Logout request failed, but clearing local data");
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin-token");
      }
    }
  }

  async getCurrentUser(): Promise<LoginResponse["user"]> {
    return this.makeRequest<LoginResponse["user"]>("/api/auth/me");
  }

  async refreshToken(): Promise<LoginResponse> {
    return this.makeRequest<LoginResponse>("/api/auth/refresh", {
      method: "POST",
    });
  }
}

export const apiClient = new ApiClient();

// Utility functions
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("admin-token");
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin-token", token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin-token");
  }
};
