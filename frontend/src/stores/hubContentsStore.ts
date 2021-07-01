import { Store } from "@/core";
import { ApiStatus, IHubContents } from "@/types";
import { mainService } from "@/service";
import actions from "@/actions";

interface IState {
  status: ApiStatus | null;
  data: IHubContents | null;
  error: string | null;
}

const initialState = {
  status: null,
  data: null,
  error: null,
};

class HubContentsStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: () => {
      if (this.state.status === ApiStatus.LOADING) return;
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
