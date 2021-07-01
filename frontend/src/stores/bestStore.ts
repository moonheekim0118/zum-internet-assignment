import { Store } from "@/core";
import { ApiStatus, IBest } from "@/types";
import { mainService } from "@/service";
import actions from "@/actions";

interface IState {
  status: ApiStatus | null;
  data: IBest[] | null;
  error: string | null;
}

const initialState = {
  status: null,
  data: null,
  error: null,
};

class BestStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: (): void => {
      mainService.getBestData();
    },
    [actions.GET_SUCCESS]: ({ data }): void => {
      this.setState({ ...this.state, status: ApiStatus.DONE, data });
    },
    [actions.GET_FAIL]: ({ error }): void => {
      this.setState({ ...this.state, status: ApiStatus.FAIL, error });
    },
  };
}

const bestStore = new BestStore(initialState);
export default bestStore;
