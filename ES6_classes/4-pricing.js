import Currency from './3-currency.js';

export default class Pricing {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  // Getter & Setter: amount
  get amount() {
    return this._amount;
  }

  set amount(value) {
    this._amount = value;
  }

  // Getter & Setter: currency
  get currency() {
    return this._currency;
  }

  set currency(value) {
    if (!(value instanceof Currency)) {
      throw new TypeError('currency must be an instance of Currency');
    }
    this._currency = value;
  }

  // Method: displayFullPrice
  displayFullPrice() {
    return `${this._amount} ${this._currency.name} (${this._currency.code})`;
  }

  // Static Method: convertPrice
  static convertPrice(amount, conversionRate) {
    return amount * conversionRate;
  }
}
