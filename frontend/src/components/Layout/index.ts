import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

class Layout extends Component {
  protected initDom(): void {
    this.$container = newElement(`<div class="layout"/>`);
  }

  protected initChildren(): void {
    const header = new Header();
    const main = new Main();
    const footer = new Footer();
    this.children = [header, main, footer];
  }
}

export default Layout;
