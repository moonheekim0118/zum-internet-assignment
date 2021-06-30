import { $ } from "@/utils/dom";

class Router<IPage> {
  private prevHref = "";
  constructor(readonly pages: IPage) {
    this.bindEvents();
  }

  public pathList(): string[] {
    const list = this.pathname().split("/");
    list.shift();
    return list;
  }

  public pathname(): string {
    return window.location.hash.replace("#", "/") || "/";
  }

  public push(href: string): void {
    window.location.hash = href.replace("/", "#");
    this.render();
  }

  private bindEvents(): void {
    window.addEventListener("hashchange", () => this.render());
  }

  private unmount(): void {
    if (!this.prevHref) return;
    this.pages[this.prevHref]?.componentWillUnmount();
  }

  private render(): void {
    this.unmount();
    const href = `/${this.pathList()[0]}`;

    this.prevHref = href;
    const $main = $("main");
    $main.innerHTML = "";
    if (this.pages[href]) {
      $main.appendChild(this.pages[href].mount());
    }
    // TODO: NOT FOUND
  }
}

export default Router;
