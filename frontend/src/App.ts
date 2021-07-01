import { Component } from "@/core";
import { Layout } from "@/components";
import { $ } from "@/utils/dom";
import router from "@/router";

class App extends Component {
  protected initDom(): void {
    this.$container = $("#app");
  }

  protected initChildren(): void {
    const layout = new Layout();
    this.children = [layout];
    this.mount();
    router.push(router.pathname());
  }
}

export default App;
