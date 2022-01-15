"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const validationObj = {};
function Required(target, name) {
    console.log(target);
    const className = target.constructor.name;
    validationObj[className] = Object.assign(Object.assign({}, validationObj[className]), { [name]: ['required'] });
    console.log(validationObj);
}
function validate(obj) {
    let validatorName = validationObj[obj.constructor.name];
    console.log(validatorName);
    if (!validatorName) {
        return true;
    }
    let isValid = true;
    for (const prop in validatorName) {
        console.log(prop);
        for (const validator of validatorName[prop]) {
            console.log(validator);
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
            }
        }
    }
    return isValid;
}
class Trip {
    constructor(_destination, _period, _plan, _transport) {
        this.destination = _destination;
        this.period = _period;
        this.transportation = _transport;
        this.plan = _plan;
    }
}
__decorate([
    Required
], Trip.prototype, "destination", void 0);
__decorate([
    Required
], Trip.prototype, "transportation", void 0);
__decorate([
    Required
], Trip.prototype, "plan", void 0);
__decorate([
    Required
], Trip.prototype, "period", void 0);
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const planE1 = document.getElementById('plan');
    const transportE1 = document.getElementById('transport');
    const destinationE1 = document.getElementById('destination');
    const periodE1 = document.getElementById('period');
    const destination = +destinationE1.value;
    const period = +periodE1.value;
    const transportation = +transportE1.value;
    const plan = +planE1.value;
    const tripObj = new Trip(destination, transportation, plan, period);
    if (!validate(tripObj)) {
        alert('Enter a valid input');
        return;
    }
    console.log(tripObj);
});
