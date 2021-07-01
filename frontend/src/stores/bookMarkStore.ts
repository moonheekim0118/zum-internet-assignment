// api에서 데이터 가져올 때 파싱과정 한번 거쳐서 즐겨찾기에있는지 없는지확인!!
import { Store } from "@/core";
import { ApiStatus, IContents } from "@/types";
import { actions } from "@/actions/bookmark";
import { bookmarkService } from "@/service";

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
      bookmarkService.getData();
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
      const mergedData = [...this.state.data, ...data];
      this.setState({
        ...this.state,
        add_status: ApiStatus.DONE,
        data: mergedData,
      });
    },
    [actions.ADD_FAIL]: ({ error }) => {
      this.setState({ ...this.state, add_status: ApiStatus.FAIL });
    },
    [actions.REMOVE_REQUEST]: ({ data }) => {
      this.setState({ ...this.state, remove_status: ApiStatus.LOADING });
      bookmarkService.addBookmark(data);
    },
    [actions.REMOVE_SUCCESS]: ({ data }) => {
      const updatedData = this.state.data.filter(
        (contents) => contents.idx !== data
      );
      this.setState({
        ...this.state,
        remove_status: ApiStatus.DONE,
        data: updatedData,
      });
    },
    [actions.REMOVE_FAIL]: ({ error }) => {
      this.setState({ ...this.state, remove_status: ApiStatus.FAIL });
    },
  };
}

const bestStore = new BookMarkStore(initialState);
export default bestStore;
