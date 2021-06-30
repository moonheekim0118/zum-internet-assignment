import { Component } from "@/core";
import { Layout } from "@/components";
import { $ } from "@/utils/dom";

class App extends Component {
  protected initDom(): void {
    this.$container = $("#app");
  }

  protected initChildren(): void {
    const layout = new Layout();
    this.children = [layout];
    this.mount();
  }
}

export default App;
