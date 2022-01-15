"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const validationObj = {};
function required(target, name) {
    console.log(target);
    const className = target.constructor.name;
    validationObj[className] = Object.assign(Object.assign({}, validationObj[className]), { [name]: ['required'] });
    console.log(validationObj);
}
function positive(target, name) {
    console.log(target);
    const className = target.constructor.name;
    validationObj[className] = Object.assign(Object.assign({}, validationObj[className]), { [name]: ['positive'] });
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
                case 'positive':
                    isValid = obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Trip {
    constructor(_destination, _period, _transport, _plan) {
        this.destination = _destination;
        this.period = _period;
        this.transportation_id = _transport;
        this.plan_id = _plan;
    }
}
__decorate([
    required
], Trip.prototype, "destination", void 0);
__decorate([
    positive
], Trip.prototype, "transportation_id", void 0);
__decorate([
    positive
], Trip.prototype, "plan_id", void 0);
__decorate([
    positive
], Trip.prototype, "period", void 0);
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const destinationE1 = document.getElementById('destination');
    const periodE1 = document.getElementById('period');
    const transportE1 = document.getElementById('transport');
    const planE1 = document.getElementById('plan');
    const destination = destinationE1.value;
    const period = +periodE1.value;
    const transportation = +transportE1.value;
    const plan_id = +planE1.value;
    const tripObj = new Trip(destination, period, transportation, plan_id);
    if (!validate(tripObj)) {
        alert('Enter Valid data');
        return;
    }
    else {
        alert('Successfully added');
    }
    console.log(tripObj);
});
