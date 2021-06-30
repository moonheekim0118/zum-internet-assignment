interface IOptions {
  $root: Element;
  rootMargin: string;
  threshold: number;
}

class IO {
  constructor(options: IOptions, $target: Element, readonly cb: Function) {
    const observer = new IntersectionObserver(
      this._onObserve.bind(this),
      options
    );
    observer.observe($target);
  }

  private _onObserve(entries: IntersectionObserverEntry[]): void {
    if (entries[0].isIntersecting) this.cb();
  }
}

export default IO;
