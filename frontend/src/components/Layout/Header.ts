import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import Navigator from "./Navigator";

class Header extends Component {
  protected initDom(): void {
    this.$container = newElement(`<header/>`);
  }

  protected initChildren(): void {
    const navigator = new Navigator();
    this.children = [navigator];
  }

  protected render(): void {
    this.$container.innerHTML = `
       <div class="inner">
        <h1>
          <a href="/" class="logo">
            <img src="https://hub.zum.com/resources/pc/images/logo_zum_2x_20210429-047bb40d62fc256b0d38d0359520856e.png" 
            width="65" height="27" alt="zum"/>
          </a>
          <a href="/" class="sub_title">
            <img src="https://hub.zum.com/resources/pc/images/img_hub_zum_2x_20210429-327cc2698de49b56b35ae8d45e833a05.png" 
            width="39" height="21" alt="허브">
          </a>
        </h1>
      </div>
        `;
  }
}

export default Header;
