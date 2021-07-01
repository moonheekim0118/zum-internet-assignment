import { IContentsList, Category } from "@/types";
import actions from ".";

export const CONTENTS_REQUEST = (data: Category) => {
  return { type: actions.GET_REQUEST, data };
};

export const CONTENTS_SUCCESS = (data: IContentsList) => {
  return { type: actions.GET_SUCCESS, data };
};

export const CONTENTS_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
