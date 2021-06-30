import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { CardList, Loader, Error } from "@/components/Shared";
import { IHubContents, ApiStatus } from "@/types";
import { HUBCONTENTS_REQUEST } from "@/actions/hubContents";
import { hubContentsStore } from "@/stores";

// TODO : 렌더링 map으로 리팩토링하기

class ContentsList extends Component {
  protected useSelector() {
    return hubContentsStore.getState();
  }

  protected initDom(): void {
    this.$container = newElement(`<section class="contents-container"/>`);
  }

  protected componentWillMount(): void {
    hubContentsStore.dispatch(HUBCONTENTS_REQUEST());
  }

  protected render(): void {
    const { data, status } = this.useSelector();
    const renderByStatus = {
      [ApiStatus.LOADING]: () => Loader(),
      [ApiStatus.DONE]: () => `
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
      `,
      [ApiStatus.FAIL]: () => Error(),
    };
    this.$container.innerHTML = status ? renderByStatus[status]() : "";
  }
}

export default ContentsList;
