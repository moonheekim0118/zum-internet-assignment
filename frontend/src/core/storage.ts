interface IDataBase {
  idx: number;
}

class storage<T extends IDataBase> {
  constructor(readonly key: string, readonly storage: Storage = localStorage) {}

  public getAll(): T[] {
    const items = this.storage.getItem(this.key) ?? "[]";
    return JSON.parse(items);
  }

  public set(items: T[]): void {
    this.storage.setItem(this.key, JSON.stringify(items));
  }

  public has(idx: number): boolean {
    const datas = this.getAll();
    console.log(datas);
    return datas.findIndex((data) => data.idx === idx) !== -1;
  }

  public get(idx: number): T | null {
    const datas = this.getAll();
    const item = datas.find((data) => data.idx === idx);
    return item;
  }

  public add(item: T): T[] {
    const datas = this.getAll();
    const newData = [...datas, item];
    this.set(newData);
    return newData;
  }

  public remove(idx: number): T[] {
    const datas = this.getAll();
    const newData = datas.filter((data) => data.idx !== idx);
    this.set(newData);
    return newData;
  }
}

export default storage;
