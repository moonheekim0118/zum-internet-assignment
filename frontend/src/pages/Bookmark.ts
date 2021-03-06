import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { bookmarkStore } from "@/stores";
import { Loader, Error } from "@/components/Shared";
import { ApiStatus } from "@/types";
import { PATH } from "@/constants";
import { GET_BOOKMARK_REQUEST } from "@/actions/bookmark";

class Bookmark extends Component {
  protected useSelector() {
    return bookmarkStore.getState();
  }
  protected initDom(): void {
    this.$container = newElement(`<div class="render"/>`);
  }

  protected componentWillMount(): void {
    bookmarkStore.dispatch(GET_BOOKMARK_REQUEST());
  }

  protected render(): void {
    const { get_status, data } = this.useSelector();

    const renderByStatus = {
      [ApiStatus.LOADING]: (): string => Loader(),
      [ApiStatus.DONE]: (): string => {
        return data.length === 0
          ? `<h3>아직 즐겨찾기가 없어요</h3>`
          : `${data.map(
              ({ idx, title, imageUrl, mediaName, summaryContent }) => `
          <article class="bookmark" data-id=${idx}>
            <a href="${PATH.DETAIL}/${idx}">
            <img src="${imageUrl}" alt="썸네일 이미지" loading="lazy"/>
            <div class="bookmark-detail">
              <h3>${title}</h3>
              <span class="author">${mediaName}</span>
              <span class="full-contents">${summaryContent}</span>
            </div>
            </a>
          </article>
        `
            )}`;
      },
      [ApiStatus.FAIL]: (): string => Error(),
    };
    this.$container.innerHTML = `
      <div class="bookmark-container">
        ${get_status ? renderByStatus[get_status]() : ""}
      </div>
      `;
  }
}

export default Bookmark;
