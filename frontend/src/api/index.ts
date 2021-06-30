import { Category, IHubContents, IBest } from "@/types";
import { Cache } from "@/core";

const serverCache = new Cache();
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
    if (serverCache.has("/best")) return serverCache.get("/best");
    const data = await request("/best");
    serverCache.set("/best", data);
    return data;
  },
  getSummaryContents: async () => {
    if (serverCache.has("/content")) return serverCache.get("/content");
    const data = await request("/content");
    return data;
  },
};

export default api;
