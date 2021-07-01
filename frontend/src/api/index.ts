import { Category } from "@/types";
import { backURL, SERVER_ERROR, TIMEOUT } from "@/constants";

const controller = new AbortController();

const request = async (endPoint: string, time: number) => {
  const timer = setTimeout(() => {
    controller.abort();
  }, time);
  const response = await fetch(backURL + endPoint);
  const data = await response.json();
  if (!response.ok) {
    throw SERVER_ERROR;
  }
  clearTimeout(timer);
  return data;
};

const api = {
  getBest: () => request("/best", TIMEOUT),
  getSummaryContents: () => request("/content", TIMEOUT),
  getInfiniteContents: async (category: Category, lastKey: number) => {
    const data = await request(`/content/${category}/${lastKey}`, TIMEOUT);
    return { ...data, category };
  },

  getDetailContent: (index: string) => request(`/detail/${index}`, TIMEOUT),
};

export default api;
