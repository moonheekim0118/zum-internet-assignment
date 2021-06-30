import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { ApiStatus, IBest } from "@/types";
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
      [ApiStatus.LOADING]: () => `<h3>데이터를 가져오는 중..</h3>`,
      [ApiStatus.DONE]: (data: IBest[]) => ` 
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
      [ApiStatus.FAIL]: () => `<h3>에러가 생겼네용</h3>`,
    };
    this.$container.innerHTML = renderByStatus[status](data);
  }
}

export default Best;
