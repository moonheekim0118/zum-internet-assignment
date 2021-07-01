class cache {
    private data: Map<string, unknown>;
    constructor() {
      this.data = new Map<string, unknown>();
    }
  
    set(key: string, value: unknown): void {
      this.data.set(key, value);
    }
  
    has(key: string): boolean {
      return this.data.has(key);
    }
  
    get(key: string): unknown {
      return this.data.get(key) ;
    }
  }
  
  export default cache;