import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { singleContentStore, bookmarkStore } from "@/stores";
import { GET_CONTENT_REQUEST } from "@/actions/singleContent";
import {
  ADD_BOOKMARK_REQUEST,
  REMOVE_BOOKMARK_REQUEST,
} from "@/actions/bookmark";
import { Loader, Error } from "@/components/Shared";
import { ApiStatus } from "@/types";
import { isBookMarked } from "@/storage";
import router from "@/router";

interface IState {
  index: string;
  bookmark: boolean;
}

class Detail extends Component<{}, IState> {
  protected useSelector() {
    return singleContentStore.getState();
  }
  protected initDom(): void {
    this.$container = newElement(`<div class="render"/>`);
  }

  protected bindEvents(): void {
    this.rootEvent("click", (e: Event) => this.handleButtonClick(e));
  }

  private handleButtonClick({ target }): void {
    const id = target.id;
    if (id !== "list" && id !== "addBookmark" && id !== "removeBookmark")
      return;

    const assignAction = {
      list: () => router.back(),
      addBookmark: () => {
        const { data } = this.useSelector();
        this.setState({ ...this.state, bookmark: true });
        bookmarkStore.dispatch(ADD_BOOKMARK_REQUEST(data.contents));
      },
      removeBookmark: () => {
        this.setState({ ...this.state, bookmark: false });
        bookmarkStore.dispatch(REMOVE_BOOKMARK_REQUEST(this.state.index));
      },
    };
    assignAction[id]();
  }

  protected componentWillMount(): void {
    const [_, index] = router.pathList();
    const bookmark = isBookMarked(+index);
    this.setState({ index, bookmark });
    singleContentStore.dispatch(GET_CONTENT_REQUEST({ index }));
  }

  protected render(): void {
    const { status, data } = this.useSelector();

    const renderByStatus = {
      [ApiStatus.LOADING]: () => Loader(),
      [ApiStatus.DONE]: () => `
        <div class="detail-container">
           ${data.contentsHTML}
            ${
              this.state.bookmark
                ? `
            <button class="primary-btn" id="removeBookmark">
            즐겨찾기 취소
           </button>
            `
                : `<button class="primary-btn" id="addBookmark">
            즐겨찾기 저장
          </button>`
            }
          </div>
        </div>
      `,
      [ApiStatus.FAIL]: () => Error(),
    };
    this.$container.innerHTML = status ? renderByStatus[status]() : "";
  }
}

export default Detail;
