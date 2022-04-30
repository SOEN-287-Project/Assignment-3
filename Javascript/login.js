async function validateEmail_Login()
{
  usersList = await fetch("backend/users.json",{cache: "no-store"})
  .then(response => {
  return response.json();
  })

  email = document.getElementById("email").value;

  var regex = /([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,6})$/;

  if(regex.test(email))
  {


    if(email in usersList){ //Email is associated with an account
      document.getElementById("validate").innerHTML="Email is associated with an account";
      document.getElementById("validate").style.visibility="visible";
      document.getElementById("validate").style.color="green";
      return [true, email];
    }else{
      document.getElementById("validate").innerHTML="No account associated with this email!";
      document.getElementById("validate").style.visibility="visible";
      document.getElementById("validate").style.color="red";
      return false;
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

async function validatePassword_Login(email){
    usersList = await fetch("backend/users.json",{cache: "no-store"})
    .then(response => {
    return response.json();
    })
    console.log(email);

    PassWord = document.getElementById("password").value;
    if(PassWord == ""){
      document.getElementById("validate6").innerHTML="PassWord cannot be left empty";
      document.getElementById("validate6").style.visibility="visible";
      document.getElementById("validate6").style.color="red";
      return false;
    }else{
    
        if(PassWord == usersList[email].password){
            document.getElementById("validate6").innerHTML="This password is valid";
            document.getElementById("validate6").style.visibility="visible";
            document.getElementById("validate6").style.color="green";
            return true;
        }
        else{
            document.getElementById("validate6").innerHTML="Invalid Password";
            document.getElementById("validate6").style.visibility="visible";
            document.getElementById("validate6").style.color="red";
            return false;
        }

    }
  }

async function checkIfValid_Login(){
    var email = document.getElementById("email").value;
    if(email == "Admin"){
      document.getElementById("validate").innerHTML="Connecting to Admin Account";
      document.getElementById("validate").style.visibility="visible";
      document.getElementById("validate").style.color="green";

      var b = await validatePassword_Login(email);
      
      if(b){
        alert("Admin successfully Connected!")
        localStorage.setItem("LogInEmail","Admin")
        window.location.href = "backend.html";
      }

    }else{
        var a= await validateEmail_Login();
        if(a){
            var b = await validatePassword_Login(a[1]);
        }
      
        if(a[0] && b){
            alert(`User ${a[1]}, successfuly logged in!`)
            localStorage.setItem("LogInEmail",email)
            window.location.href = "Aisles.html?aisle=FruitsAndVegetables";
    
            
        }
        else{
            console.log("Either email or password is wrong!")
        }
    }



    
     
  }
  