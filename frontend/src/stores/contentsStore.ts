import { Store } from "@/core";
import { actions } from "@/actions/contents";
import { ApiStatus, IContents, Category } from "@/types";
import { contentsService } from "@/service";

interface IState {
  status: ApiStatus;
  category: Category;
  hasMore: boolean;
  lastKey: number;
  contents: IContents[] | null;
  error: string | null;
}

const initialState = {
  status: ApiStatus.LOADING,
  category: Category.culture,
  hasMore: true,
  lastKey: 0,
  contents: null,
  error: null,
};

class ContentsStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: ({ data }) => {
      this.setState({
        ...this.state,
        category: data,
        status: ApiStatus.LOADING,
      });
      contentsService.getData(data, this.state.lastKey);
    },
    [actions.GET_SUCCESS]: ({ data }) => {
      const { hasMore, lastKey, contents } = data;
      this.setState({
        ...this.state,
        status: ApiStatus.DONE,
        hasMore,
        lastKey,
        contents,
      });
    },
    [actions.GET_FAIL]: ({ error }) => {
      this.setState({ ...this.state, status: ApiStatus.FAIL, error });
    },
  };
}

const contentsStore = new ContentsStore(initialState);

export default contentsStore;
