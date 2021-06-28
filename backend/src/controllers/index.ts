import express from "express";
import { bestData, contentsData } from "../data";

enum Category {
  life = "life",
  culture = "culture",
  food = "food",
  travel = "travel",
}

export const best = async (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json({ data: bestData });
  } catch (error) {
    console.error(error);
  }
};

// 상위 4개 보여주는 api
export const contents = async (req: express.Request, res: express.Response) => {
  try {
    const category = req.params.category as Category;
    const contents = contentsData[category].slice(0, 4);
    res.status(200).json({ data: contents });
  } catch (error) {
    console.error(error);
  }
};

// 해당 카테고리 무한 스크롤
export const contentsDetail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const category = req.params.category as Category;
    const lastKey = +req.params.idx;

    const contents = contentsData[category];
    const index = contents.findIndex((content) => content.idx === lastKey);

    const parsedData = contents.slice(index + 1, index + 13);
    const hasMore = parsedData.length === 12;
    res.status(200).json({ data: parsedData, hasMore });
  } catch (error) {
    console.error(error);
  }
};
