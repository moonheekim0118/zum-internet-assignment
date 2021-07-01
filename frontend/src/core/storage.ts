class storage<T> {
  constructor(readonly key: string, readonly storage: Storage = localStorage) {}

  public get(): T[] {
    const items = this.storage.getItem(this.key) ?? "[]";
    return JSON.parse(items);
  }

  public set(items: T[]): void {
    this.storage.setItem(this.key, JSON.stringify(items));
  }
}

export default storage;
