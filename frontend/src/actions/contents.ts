import { IContentsList, Category, IAction } from "@/types";
import actions from ".";

export const GET_CONTENTS_REQUEST = (data: Category): IAction => {
  return { type: actions.GET_REQUEST, data };
};

export const GET_CONTENTS_SUCCESS = (data: IContentsList): IAction => {
  return { type: actions.GET_SUCCESS, data };
};

export const GET_CONTENTS_FAIL = (error: string): IAction => {
  return { type: actions.GET_FAIL, error };
};
