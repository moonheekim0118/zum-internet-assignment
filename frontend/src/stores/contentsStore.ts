import { Store } from "@/core";
import { actions } from "@/actions/contents";
import { ApiStatus, IContents, Category } from "@/types";
import { contentsService } from "@/service";

interface IState {
  status: ApiStatus | null;
  data: {
    [key: string]: {
      hasMore: boolean;
      lastKey: number;
      contents: IContents[];
    };
  };
  error: string | null;
}

const initialData = {
  hasMore: true,
  lastKey: 0,
  contents: [],
};

const initialState = {
  status: null,
  data: {
    [Category.life]: initialData,
    [Category.culture]: initialData,
    [Category.food]: initialData,
    [Category.travel]: initialData,
  },
  error: null,
};

class ContentsStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: ({ data: category }) => {
      const { status, data } = this.state;
      const { hasMore, lastKey } = data[category];
      if (!hasMore || status === ApiStatus.LOADING) return;

      this.setState({
        ...this.state,
        status: ApiStatus.LOADING,
      });
      contentsService.getData(category, lastKey);
    },
    [actions.GET_SUCCESS]: ({ data }) => {
      const { category, hasMore, lastKey, contents } = data;

      const prevContents = this.state.data[category].contents;
      const newData = {
        hasMore,
        lastKey,
        contents: [...prevContents, ...contents],
      };
      this.setState({
        ...this.state,
        status: ApiStatus.DONE,
        data: { ...this.state.data, [category]: newData },
      });
    },
    [actions.GET_FAIL]: ({ error }) => {
      this.setState({ ...this.state, status: ApiStatus.FAIL, error });
    },
  };
}

const contentsStore = new ContentsStore(initialState);

export default contentsStore;
