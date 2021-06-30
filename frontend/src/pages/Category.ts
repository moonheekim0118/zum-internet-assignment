import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import router from "@/router";

class Category extends Component {
  protected initDom(): void {
    this.$container = newElement(`<div class="render"/>`);
  }

  protected componentWillMount(): void {
    const category = router.pathanme().replace("/", "");
  }

  protected render(): void {}
}

export default Category;
