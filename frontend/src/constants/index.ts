export enum PATH {
  HOME = "/",
  LIFE = "/life",
  FOOD = "/food",
  TRAVEL = "/travel",
  CULTURE = "/culture",
  DETAIL = "/detail",
  BOOKMARK = "/bookmark",
}

export const frontURL = "http://localhost:9000";
export const backURL = "http://localhost:3000/api";

export enum CategoryTitle {
  home = "홈",
  life = "생활",
  food = "음식",
  travel = "여행",
  culture = "문화",
  bookmark = "즐겨찾기",
}

export const TIMEOUT = 5000;
export const SERVER_ERROR = new Error("Server Error!");
