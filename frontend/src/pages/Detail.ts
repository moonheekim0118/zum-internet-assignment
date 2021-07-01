import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { singleContentStore, bookmarkStore } from "@/stores";
import { SINGLE_CONTENT_REQUEST } from "@/actions/singleContent";
import {
  BOOKMARK_ADD_REQUEST,
  BOOKMARK_REMOVE_REQUEST,
} from "@/actions/bookmark";
import { Loader, Error } from "@/components/Shared";
import { ApiStatus } from "@/types";
import { isBookMarked } from "@/storage";
import router from "@/router";

interface IState {
  index: string;
  category: string;
  bookmark: boolean;
}

class Detail extends Component<{}, IState> {
  constructor() {
    super();
    this.rootEvent("click", (e: Event) => this.handleButtonClick(e));
  }
  protected useSelector() {
    return singleContentStore.getState();
  }
  protected initDom(): void {
    this.$container = newElement(`<div class="render"/>`);
  }

  private handleButtonClick({ target }): void {
    const id = target.id;
    if (id !== "list" && id !== "addBookmark" && id !== "removeBookmark")
      return;

    const assignAction = {
      list: () => {
        // 뒤로가기 구현
      },
      addBookmark: () => {
        const { data } = this.useSelector();
        this.setState({ ...this.state, bookmark: true });
        bookmarkStore.dispatch(BOOKMARK_ADD_REQUEST(data));
      },
      removeBookmark: () => {
        const { data } = this.useSelector();
        this.setState({ ...this.state, bookmark: false });
        bookmarkStore.dispatch(BOOKMARK_REMOVE_REQUEST(data.idx));
      },
    };
    assignAction[id]();
  }

  protected componentWillMount(): void {
    const [_, category, index] = router.pathList();
    const bookmark = isBookMarked(+index);
    this.setState({ category, index, bookmark });
    singleContentStore.dispatch(SINGLE_CONTENT_REQUEST({ category, index }));
  }

  protected render(): void {
    const { status, data } = this.useSelector();

    const renderByStatus = {
      [ApiStatus.LOADING]: () => Loader(),
      [ApiStatus.DONE]: () => `
        <div class="detail-container">
          <h1>${data.title}</h1>
          <span class="author">${data.mediaName}</span>
          <img src="${data.imageUrl}"/>
          <span class="full-contents">
          ${data.summaryContent}
          </span>
          <div class="buttons">
            <button class="secondary-btn" id="list">
             목록
            </button>
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
