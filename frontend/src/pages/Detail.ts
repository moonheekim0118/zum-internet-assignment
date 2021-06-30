import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { singleContentStore } from "@/stores";
import { SINGLE_CONTENT_REQUEST } from "@/actions/singleContent";
import { Loader, Error } from "@/components/Shared";
import { ApiStatus } from "@/types";
import router from "@/router";

interface IState {
  index: string;
  category: string;
}

class Detail extends Component<{}, IState> {
  protected useSelector() {
    return singleContentStore.getState();
  }
  protected initDom(): void {
    this.$container = newElement(`<div class="render"/>`);
  }

  protected componentWillMount(): void {
    const [_, category, index] = router.pathList();
    this.setState({ category, index });
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
            <button class="secondary-btn">
             목록
            </button>
            <button class="primary-btn">
              즐겨찾기 저장
            </button>
          </div>
        </div>
      `,
      [ApiStatus.FAIL]: () => Error(),
    };
    this.$container.innerHTML = status ? renderByStatus[status]() : "";
  }
}

export default Detail;
