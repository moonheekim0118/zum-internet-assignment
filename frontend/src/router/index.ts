import { Component, Router } from "@/core";
import { Home, Category } from "@/pages";

import { PATH } from "@/constants";

type IPage = {
  [pathname in PATH]: Component;
};

const router = new Router<IPage>({
  [PATH.HOME]: new Home(),
  [PATH.CULTURE]: new Category(),
  [PATH.LIFE]: new Category(),
  [PATH.TRAVEL]: new Category(),
  [PATH.FOOD]: new Category(),
  [PATH.BOOKMARK]: new Home(),
  [PATH.DETAIL]: new Home(),
});

export default router;
