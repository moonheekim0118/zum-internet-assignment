import express from "express";
import { bestData, contentsData } from "../data";
import { INIT_CONTENTS, INFINITE_CONTENTS } from "../constant";

enum Category {
  life = "life",
  culture = "culture",
  food = "food",
  travel = "travel",
}

export const best = async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json({ data: bestData });
  } catch (error) {
    console.error(error.stack);
    return res
      .status(500)
      .send({ status: 500, message: error.message ?? "internal Error" });
  }
};

// 상위 4개 보여주는 api
export const contents = async (req: express.Request, res: express.Response) => {
  try {
    const category = req.params.category as Category;
    const contents = contentsData[category].slice(0, INIT_CONTENTS);
    if (!contents) throw new Error("Not Found Category");
    return res.status(200).json({ data: contents });
  } catch (error) {
    console.error(error.stack);
    return res
      .status(500)
      .send({ status: 500, message: error.message ?? "internal Error" });
  }
};

// 상세 포스트

export const contentsDetail = async(req: express.Request,
  res: express.Response)=>{
    try{
      const { category , index} = req.params;
      const contents = contentsData[category as Category].find((content)=>content.idx===+index);
      if(!contents) throw new Error("Not Found data");
      return res.status(200).json({ data: contents });
    }catch(error){
      console.error(error.stack);
      return res
        .status(500)
        .send({ status: 500, message: error.message ?? "internal Error" });
    }

}

// 해당 카테고리 무한 스크롤
export const contentsInfinite = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const category = req.params.category as Category;
    const lastKey = +req.params.idx;

    const contents = contentsData[category];
    if (!contents) throw new Error("Not Found Category");
    const index = contents.findIndex((content) => content.idx === lastKey);

    const parsedData = contents.slice(index + 1, index + INFINITE_CONTENTS + 1);
    const hasMore = parsedData.length === INFINITE_CONTENTS;
    return res.status(200).json({ data: parsedData, hasMore });
  } catch (error) {
    console.error(error.stack);
    return res
      .status(500)
      .send({ status: 500, message: error.message ?? "internal Error" });
  }
};
