import express from "express";
import crawlContetnsHTML from "../crawler";
import cache from "../cache";
import { bestData, contentsData } from "../data";
import { INIT_CONTENTS, INFINITE_CONTENTS, INTERNAL_ERROR,  NOT_FOUND_ERROR} from "../constant";

const dataCache = new cache();

interface Object{
  [key: string] : unknown;
}

enum Category {
  life = "life",
  culture = "culture",
  food = "food",
  travel = "travel",
}


export const best = async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json(bestData);
  } catch (error) {
    console.error(error.stack);
    return res.status(500).send({ message: error.message ?? INTERNAL_ERROR});
  }
};


// 상위 4개 보여주는 api
export const contents = async (req: express.Request, res: express.Response) => {
  try {
    let contents = {} as Object;
    if(dataCache.has('/hubContents')){
      contents = dataCache.get("/hubContents") as Object;
    } else {
      for(let key in contentsData){
        contents[key]=contentsData[key as Category].slice(0, INIT_CONTENTS);
      } 
      dataCache.set("/hubContents", contents);
    }
    if (!contents) throw NOT_FOUND_ERROR;
    return res.status(200).json(contents);
  } catch (error) {
    console.error(error.stack);
    return res.status(500).send({ message: error.message ?? INTERNAL_ERROR});
  }
};

// 상세 포스트

export const contentsDetail = async(req: express.Request,
  res: express.Response)=>{
    try{
      const idx= +req.params.idx;
      let data = null;
      if(dataCache.has(`/detail/${idx}`)){
        data = dataCache.get(`/detail/${idx}`)
      } else {
        let contents = null;
        for(let category in contentsData) {
          contents = contentsData[category as Category].find((content)=>content.idx ===idx);
          if(contents) break;
        }
        if(!contents) throw NOT_FOUND_ERROR;
        const contentsHTML = await crawlContetnsHTML(contents.url);
        data = { contents, contentsHTML};
        dataCache.set(`/detail/${idx}`, data);
      };

      return res.status(200).json(data);
    }catch(error){
      console.error(error.stack);
      return res.status(500).send({ message: error.message ?? INTERNAL_ERROR});
    }

}

// 해당 카테고리 무한 스크롤
export const contentsInfinite = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const category = req.params.category as Category;
    const lastKey = +req.params.idx;

    const contents = contentsData[category];
    if (!contents) throw NOT_FOUND_ERROR;
    const index = contents.findIndex((content) => content.idx === lastKey);

    const parsedData = contents.slice(index + 1, index + INFINITE_CONTENTS + 1);
    const size = parsedData.length;
    const hasMore = size === INFINITE_CONTENTS;
    return res.status(200).json({contents:parsedData, hasMore, lastKey:parsedData[size-1].idx });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).send({ message: error.message ?? INTERNAL_ERROR});
  }
};
