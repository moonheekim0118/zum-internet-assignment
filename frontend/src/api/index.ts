import { Category } from "@/types";
import { backURL } from "@/constants";

const request = async (endPoint, option = {}) => {
  const response = await fetch(backURL + endPoint, option);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Server Error");
  }
  return data;
};

const api = {
  getBest: () => request("/best"),
  getSummaryContents: () => request("/content"),
  getInfiniteContents: async (category: Category, lastKey: number | string) => {
    const data = await request(`/content/${category}/${lastKey}`);
    return { ...data, category };
  },

  getDetailContent: (index: string) => request(`/detail/${index}`),
};

export default api;
