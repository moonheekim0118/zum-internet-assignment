import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import router from "@/router";

class Navigator extends Component {
  constructor() {
    super();
    window.addEventListener("hashchange", () => this.render());
  }
  protected initDom(): void {
    this.$container = newElement(`<nav/>`);
  }

  private checkPath(path: string): boolean {
    return router.pathname() === path;
  }

  protected render(): void {
    this.$container.innerHTML = `
        <ul class="menu-container">
            <li class=${
              this.checkPath("/") ? "visiting" : ""
            }><a data-id="home" href="#">홈</a></li>
            <li class=${
              this.checkPath("/life") ? "visiting" : ""
            }><a data-id="home" href="#life">라이프</a></li>
            <li class=${
              this.checkPath("/food") ? "visiting" : ""
            }><a data-id="food" href="#food">푸드</a></li>
            <li class=${
              this.checkPath("/travel") ? "visiting" : ""
            }><a data-id="travel" href="#travel">여행</a></li>
            <li class=${
              this.checkPath("/culture") ? "visiting" : ""
            }><a data-id="culture" href="#culture">컬쳐</a></li>
        </ul>
        <ul class="menu-container">
            <li class=${this.checkPath("/bookmark") ? "visiting" : ""}>
            <a data-id="bookmark" href="#bookmark">즐겨찾기</a>
            </li>
        </ul>
        `;
  }
}

export default Navigator;
