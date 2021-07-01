import { Component, IntersectionObserver } from "@/core";
import { newElement } from "@/utils/dom";
import { GET_CONTENTS_REQUEST } from "@/actions/contents";
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
    contentsStore.dispatch(GET_CONTENTS_REQUEST(this.state.category));
  }

  protected componentWillMount(): void {
    const category = router.pathname().replace("/", "") as CategoryType;
    this.setState({ category });
    this.handleGetMoreData();
    new IntersectionObserver(
      { $root: this.$container, rootMargin: "0px", threshold: 1.0 },
      this.$observer,
      () => this.handleGetMoreData()
    );
  }

  protected render(): void {
    const { status, data } = this.useSelector();
    const renderByStatus = {
      [ApiStatus.LOADING]: (): string =>
        data[this.state.category]?.contents
          ? `${CardList({
              contentsList: data[this.state.category].contents,
            })} ${Loader()}`
          : Loader(),
      [ApiStatus.DONE]: (): string =>
        CardList({
          contentsList: data[this.state.category]?.contents ?? [],
        }),
      [ApiStatus.FAIL]: (): string => Error(),
    };

    this.$container.innerHTML = `
      ${status ? renderByStatus[status]() : ""}
    `;
    if (status !== ApiStatus.FAIL) {
      this.$container.appendChild(this.$observer);
    }
  }
}

export default Category;
