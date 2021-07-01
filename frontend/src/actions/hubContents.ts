import { IHubContents } from "@/types";
import actions from ".";

export const GET_HUBCONTENTS_REQUEST = () => {
  return { type: actions.GET_REQUEST };
};

export const GET_HUBCONTENTS_SUCCESS = (data: IHubContents) => {
  return { type: actions.GET_SUCCESS, data };
};

export const GET_HUBCONTENTS_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};
