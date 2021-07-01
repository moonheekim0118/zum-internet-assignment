interface IDataBase {
  idx: number;
}

class storage<T extends IDataBase> {
  constructor(readonly key: string, readonly storage: Storage = localStorage) {}

  public get(): T[] {
    const items = this.storage.getItem(this.key) ?? "[]";
    return JSON.parse(items);
  }

  public set(items: T[]): void {
    this.storage.setItem(this.key, JSON.stringify(items));
  }

  public has(idx: number): boolean {
    const datas = this.get();
    return datas.findIndex((data) => data.idx === idx) !== -1;
  }
}

export default storage;
