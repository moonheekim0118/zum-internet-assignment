import { $ } from "@/utils/dom";

class Router<IPage> {
  private prevHref = "";
  constructor(readonly pages: IPage) {
    this.bindEvents();
  }

  public pathanme(): string {
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
    this.pages[this.prevHref].componentWillUnmount();
  }

  private render(): void {
    this.unmount();
    const href = this.pathanme();
    this.prevHref = href;
    history.pushState({ url: window.location.hash }, "hashPath");
    const $main = $("main");
    $main.innerHTML = "";
    if (this.pages[href]) {
      $main.appendChild(this.pages[href].mount());
    }
    // TODO: NOT FOUND
  }
}

export default Router;
