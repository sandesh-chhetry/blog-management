import { getToken } from "../auth/auth";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const token = getToken();
export const HEADERS = {
  "Content-Type": "application/json",
  // "Authorization": token ?? "",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

export const API_ENDPOINTS = {
  blogs: {
    posts: `${API_BASE_URL}/posts`,
    create: `${API_BASE_URL}/posts`,
    getById: (id: any)  => `${API_BASE_URL}/posts/${id}`,
    update: (id: any)  => `${API_BASE_URL}/posts/${id}`,
    delete: (id: any)  => `${API_BASE_URL}/posts/${id}`,
  }
}