export interface IPageInfo {
  title: string;
  href: string;
}

export interface IContents {
  idx: number;
  title: string;
  imageUrl: string;
  mediaName: string;
  summaryContent: string;
}

export interface IBest {
  idx: number;
  title: string;
  mediaName: string;
  url: string;
}

export enum Category {
  life = "life",
  culture = "culture",
  food = "food",
  travel = "travel",
}

export interface IHubContents {
  [Category.culture]: IContents[];
  [Category.food]: IContents[];
  [Category.life]: IContents[];
  [Category.travel]: IContents[];
}

export enum ApiStatus {
  LOADING = "LOADING",
  DONE = "DONE",
  FAIL = "FAIL",
}

export interface IContentsList {
  contents: IContents[];
  hasMore: boolean;
  lastKey: number;
}
