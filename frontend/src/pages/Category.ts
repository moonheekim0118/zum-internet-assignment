import { Component, IntersectionObserver } from "@/core";
import { newElement } from "@/utils/dom";
import { CONTENTS_REQUEST } from "@/actions/contents";
import { contentsStore } from "@/stores";
import { CardList, Loader, Error } from "@/components/Shared";
import { Category as CategoryType, ApiStatus } from "@/types";
import router from "@/router";

interface IState {
  category: CategoryType;
}

class Category extends Component<{}, IState> {
  protected useSelector() {
    return contentsStore.getState();
  }

  protected initDom(): void {
    this.$container = newElement(`<div class="render"/>`);
    this.$observer = newElement(`<div class="observer"/>`);
  }

  private handleGetMoreData(): void {
    contentsStore.dispatch(CONTENTS_REQUEST(this.state.category));
  }

  protected componentWillMount(): void {
    const category = router.pathanme().replace("/", "") as CategoryType;
    this.state = { category };
    this.handleGetMoreData();
    new IntersectionObserver(
      { $root: this.$container, rootMargin: "0px", threshold: 1.0 },
      this.$observer,
      () => this.handleGetMoreData()
    );
  }

  protected render(): void {
    const { status, contents } = this.useSelector();

    const renderByStatus = {
      [ApiStatus.LOADING]: () =>
        contents
          ? `${CardList({ contentsList: contents })} ${Loader()}`
          : Loader(),
      [ApiStatus.DONE]: () => CardList({ contentsList: contents }),
      [ApiStatus.FAIL]: () => Error(),
    };

    this.$container.innerHTML = `
      ${status ? renderByStatus[status]() : ""}
    `;
    this.$container.appendChild(this.$observer);
  }
}

export default Category;
