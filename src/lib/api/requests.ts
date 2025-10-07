import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.29.134:8000/api";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
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
 } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message || "Network error");
    throw error;
  } else {
    toast.error("An unexpected error occurred");
    throw new Error("An unexpected error occurred");
  }
}
}
