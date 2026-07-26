export default class Currency {
  constructor(code, name) {
    this.code = code;
    this.name = name;
  }

  // Getter & Setter: code
  get code() {
    return this._code;
  }

  set code(value) {
    this._code = value;
  }

  // Getter & Setter: name
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  // Method: displayFullCurrency
  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}
