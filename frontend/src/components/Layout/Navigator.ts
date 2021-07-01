import { Component } from "@/core";
import { newElement, closest } from "@/utils/dom";
import { PATH } from "@/constants";
import router from "@/router";

class Navigator extends Component {
  constructor() {
    super();
    window.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const anchor = closest(target, "a") as HTMLAnchorElement;
      if (!anchor) return;
      this.render();
    });
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
            }><a data-id="home" href="${PATH.HOME}">홈</a></li>
            <li class=${
              this.checkPath("/life") ? "visiting" : ""
            }><a data-id="home" href="${PATH.LIFE}">라이프</a></li>
            <li class=${
              this.checkPath("/food") ? "visiting" : ""
            }><a data-id="food" href="${PATH.FOOD}">푸드</a></li>
            <li class=${
              this.checkPath("/travel") ? "visiting" : ""
            }><a data-id="travel" href="${PATH.TRAVEL}">여행</a></li>
            <li class=${
              this.checkPath("/culture") ? "visiting" : ""
            }><a data-id="culture" href="${PATH.CULTURE}">컬쳐</a></li>
        </ul>
        <ul class="menu-container">
            <li class=${this.checkPath("/bookmark") ? "visiting" : ""}>
            <a data-id="bookmark" href="${PATH.BOOKMARK}">즐겨찾기</a>
            </li>
        </ul>
        `;
  }
}

export default Navigator;
