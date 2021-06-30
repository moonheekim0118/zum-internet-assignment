import { Store } from "@/core";
import { actions } from "@/actions/contents";
import { ApiStatus, IContents, Category } from "@/types";
import { contentsService } from "@/service";

interface IState {
  status: ApiStatus | null;
  category: Category;
  hasMore: boolean;
  lastKey: number;
  contents: IContents[];
  error: string | null;
}

const initialState = {
  status: null,
  category: Category.culture,
  hasMore: true,
  lastKey: 0,
  contents: [],
  error: null,
};

class ContentsStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: ({ data }) => {
      const { hasMore, status, category } = this.state;
      if (category !== data) this.setState(initialState);
      if (!hasMore || status === ApiStatus.LOADING) return;
      this.setState({
        ...this.state,
        category: data,
        status: ApiStatus.LOADING,
      });
      contentsService.getData(data, this.state.lastKey);
    },
    [actions.GET_SUCCESS]: ({ data }) => {
      const { hasMore, lastKey, contents } = data;
      const mergedContents = [...this.state.contents, ...contents];
      this.setState({
        ...this.state,
        status: ApiStatus.DONE,
        hasMore,
        lastKey,
        contents: mergedContents,
      });
    },
    [actions.GET_FAIL]: ({ error }) => {
      this.setState({ ...this.state, status: ApiStatus.FAIL, error });
    },
  };
}

const contentsStore = new ContentsStore(initialState);

export default contentsStore;
