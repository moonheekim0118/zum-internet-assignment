import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { PATH, CategoryTitle } from "@/constants";
import router from "@/router";

class Navigator extends Component {
  protected usePathName(): string {
    return router.pathname();
  }
  protected initDom(): void {
    this.$container = newElement(`<nav/>`);
  }

  private checkPath(path: string): boolean {
    return this.usePathName() === path;
  }

  protected render(): void {
    this.$container.innerHTML = `
        <ul class="menu-container">
          <li class=${this.checkPath(PATH.HOME) ? "visiting" : ""}>
            <a data-id="home" href="${PATH.HOME}">
              ${CategoryTitle.home}
            </a>
          </li>
          <li class=${this.checkPath(PATH.LIFE) ? "visiting" : ""}>
            <a data-id="life" href="${PATH.LIFE}">
              ${CategoryTitle.life}
            </a>
          </li>
          <li class=${this.checkPath(PATH.FOOD) ? "visiting" : ""}>
            <a data-id="food" href="${PATH.FOOD}">
              ${CategoryTitle.food}
            </a>
          </li>
          <li class=${this.checkPath(PATH.TRAVEL) ? "visiting" : ""}>
            <a data-id="travel" href="${PATH.TRAVEL}">
              ${CategoryTitle.travel}
            </a>
          </li>
          <li class=${this.checkPath(PATH.CULTURE) ? "visiting" : ""}>
            <a data-id="culture" href="${PATH.CULTURE}">
              ${CategoryTitle.culture}
            </a>
          </li>
        </ul>
        <ul class="menu-container">
          <li class=${this.checkPath(PATH.BOOKMARK) ? "visiting" : ""}>
            <a data-id="bookmark" href="${PATH.BOOKMARK}">
              ${CategoryTitle.bookmark}
            </a>
          </li>
        </ul>
        `;
  }
}

export default Navigator;
