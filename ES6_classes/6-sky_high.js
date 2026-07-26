import Building from './5-building.js';

export default class SkyHighBuilding extends Building {
  constructor(sqft, floors) {
    super(sqft);
    this._floors = floors;
  }

  // Getter: sqft
  get sqft() {
    return this._sqft;
  }

  // Getter: floors
  get floors() {
    return this._floors;
  }

  // Override method: evacuationWarningMessage
  evacuationWarningMessage() {
    return `Evacuate slowly the ${this._floors} floors`;
  }
}
