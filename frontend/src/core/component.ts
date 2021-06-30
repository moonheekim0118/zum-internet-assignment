import { observe } from "./store";

class Component<IProps = unknown, IState = unknown> {
  protected $container: HTMLElement = document.createElement("div");
  protected $observer: HTMLElement;
  protected children: Component[] = [];
  protected props: IProps;
  protected state: IState = {} as IState;
  private events: {
    type: keyof HTMLElementEventMap;
    handler: EventListener;
  }[] = [];

  constructor(props?: IProps) {
    this.props = props;
    this.setUp();
  }

  protected useSelector(): void {}
  protected bindEvents(): void {}
  protected initDom(): void {}
  protected initChildren(): void {}
  protected initState(): void {}
  protected componentWillMount(): void {}
  protected componentWillUpdate(): void {}
  protected render(): void {}

  protected componentDidUpdate(): void {
    this.children.forEach((child) => child.updateComponent());
  }

  protected setUp(): void {
    this.initDom();
    this.initChildren();
    this.render();
    observe(
      () => this.useSelector(),
      () => this.updateComponent()
    );
  }

  public mount(): HTMLElement {
    this.componentWillMount();
    this.render();
    this.bindEvents();
    this.initState();
    this.children.forEach((child) => {
      this.$container.appendChild(child.mount());
    });
    return this.$container;
  }

  public returnRoot(): HTMLElement {
    return this.$container;
  }

  private renderChildren(): void {
    this.children.forEach((child) => {
      this.$container.appendChild(child.returnRoot());
    });
  }

  protected updateComponent(): void {
    this.componentWillUpdate();
    this.render();
    this.renderChildren();
    this.componentDidUpdate();
  }

  public componentWillUnmount(): void {
    this.events.forEach(({ type, handler }) => {
      this.$container.removeEventListener(type, handler);
    });
    this.children.forEach((child) => child.componentWillUnmount());
  }

  protected rootEvent(
    type: keyof HTMLElementEventMap,
    handler: EventListener
  ): void {
    this.events = [...this.events, { type, handler }];
    this.$container.addEventListener(type, handler);
  }

  public setState(nextState: IState): void {
    this.state = nextState;
    this.updateComponent();
  }

  public updateProps(nextProps: IProps): void {
    this.props = nextProps;
    this.updateComponent();
  }

  protected beforeChangeURL() {}
  //   public pageInfo(): IPageInfo | void {}
}

export default Component;
