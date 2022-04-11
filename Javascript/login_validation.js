


async function validateEmail()
{
  usersList = await fetch("backend/users.json")
  .then(response => {
  return response.json();
  })

  email = document.getElementById("email").value;

  var regex = /([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,6})$/;

  if(regex.test(email))
  {


    if(email in usersList){ //If email is already in use
      document.getElementById("validate").innerHTML="This email address is in use";
      document.getElementById("validate").style.visibility="visible";
      document.getElementById("validate").style.color="red";
      return false;
    }else{
      document.getElementById("validate").innerHTML="This email address is valid";
      document.getElementById("validate").style.visibility="visible";
      document.getElementById("validate").style.color="green";
      return true;
    }

  }
  else
  {
    document.getElementById("validate").innerHTML="This email address is invalid";
    document.getElementById("validate").style.visibility="visible";
    document.getElementById("validate").style.color="red";
    return false;

  }

}

function validatePostalCode(){
  PostalCode = document.getElementById("postalCode").value;

  var regex = /[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

  if(regex.test(PostalCode))
  {
    document.getElementById("validate3").innerHTML="This postal code is valid";
    document.getElementById("validate3").style.visibility="visible";
    document.getElementById("validate3").style.color="green";
    return true;
  }
  else
  {
    document.getElementById("validate3").innerHTML="This postal code is invalid";
    document.getElementById("validate3").style.visibility="visible";
    document.getElementById("validate3").style.color="red";
    return false;

  }
}
function validateFirstName()
{
  FirstName = document.getElementById("firstname").value;

  var regex = /[A-Za-z]$/;
  if(regex.test(FirstName))
  {
    document.getElementById("validate4").innerHTML="This first name is valid";
    document.getElementById("validate4").style.visibility="visible";
    document.getElementById("validate4").style.color="green";
    return true;
  }
  else
  {
    document.getElementById("validate4").innerHTML="This first name is invalid";
    document.getElementById("validate4").style.visibility="visible";
    document.getElementById("validate4").style.color="red";
    return false;
}
}
function validateLastName()
{
  LastName = document.getElementById("lastname").value;

  var regex = /[A-Za-z]$/;
  if(regex.test(LastName))
  {
    document.getElementById("validate5").innerHTML="This last name is valid";
    document.getElementById("validate5").style.visibility="visible";
    document.getElementById("validate5").style.color="green";
    return true;
  }
  else
  {
    document.getElementById("validate5").innerHTML="This last name is invalid";
    document.getElementById("validate5").style.visibility="visible";
    document.getElementById("validate5").style.color="red";
    return false;
}

}

function validatePassword(){
  PassWord = document.getElementById("password").value;
  if(PassWord == ""){
    document.getElementById("validate6").innerHTML="PassWord cannot be left empty";
    document.getElementById("validate6").style.visibility="visible";
    document.getElementById("validate6").style.color="red";
    return false;
  }else{
    document.getElementById("validate6").innerHTML="This password is valid";
    document.getElementById("validate6").style.visibility="visible";
    document.getElementById("validate6").style.color="green";
    return true;
  }
}

function passwordMatch()
{
 var newPass = document.getElementById("newPassword").value;
 var repeat = document.getElementById("re-enter").value;

 if(newPass==repeat)
 {
  document.getElementById("validate2").innerHTML="The passwords have matched successfully";
  document.getElementById("validate2").style.visibility="visible";
  document.getElementById("validate2").style.color="green";
 }
 else
 {
  document.getElementById("validate2").innerHTML="The passwords do not match. Try again";
  document.getElementById("validate2").style.visibility="visible";
  document.getElementById("validate2").style.color="red";
 }
}

async function checkIfValid(){

  var a= await validateEmail();
  var b = validatePostalCode();
  var c = validateFirstName();
  var d = validateLastName();
  var e = validatePassword();
  console.log(a)
  

  if(a && b && c && d && e){

    //Add to usersList object
    usersList[email] = {"password":PassWord,
    "firstName": FirstName,
    "lastName":LastName,
    "postalCode":PostalCode,
    "email": email};


    console.log(usersList[email]);


    $.ajax({
      type: 'POST',
      url: 'backend/signup.php',
      data: {Json:usersList}    

    })
    .done( function( data ) {

        console.log("User added to server.");


    })
    .fail( function( data ) {
        console.log("Attempted to add user to server and failed.");

    });
  }else{
    test();
    return;
  }
  test();
  
   
}


//adds user to list
function test(){
  fetch("../backend/users.json")
    .then(response => response.json())
    .then(data => {
      document.getElementById("user_container").innerHTML = "";
      for(var key in data){
        addUserToList(data[key]);
        // console.log(data[key]);
      }
    })
}


function addUserToList(usersList){
  var test_html = `<div class="container  order_color" id="${usersList.email}">
  <i class="far fa-user"></i>
  ${usersList.firstName + " " + usersList.lastName}

  
  <button id = "display1" onclick="deleteUser(event)" class="btn position_right button_display_2" type="button">
      <i class="far fa-times-circle"></i>
  </button>

  <span class="btn position_right button_display_2" id = "display1" onclick="display_edit_demo_user()" type="button"  aria-expanded="false" >
      <i class="far fa-edit"></i>
  </span>
</div>`


document.getElementById("user_container").innerHTML += test_html;
}


//delete user
function deleteUser(event){

  const parent = event.currentTarget.parentNode;
  const user_email = parent.getAttribute('id');
  console.log(parent.getAttribute('id'));

  fetch("../backend/users.json")
    .then(response => response.json())
    .then(data => {
      document.getElementById("user_container").innerHTML = " ";
      for(var key in data){
        if(data[key].email == user_email){
          console.log(data[key].email +" deleted!");
          delete data[key];
        }
      }
    })

}