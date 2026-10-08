// =============================
// College Admission Form Validation
// =============================

const form = document.getElementById("admissionForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Get Values

    let name = document.getElementById("name");
    let father = document.getElementById("father");
    let mother = document.getElementById("mother");
    let dob = document.getElementById("dob");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let state = document.getElementById("state");
    let pincode = document.getElementById("pincode");
    let department = document.getElementById("department");
    let percentage = document.getElementById("percentage");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let terms = document.getElementById("terms");

    let gender = document.querySelector('input[name="gender"]:checked');

    let valid = true;

    // Clear old errors

    document.querySelectorAll(".error").forEach(function(item){
        item.innerHTML = "";
    });

    document.querySelectorAll("input, textarea, select").forEach(function(item){
        item.classList.remove("invalid");
        item.classList.remove("success");
    });

    // ===========================
    // Name
    // ===========================

    if(name.value.trim()==""){
        error(name,"nameError","Student name is required");
        valid=false;
    }
    else{
        success(name);
    }

    // ===========================

    if(father.value.trim()==""){
        error(father,"fatherError","Father name is required");
        valid=false;
    }
    else{
        success(father);
    }

    // ===========================

    if(mother.value.trim()==""){
        error(mother,"motherError","Mother name is required");
        valid=false;
    }
    else{
        success(mother);
    }

    // ===========================

    if(dob.value==""){
        error(dob,"dobError","Select Date of Birth");
        valid=false;
    }
    else{
        success(dob);
    }

    // ===========================

    if(gender==null){
        document.getElementById("genderError").innerHTML="Select Gender";
        valid=false;
    }

    // ===========================
    // Email
    // ===========================

    let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email.value.trim()==""){
        error(email,"emailError","Email is required");
        valid=false;
    }
    else if(!emailPattern.test(email.value)){
        error(email,"emailError","Invalid Email");
        valid=false;
    }
    else{
        success(email);
    }

    // ===========================
    // Phone
    // ===========================

    let phonePattern=/^[0-9]{10}$/;

    if(phone.value.trim()==""){
        error(phone,"phoneError","Phone number required");
        valid=false;
    }
    else if(!phonePattern.test(phone.value)){
        error(phone,"phoneError","Enter 10 digit phone number");
        valid=false;
    }
    else{
        success(phone);
    }

    // ===========================
    // Address
    // ===========================

    if(address.value.trim()==""){
        error(address,"addressError","Address required");
        valid=false;
    }
    else{
        success(address);
    }

    // ===========================

    if(city.value.trim()==""){
        error(city,"cityError","City required");
        valid=false;
    }
    else{
        success(city);
    }

    // ===========================

    if(state.value==""){
        error(state,"stateError","Select State");
        valid=false;
    }
    else{
        success(state);
    }

    // ===========================
    // Pincode
    // ===========================

    let pinPattern=/^[0-9]{6}$/;

    if(pincode.value.trim()==""){
        error(pincode,"pincodeError","Pincode required");
        valid=false;
    }
    else if(!pinPattern.test(pincode.value)){
        error(pincode,"pincodeError","Enter valid 6 digit pincode");
        valid=false;
    }
    else{
        success(pincode);
    }

    // ===========================

    if(department.value==""){
        error(department,"departmentError","Select Department");
        valid=false;
    }
    else{
        success(department);
    }

    // ===========================
    // Percentage
    // ===========================

    if(percentage.value==""){
        error(percentage,"percentageError","Enter Percentage");
        valid=false;
    }
    else if(percentage.value<35 || percentage.value>100){
        error(percentage,"percentageError","Percentage must be between 35 and 100");
        valid=false;
    }
    else{
        success(percentage);
    }

    // ===========================
    // Password
    // ===========================

    if(password.value==""){
        error(password,"passwordError","Password required");
        valid=false;
    }
    else if(password.value.length<8){
        error(password,"passwordError","Minimum 8 characters");
        valid=false;
    }
    else{
        success(password);
    }

    // ===========================
    // Confirm Password
    // ===========================

    if(confirmPassword.value==""){
        error(confirmPassword,"confirmPasswordError","Confirm Password");
        valid=false;
    }
    else if(password.value!=confirmPassword.value){
        error(confirmPassword,"confirmPasswordError","Passwords do not match");
        valid=false;
    }
    else{
        success(confirmPassword);
    }

    // ===========================
    // Terms
    // ===========================

    if(!terms.checked){
        document.getElementById("termsError").innerHTML="Accept Terms & Conditions";
        valid=false;
    }

    // ===========================

    if(valid){

        alert("🎉 College Admission Registration Successful!");

        form.reset();

        document.querySelectorAll("input, textarea, select").forEach(function(item){
            item.classList.remove("success");
        });

    }

});

// =============================
// Helper Functions
// =============================

function error(element,id,message){

    element.classList.add("invalid");

    document.getElementById(id).innerHTML=message;

}

function success(element){

    element.classList.add("success");

}