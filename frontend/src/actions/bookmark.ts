export enum actions {
  GET_REQUEST = "GET_REQUEST",
  GET_SUCCESS = "GET_SUCCESS",
  GET_FAIL = "GET_FAIL",

  ADD_REQUEST = "ADD_REQUEST",
  ADD_SUCCESS = "ADD_SUCCESS",
  ADD_FAIL = "ADD_FAIL",

  REMOVE_REQUEST = "REMOVE_REQUEST",
  REMOVE_SUCCESS = "REMOVE_SUCCESS",
  REMOVE_FAIL = "REMOVE_FAIL",
}

export const BOOKMARK_REQUEST = () => {
  return { type: actions.GET_REQUEST };
};

export const BOOKMARK_SUCCESS = (data) => {
  return { type: actions.GET_SUCCESS, data };
};

export const BOOKMARK_FAIL = (error: string) => {
  return { type: actions.GET_FAIL, error };
};

export const BOOKMARK_ADD_REQUEST = (data) => {
  return { type: actions.ADD_REQUEST, data };
};

export const BOOKMARK_ADD_SUCCESS = (data) => {
  return { type: actions.ADD_SUCCESS, data };
};

export const BOOKMARK_ADD_FAIL = (error: string) => {
  return { type: actions.ADD_FAIL, error };
};

export const BOOKMARK_REMOVE_REQUEST = (data) => {
  return { type: actions.REMOVE_REQUEST, data };
};

export const BOOKMARK_REMOVE_SUCCESS = (data) => {
  return { type: actions.REMOVE_SUCCESS, data };
};

export const BOOKMARK_REMOVE_FAIL = (error: string) => {
  return { type: actions.REMOVE_FAIL, error };
};
