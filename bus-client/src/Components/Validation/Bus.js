/* eslint-disable no-undef */
const isEmpty=require('is-empty');
const Validator= require('validator');
const moment = require('moment');

module.exports=validateBus=(data) => {
    const errors={}
//CONVERT EMPTY FIELDS TO EMPTY STRINGS
data.plates=!isEmpty(data.plates)?data.plates:"";
data.routes=!isEmpty(data.routes)?data.routes:"";
data.departureTime=!isEmpty(data.departureTime)?data.departureTime:"";
data.arrivalTime=!isEmpty(data.arrivalTime)?data.arrivalTime:"";
data.price=!isEmpty(data.price)?data.price:"";


//STEP 2 VALIDATIONS
if (Validator.isEmpty(data.plates)) {
    errors.plates="The Bus plate is Empty"
}
if (!Validator.isLength(data.plates,{min:6,max:6})) {
    errors.plates="Plates must contain 6 characters"
}
//ROUTES
if (Validator.isEmpty(data.routes)) {
    errors.routes="Routes is Empty"
}
//PRICE
if (Validator.isEmpty(data.price)) {
    errors.price="Price is Empty"
}
//DEPARTURE 

if (Validator.isAfter(data.departureTime,data.arrivalTime)) {
    errors.departureTime="Departure Time cannot be After Arrival Time"
}
if (Validator.isBefore(data.departureTime,moment().format())) {
    errors.departureTime="Departure Time cannot be of a Past date"
}
//ARRIVAL

if (Validator.isBefore(data.arrivalTime,data.departureTime)) {
    errors.arrivalTime="Arrival Time cannot be Before Departure Time"
}
if (Validator.isBefore(data.arrivalTime,moment().format())) {
    errors.departureTime="Arrival Time cannot be of a Past date"
}
return({
    errors,
    isValid:isEmpty(errors)
})
}