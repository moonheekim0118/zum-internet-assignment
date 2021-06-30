import { IContentsList, Category } from "@/types";

export enum actions {
  GET_REQUEST = "GET_REQUEST",
  GET_SUCCESS = "GET_SUCCESS",
  GET_FAIL = "GET_FAIL",
}

export const CONTENTS_REQUEST = (data: Category) => {
  return { type: actions.GET_REQUEST, data };
};

export const CONTENTS_SUCCESS = (data: IContentsList) => {
  return { type: actions.GET_SUCCESS, data };
};

export const CONTENTS_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
