import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { CardList } from "@/components/Shared";
import { IHubContents } from "@/types";
import api from "@/api";

interface IState {
  data: IHubContents | null;
}

// TODO : 렌더링 map으로 리팩토링하기

class ContentsList extends Component<{}, IState> {
  constructor() {
    super();
    this.state = { data: null };
  }
  protected initDom(): void {
    this.$container = newElement(`<section class="contents-container"/>`);
  }

  protected async initState(): Promise<void> {
    try {
      const data = await api.getSummaryContents();
      this.setState({ data });
    } catch (error) {
      alert("다시 시도해주세요.");
    }
  }

  protected render(): void {
    const { data } = this.state;
    this.$container.innerHTML = `
    ${
      !data
        ? "로딩중"
        : `
    <div class="contents-detail" data-id="culture">
    <h4>#컬쳐</h4>
    ${CardList({ contentsList: data.culture })}
    </div>
    <div class="contents-detail" data-id="food">
      <h4>#푸드</h4>
      ${CardList({ contentsList: data.food })}
    </div>
    <div class="contents-detail" data-id="life">
      <h4>#라이프</h4>
      ${CardList({ contentsList: data.life })}
    </div>
    <div class="contents-detail" data-id="travel">
      <h4>#여행</h4>
      ${CardList({ contentsList: data.travel })}
    </div>
    `
    }
    `;
  }
}

export default ContentsList;
