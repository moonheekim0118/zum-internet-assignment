import { Store } from "@/core";
import { ApiStatus, IContents } from "@/types";
import { bookmarkService } from "@/service";
import actions from "@/actions";

interface IState {
  get_status: ApiStatus | null;
  add_status: ApiStatus | null;
  remove_status: ApiStatus | null;
  data: IContents[] | null;
  error: string | null;
}

const initialState = {
  get_status: null,
  add_status: null,
  remove_status: null,
  data: null,
  error: null,
};

class BookMarkStore extends Store<IState> {
  protected reducer = {
    [actions.GET_REQUEST]: () => {
      bookmarkService.getBookmark();
    },
    [actions.GET_SUCCESS]: ({ data }) => {
      this.setState({ ...this.state, get_status: ApiStatus.DONE, data });
    },
    [actions.GET_FAIL]: ({ error }) => {
      this.setState({ ...this.state, get_status: ApiStatus.FAIL, error });
    },
    [actions.ADD_REQUEST]: ({ data }) => {
      this.setState({ ...this.state, add_status: ApiStatus.LOADING });
      bookmarkService.addBookmark(data);
    },
    [actions.ADD_SUCCESS]: ({ data }) => {
      this.setState({
        ...this.state,
        add_status: ApiStatus.DONE,
        data,
      });
    },
    [actions.ADD_FAIL]: ({ error }) => {
      this.setState({ ...this.state, add_status: ApiStatus.FAIL });
    },
    [actions.REMOVE_REQUEST]: ({ data }) => {
      this.setState({ ...this.state, remove_status: ApiStatus.LOADING });
      bookmarkService.removeBookmark(data);
    },
    [actions.REMOVE_SUCCESS]: ({ data }) => {
      this.setState({
        ...this.state,
        remove_status: ApiStatus.DONE,
        data,
      });
    },
    [actions.REMOVE_FAIL]: ({ error }) => {
      this.setState({ ...this.state, remove_status: ApiStatus.FAIL });
    },
  };
}

const bestStore = new BookMarkStore(initialState);
export default bestStore;
