import { $, closest } from "@/utils/dom";

class Router<IPage> {
  constructor(readonly pages: IPage) {
    this.bindEvents();
  }

  public pathList(): string[] {
    const list = this.pathname().split("/");
    list.shift();
    return list;
  }

  public pathname(): string {
    return (
      history.state?.href ??
      window.location.href.replace("http://localhost:9000", "")
    );
  }

  public push(href: string): void {
    const prevhref = history.state?.href ?? href;
    history.pushState({ href, prevhref }, null, href);
    this.render();
  }

  private bindEvents(): void {
    window.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const anchor = closest(target, "a") as HTMLAnchorElement;
      if (!anchor) return;

      const link = anchor.href.replace("http://localhost:9000", "");
      this.push(link);
    });

    window.addEventListener("popstate", () => this.render());
  }

  private unmount(): void {
    if (!history.state) return;
    const { href, prevhref } = history.state;
    if (href === prevhref) return;
    this.pages[prevhref].componentWillUnmount();
  }

  private render(): void {
    this.unmount();
    const href = `/${this.pathList()[0]}`;
    const $main = $("main");
    $main.innerHTML = "";
    if (this.pages[href]) {
      $main.appendChild(this.pages[href].mount());
    }
    // TODO: NOT FOUND
  }
}

export default Router;
