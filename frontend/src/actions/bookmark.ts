import { IAction, IContents } from "@/types";
import actions from ".";

export const GET_BOOKMARK_REQUEST = (): IAction => {
  return { type: actions.GET_REQUEST };
};

export const GET_BOOKMARK_SUCCESS = (
  data: IContents[]
): IAction<IContents[]> => {
  return { type: actions.GET_SUCCESS, data };
};

export const GET_BOOKMARK_FAIL = (error: string): IAction => {
  return { type: actions.GET_FAIL, error };
};

export const ADD_BOOKMARK_REQUEST = (data: IContents): IAction<IContents> => {
  return { type: actions.ADD_REQUEST, data };
};

export const ADD_BOOKMARK_SUCCESS = (
  data: IContents[]
): IAction<IContents[]> => {
  return { type: actions.ADD_SUCCESS, data };
};

export const ADD_BOOKMARK_FAIL = (error: string): IAction => {
  return { type: actions.ADD_FAIL, error };
};

export const REMOVE_BOOKMARK_REQUEST = (data: string): IAction<string> => {
  return { type: actions.REMOVE_REQUEST, data };
};

export const REMOVE_BOOKMARK_SUCCESS = (
  data: IContents[]
): IAction<IContents[]> => {
  return { type: actions.REMOVE_SUCCESS, data };
};

export const REMOVE_BOOKMARK_FAIL = (error: string): IAction => {
  return { type: actions.REMOVE_FAIL, error };
};
