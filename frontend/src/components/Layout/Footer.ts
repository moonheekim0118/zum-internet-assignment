import { Component } from "@/core";
import { newElement } from "@/utils/dom";

class Footer extends Component {
  protected initDom(): void {
    this.$container = newElement(`<footer/>`);
  }

  protected render(): void {
    this.$container.innerHTML = `
        <span>
            Copyright © ZUM internet Corp. All Rights Reserved.
        </span>
        `;
  }
}

export default Footer;
