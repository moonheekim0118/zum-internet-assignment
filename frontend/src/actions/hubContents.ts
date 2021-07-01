import { IHubContents, IAction } from "@/types";
import actions from ".";

export const GET_HUBCONTENTS_REQUEST = (): IAction => {
  return { type: actions.GET_REQUEST };
};

export const GET_HUBCONTENTS_SUCCESS = (
  data: IHubContents
): IAction<IHubContents> => {
  return { type: actions.GET_SUCCESS, data };
};

export const GET_HUBCONTENTS_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
