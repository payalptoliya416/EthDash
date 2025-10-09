import toast from "react-hot-toast";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.29.134:8000/api";

export async function adminapiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  includeToken: boolean = true
): Promise<T> {
  try {
    const token = includeToken ? localStorage.getItem("admin-authtoken") : null;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(includeToken && token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorText = await res.text();
      const message = JSON.parse(errorText)?.message || res.statusText;
      toast.error(message || "Something went wrong!");
      throw new Error(message);
    }

    return await res.json();
  } catch (error: any) {
    toast.error(error.message || "Network error");
    throw error;
  }
}
