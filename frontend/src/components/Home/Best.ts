import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { ApiStatus, IBest } from "@/types";
import { Loader, Error } from "@/components/Shared";
import { bestStore } from "@/stores";
import { BEST_REQUEST } from "@/actions/best";

class Best extends Component {
  protected useSelector() {
    return bestStore.getState();
  }

  protected initDom(): void {
    this.$container = newElement(`<section class="best-container"/>`);
  }

  protected componentWillMount(): void {
    bestStore.dispatch(BEST_REQUEST());
  }

  protected render(): void {
    const { data, status } = this.useSelector();

    const renderByStatus = {
      [ApiStatus.LOADING]: () => Loader(),
      [ApiStatus.DONE]: () => ` 
      <h3>실시간 TOP 12</h3>
      <ul>
      ${data
        .map(({ idx, title, mediaName, url }, rank) => {
          return `
          <li data-index=${idx}>
            <a href="${url}">
              <span class="${rank < 3 ? "number_rank_top" : "number_rank"}">${
            rank + 1
          }</span>
              <div class="detail">
                <strong>${title}</strong>
                <span>${mediaName}</span>
              </div>
            </a>
          </li>
          `;
        })
        .join("")}
        </ul>`,
      [ApiStatus.FAIL]: () => Error(),
    };
    this.$container.innerHTML = status ? renderByStatus[status]() : "";
  }
}

export default Best;
