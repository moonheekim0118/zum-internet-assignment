import { Store } from "@/core";
import { ApiStatus, IHubContents } from "@/types";
import { actions } from "@/actions/hubContents";
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

class HubContentsStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: () => {
      this.setState({ ...this.state, status: ApiStatus.LOADING });
      mainService.getContentsData();
    },
    [actions.GET_SUCCESS]: ({ data }) => {
      this.setState({ ...this.state, status: ApiStatus.DONE, data });
    },
    [actions.GET_FAIL]: ({ error }) => {
      this.setState({ ...this.state, status: ApiStatus.FAIL });
    },
  };
}

const hubContentsStore = new HubContentsStore(initialState);
export default hubContentsStore;
