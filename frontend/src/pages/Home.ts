import { Component } from "@/core";
import { Contents, Best } from "@/components/Home";
import { newElement } from "@/utils/dom";

class Home extends Component {
  protected initDom(): void {
    this.$container = newElement(`<div/>`);
  }

  protected initChildren(): void {
    const contents = new Contents();
    const best = new Best();
    this.children = [contents, best];
  }
}

export default Home;
