import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { CategoryTitle } from "@/constants";
import { CardList, Loader, Error } from "@/components/Shared";
import { ApiStatus } from "@/types";
import { GET_HUBCONTENTS_REQUEST } from "@/actions/hubContents";
import { hubContentsStore } from "@/stores";

class ContentsList extends Component {
  protected useSelector() {
    return hubContentsStore.getState();
  }

  protected initDom(): void {
    this.$container = newElement(`<section class="contents-container"/>`);
  }

  protected componentWillMount(): void {
    hubContentsStore.dispatch(GET_HUBCONTENTS_REQUEST());
  }

  protected render(): void {
    const { data, status } = this.useSelector();
    const renderByStatus = {
      [ApiStatus.LOADING]: (): string => Loader(),
      [ApiStatus.DONE]: (): string => `
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
      [ApiStatus.FAIL]: (): string => Error(),
    };
    this.$container.innerHTML = status ? renderByStatus[status]() : "";
  }
}

export default ContentsList;
