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
    [actions.GET_REQUEST]: (): void => {
      if (this.state.status === ApiStatus.LOADING) return;
      this.setState({ ...this.state, status: ApiStatus.LOADING });
      mainService.getContentsData();
    },
    [actions.GET_SUCCESS]: ({ data }): void => {
      this.setState({ ...this.state, status: ApiStatus.DONE, data });
    },
    [actions.GET_FAIL]: ({ error }): void => {
      this.setState({ ...this.state, status: ApiStatus.FAIL, error });
    },
  };
}

const hubContentsStore = new HubContentsStore(initialState);
export default hubContentsStore;
