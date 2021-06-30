import { contentsStore } from "@/stores";
import { Category } from "@/pages";
import { CONTENTS_SUCCESS, CONTENTS_FAIL } from "@/actions/contents";
import serverCache from "@/api/serverCache";

const contentsService = {
  getData: async (category: Category, lastKey: number) => {
    // 캐시에 있다면 그걸로대체~
  },
};

export default contentsService;
