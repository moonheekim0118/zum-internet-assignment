import { Store } from "@/core";
import { ApiStatus, IHubContents } from "@/types";
import { actions } from "@/actions/contents";
import { mainService } from "@/service";

interface IState {
  status: ApiStatus;
  data: IHubContents | null;
  error: string | null;
}

const initialState = {
  status: ApiStatus.LOADING,
  data: null,
  error: null,
};

class ContentsStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: () => {
      this.setState({ ...this.state, status: ApiStatus.LOADING });
      mainService.getContentsData();
    },
    [actions.GET_SUCCESS]: ({ data }) => {
      this.setState({ ...this.state, status: ApiStatus.DONE, data });
    },
    [actions.GET_FAIL]: (error: string) => {
      this.setState({ ...this.state, status: ApiStatus.FAIL });
    },
  };
}

const contentsStore = new ContentsStore(initialState);
export default contentsStore;
