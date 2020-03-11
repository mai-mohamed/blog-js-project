 //fields decalration
 loginForm = document.getElementById("loginForm");
 mailValidate =document.getElementById("mailValidate");
 passwordValidate = document.getElementById("passwordValidate");

 //fields events
 loginForm.email.addEventListener("keydown",validateMail);
 loginForm.password.addEventListener("keydown",validatePassword);
 loginForm.addEventListener("submit",loginSubmit);

 //regex pattern
 var regexEmail =/^[a-zA-z0-9_]{1,}[.,-]?[a-zA-z0-9_]{1,}@[0-9A-Za-z]{1,}\.[0-9A-Za-z]{2,6}$/
 var regexPassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_$#&]{7}$/
 
 //email validator function
 function validateMail(){
   if(regexEmail.test(loginForm.email.value) == true){
     mailValidate.innerHTML="valid email";
     mailValidate.style.color="green";
   }
   else if(loginForm.email.value==""){
     mailValidate.innerHTML="required";
   }
   else{
     mailValidate.innerHTML="invalid email";
     mailValidate.style.color="red"
   }
 }

 //password validator function
 function validatePassword(){
  if(regexPassword.test(loginForm.password.value)==true){
   passwordValidate.innerHTML="valid password";
   passwordValidate.style.color="green";
  }
  else if(loginForm.password.value==""){
   passwordValidate.innerHTML="required";
  }
  else{
   passwordValidate.innerHTML="invalid password"
   passwordValidate.style.color="red"
  }
 }
 //submit login form
 function loginSubmit(e){
   e.preventDefault();
   if(regexPassword.test(loginForm.password.value)==true || regexEmail.test(loginForm.email.value)==true){
    window.location.href="dashboard.html";
   }
   else{
     alert("please enter valid data")
   }
 }