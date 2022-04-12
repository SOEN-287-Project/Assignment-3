


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

async function validateEmail_Edit(){
  usersList = await fetch("backend/users.json")
  .then(response => {
  return response.json();
  })

  email = document.getElementById("email").value;

  var regex = /([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,6})$/;

  if(regex.test(email))
  {
      document.getElementById("validate").innerHTML="This email address is valid";
      document.getElementById("validate").style.visibility="visible";
      document.getElementById("validate").style.color="green";
      return true;
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

  <span class="btn position_right button_display_2" id = "display1" onclick="display_edit_demo_user(); editButton(event);" type="button"  aria-expanded="false" >
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
      delete data[user_email];
      $.ajax({
        type: 'POST',
        url: '../backend/signup.php',
        data: {Json:data}    
      })
    })
  test();
}

//edit user

function editButton(event){

  const parent = event.currentTarget.parentNode;
  const user_email = parent.getAttribute('id');
  console.log(parent.getAttribute('id'));

  var edit_user_div;

  fetch("../backend/users.json")
    .then(response => response.json())
    .then(data => {
          data[user_email].firstName;

  edit_user_div = `
  <div class="edit_div">
      <!-- Title -->
      <div class="edit_title">
          Edit User
      </div>
  
      <!-- Close button -->
      <span class= "edit_close" onclick="close_display_edit()">
          <i class="fas fa-window-close position_x fa-2x"></i>
      </span>
  
      <!-- User edit inputs -->
      <label class="input">   
          <div class="input_label">First Name</div>
  
      <input class="input_edit" value="${data[user_email].firstName}" type="text" name="firstname" id="firstname" placeholder="First_Name" />
      <label id="validate4" style="color: red;visibility:hidden">Invalid</label>
      </label>
  
      <!-- User edit inputs -->
      <label class="input margin_top_25">   
      <div class="input_label">Last Name</div>
  
      <input class="input_edit" value="${data[user_email].lastName}"type="text" name="lastname" id="lastname"  placeholder="Last_Name" value=""/>
      <label id="validate5" style="color: red;visibility:hidden">Invalid</label>
      </label>
  
  
      <!-- User edit inputs -->
      <label class="input margin_top_25">   
          <div class="input_label">Email Address</div>
  
      <input class="input_edit" value="${data[user_email].email}" type="text" name="email" id="email"  placeholder="example@mail.com" readonly/>
      <label id="validate" style="color: red;visibility:hidden">Invalid</label>
      </label>
  
  
      <!-- User edit inputs -->
      <label class="input margin_top_25">   
          <div class="input_label">Postal Code</div>
  
      <input class="input_edit" value="${data[user_email].postalCode}" type="text"name="postalcode" id="postalCode"  placeholder="H1G 4V6" value=""/>
      <label id="validate3" style="color: red;visibility:hidden">Invalid</label>
      </label>
  
  
      <!-- User edit inputs -->
      <label class="input margin_top_25">   
          <div class="input_label">Gender</div>
          <select name="gender" id="gender">
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
      </label>
  
      <!-- User edit inputs -->
      <label class="input margin_top_25">   
          <div class="input_label">Password</div>
  
      <input class="input_edit" value="${data[user_email].password}" type="password" name="password" id="password" placeholder="Password" value=""/>
      <label id="validate6" style="color: red;visibility:hidden">Invalid</label>
      </label>    
  
      
      <!-- Save Changes button -->
      <div class="container text-center">
          <button type="button" onclick="updateInfo()" class="btn btn-outline-primary add_aisle_btn save_btn">
               Save  <i class="far fa-save"></i>
          </button>
          
      </div>
  </div>`

  document.getElementById("edit_user_div").innerHTML = edit_user_div;
      })

}


//save edit

async function updateInfo(){

  var a= await validateEmail_Edit();
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