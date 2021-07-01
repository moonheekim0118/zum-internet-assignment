import { Category } from "@/types";
import { backURL, SERVER_ERROR, TIMEOUT } from "@/constants";

const request = async (endPoint, option = {}) => {
  const response = await fetch(backURL + endPoint, option);
  const data = await response.json();
  const timer = setTimeout(() => {
    throw SERVER_ERROR;
  }, TIMEOUT);
  if (!response.ok) {
    throw SERVER_ERROR;
  }
  clearTimeout(timer);
  return data;
};

const api = {
  getBest: () => request("/best"),
  getSummaryContents: () => request("/content"),
  getInfiniteContents: async (category: Category, lastKey: number) => {
    const data = await request(`/content/${category}/${lastKey}`);
    return { ...data, category };
  },

  getDetailContent: (index: string) => request(`/detail/${index}`),
};

export default api;
