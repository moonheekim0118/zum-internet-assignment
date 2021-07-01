import { $, closest } from "@/utils/dom";

let currentObserver = null;

export const routerObserve = (selector: Function, cb: Function): void => {
  currentObserver = cb;
  selector();
  currentObserver = null;
};

class Router<IPage> {
  protected observers: Set<Function>;
  constructor(readonly pages: IPage) {
    this.bindEvents();
    this.observers = new Set();
  }

  public pathList(): string[] {
    const list = this.pathname().split("/");
    list.shift();
    return list;
  }

  public pathname(): string {
    if (currentObserver) this.observers.add(currentObserver);
    return (
      history.state?.href ??
      window.location.href.replace("http://localhost:9000", "")
    );
  }

  public back(): void {
    const prevhref = history.state?.prevhref;
    if (!prevhref) return;
    this.push(prevhref);
  }

  public push(href: string): void {
    const prevhref = "/" + this.pathList()[0];
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
    this.observers.forEach((observer) => observer());
    // TODO: NOT FOUND
  }
}

export default Router;
