import { Store } from "@/core";
import { ApiStatus, IContents } from "@/types";
import { actions } from "@/actions/singleContent";
import { singleContentService } from "@/service";

interface IState {
  status: ApiStatus;
  data: IContents;
  error: string | null;
}

const initialState = {
  status: ApiStatus.LOADING,
  data: null,
  error: null,
};

class SingleContentStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: ({ data }) => {
      singleContentService.getData(data);
    },
    [actions.GET_SUCCESS]: ({ data }) => {
      this.setState({ ...this.state, status: ApiStatus.DONE, data });
    },
    [actions.GET_FAIL]: ({ error }) => {
      this.setState({ ...this.state, status: ApiStatus.FAIL, error });
    },
  };
}

const bestStore = new SingleContentStore(initialState);
export default bestStore;
