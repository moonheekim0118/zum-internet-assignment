import { IContents, IAction } from "@/types";
import actions from ".";

interface IData {
  index: string;
}
export const GET_CONTENT_REQUEST = (data: IData): IAction<IData> => {
  return { type: actions.GET_REQUEST, data };
};

export const GET_CONTENT_SUCCESS = (data: IContents): IAction<IContents> => {
  return { type: actions.GET_SUCCESS, data };
};

export const GET_CONTENT_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
