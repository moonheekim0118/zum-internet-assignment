import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { bookmarkStore } from "@/stores";
import { BOOKMARK_REQUEST } from "@/actions/bookmark";

class Bookmark extends Component {
  protected useSelector() {
    return bookmarkStore.getState();
  }
  protected initDom(): void {
    this.$container = newElement(`<div class="render"/>`);
  }

  protected componentWillMount(): void {
    bookmarkStore.dispatch(BOOKMARK_REQUEST());
  }

  protected render(): void {
    const { get_status, data } = this.useSelector();
    this.$container.innerHTML = `
        <div class="bookmark-container">
            ${data.map((v) => {}).join("")}
        </div>
      `;
  }
}

export default Bookmark;
