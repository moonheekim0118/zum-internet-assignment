import { IHubContents } from "@/types";
import actions from ".";

export const HUBCONTENTS_REQUEST = () => {
  return { type: actions.GET_REQUEST };
};

export const HUBCONTENTS_SUCCESS = (data: IHubContents) => {
  return { type: actions.GET_SUCCESS, data };
};

export const HUBCONTENTS_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
