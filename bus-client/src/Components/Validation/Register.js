const isEmpty=require('is-empty');
const Validator= require('validator');

// eslint-disable-next-line no-undef
module.exports= validateRegistration = (data) => {
    const errors={}
//CONVERT EMPTY FIELDS TO EMPTY STRINGS
data.username=!isEmpty(data.username)?data.username:"";
data.email=!isEmpty(data.email)?data.email:"";
data.password=!isEmpty(data.password)?data.password:"";
data.confirmpassword=!isEmpty(data.confirmpassword)?data.confirmpassword:"";

//STEP 2 VALIDATIONS

//A. USERNAME
if (Validator.isEmpty(data.username)) {
    errors.username="UserName Is Required"
}
if (!Validator.isLength(data.username,{min:5,max:20})) {
    errors.username="Username must contain a min of 5 and max 0f 20 characters"
}
//B. EMAIL
if (Validator.isEmpty(data.email)) {
    errors.email="Your Email Is Required"
}
if (!Validator.isEmail(data.email)) {
    errors.email="Incorrect Email"
}
//PASSWORD
if (Validator.isEmpty(data.password)) {
    errors.password="Your Password Is Required"
}
if (!Validator.isLength(data.password,{min:6,max:12})) {
    errors.password="Password must contain a min of 5 and max 0f 20 characters"
}
//PASSWORD CONFIRMATION
if (Validator.isEmpty(data.confirmpassword)) {
    errors.confirmpassword="Confirm Password Is Required"
}
if (!Validator.equals(data.confirmpassword,data.password)) {
    errors.confirmpassword="Passwords Don't Match"
}
return({
    errors,
    isValid:isEmpty(errors)
})
}