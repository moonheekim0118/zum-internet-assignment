import { Component } from "@/core";
import { newElement } from "@/utils/dom";

class Category extends Component {
  protected initDom(): void {
    this.$container = newElement(`<div class="render"/>`);
  }
}

export default Category;
