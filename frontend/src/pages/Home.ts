import { Component } from "@/core";
import { Contents } from "@/components/Home";
import { newElement } from "@/utils/dom";

class Home extends Component {
  protected initDom(): void {
    this.$container = newElement(`<div/>`);
  }

  protected initChildren(): void {
    const contents = new Contents();
    this.children = [contents];
  }
}

export default Home;
