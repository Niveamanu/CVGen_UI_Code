export default class ApiService {
  protected store: any;

  constructor(store: any) {
    this.store = store;
  }

  get token() {
    return this.store.token;
  }

  get apiDomain() {
    return this.store.apiDomain;
  }

  protected getStore() {
    return this.store;
  }
}
