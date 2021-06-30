import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { IBest } from "@/types";
import api from "@/api";

interface IState {
  data: IBest[] | null;
}

class Best extends Component<{}, IState> {
  constructor() {
    super();
    this.state = { data: null };
  }
  protected initDom(): void {
    this.$container = newElement(`<section class="best-container"/>`);
  }

  protected async initState(): Promise<void> {
    try {
      const data = await api.getBest();
      this.setState({ data });
    } catch (error) {
      alert("다시시도해주세여");
    }
  }

  protected render(): void {
    const { data } = this.state;
    this.$container.innerHTML = `
    <h3>실시간 TOP 12</h3>
      ${
        !data
          ? "로딩중"
          : `
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
          </li>`;
        })
        .join("")}
    </ul>
      `
      }
      `;
  }
}

export default Best;
