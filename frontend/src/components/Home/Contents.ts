import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { CategoryTitle } from "@/constants";
import { CardList, Loader, Error } from "@/components/Shared";
import { ApiStatus } from "@/types";
import { HUBCONTENTS_REQUEST } from "@/actions/hubContents";
import { hubContentsStore } from "@/stores";

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
      <h4>#${CategoryTitle.culture}</h4>
       ${CardList({ contentsList: data.culture })}
      </div>
      <div class="contents-detail" data-id="food">
        <h4>#${CategoryTitle.food}</h4>
        ${CardList({ contentsList: data.food })}
      </div>
      <div class="contents-detail" data-id="life">
        <h4>#${CategoryTitle.life}</h4>
        ${CardList({ contentsList: data.life })}
      </div>
      <div class="contents-detail" data-id="travel">
        <h4>#${CategoryTitle.travel}</h4>
        ${CardList({ contentsList: data.travel })}
      </div>
      `,
      [ApiStatus.FAIL]: () => Error(),
    };
    this.$container.innerHTML = status ? renderByStatus[status]() : "";
  }
}

export default ContentsList;
