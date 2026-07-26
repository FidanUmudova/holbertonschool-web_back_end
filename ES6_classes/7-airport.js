export default class Airport {
  constructor(name, code) {
    this._name = name;
    this._code = code;
  }

  // Symbol.toStringTag override
  get [Symbol.toStringTag]() {
    return this._code;
  }
}
