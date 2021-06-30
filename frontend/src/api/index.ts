import { Category, IHubContents, IBest } from "@/types";

const baseUrl = "http://localhost:3000/api";

const request = async (endPoint, option = {}) => {
  const response = await fetch(baseUrl + endPoint, option);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Server Error");
  }
  return data;
};

const api = {
  getBest: async () => {
    const data = await request("/best");
    return data;
  },
  getSummaryContents: async () => {
    const data = await request("/content");
    return data;
  },

  getInfiniteContents: async (category: Category, lastKey: number | string) => {
    const data = await request(`/content/${category}/${lastKey}`);
    return data;
  },
};

export default api;
