usersHTML();
async function usersHTML(){
    //Fetch info from json file
    json = await fetch("backend/users.json")
    .then(response => {
    return response.json();
    })
    console.log(json)
    var Emails = Object.keys(json);


    Emails.forEach(element => getUsersAndDisplay(element));

}

function getUsersAndDisplay(email){

    
    
    var UserName = json[email].firstName + " " + json[email].lastName;

    //Check json for aisle names and display in rectangular card
    Html = `    <div class="container  order_color">
    <i class="far fa-user"></i>
    `+UserName+`
    <button id = "display1" class="btn position_right button_display_2" type="button" onclick="deleteUser('`+email+`')">
        <i class="far fa-times-circle close_btn2"></i>
    </button>

    <span class="btn position_right button_display_2" id = "display1" onclick="edit_user('`+email+`')" type="button"  aria-expanded="false" >
        <i class="far fa-edit edit_btn2"></i>
    </span>

</div>`;
    document.getElementById("displayUsers").innerHTML += Html;


}

//Edit button display
function edit_user(email){
    edit_html = `
    <div class="edit_div">
    
        <!-- Title -->
        <div class="edit_title">
            Edit User
        </div>
    
        <!-- Close button -->
        <span class= "edit_close" onclick="close_display_edit()">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>
    
        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Email</div>
    
        <input class="input_edit" type="text" id="emailEdit" placeholder="" value="`+email+`"/>
        </label>

        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Password</div>
    
        <input class="input_edit" type="text" id="passwordEdit" placeholder="" value="`+json[email].password+`"/>
        </label>

        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">First Name</div>
    
        <input class="input_edit" type="text" id="firstNameEdit" placeholder="" value="`+json[email].firstName+`"/>
        </label>

        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Last Name</div>
    
        <input class="input_edit" type="text" id="lastNameEdit" placeholder="" value="`+json[email].lastName+`"/>
        </label>

        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Postal Code</div>
    
        <input class="input_edit" type="text" id="postalCodeEdit" placeholder="" value="`+json[email].postalCode+`"/>
        </label>
    

    
        
        <!-- Save Changes button -->
        <div class="container text-center">
            <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="save_edit_user('`+email+`')">
                 Save  <i class="far fa-save"></i>
            </button>
            
        </div>
    </div>`

    document.getElementById("edit_div").innerHTML = edit_html;

}

function deleteUser(email){
    var UserName = json[email].firstName + " " + json[email].lastName;

    if (confirm('Are you sure you want to delete this user: '+UserName+'?')) {

        delete json[email]; //Delete aisle
        $.ajax({
            type: 'POST',
            url: 'backend/signup.php',
            data: {Json:json}    
    
        })
        .done( function( data ) {

            check_display_backend();
            alert("User deleted successfully.");


        })
        .fail( function( data ) {

            check_display_backend();
            alert("User delete failed.");

        });
    }
}

function save_edit_user(email){

    if(document.getElementById("emailEdit").value == ""){
        alert("Cannot leave leave email empty. Please try again.");
        return;
    }
    document.getElementById("emailEdit").style.color = "black";

    if(document.getElementById("passwordEdit").value == ""){
        alert("Cannot leave Password empty. Please try again.");
        return;
    }

    if(document.getElementById("firstNameEdit").value == ""){
        alert("Cannot leave First Name empty. Please try again.");
        return;
    }

    if(document.getElementById("lastNameEdit").value == ""){
        alert("Cannot leave Last Name empty. Please try again.");
        return;
    }

    
    if(document.getElementById("postalCodeEdit").value == ""){
        alert("Cannot leave Postal Code empty. Please try again.");
        return;
    }

    json[email] = {};
    json[email].password = document.getElementById("passwordEdit").value;
    json[email].firstName = document.getElementById("firstNameEdit").value;
    json[email].lastName = document.getElementById("lastNameEdit").value;
    json[email].postalCode = document.getElementById("postalCodeEdit").value;


    $.ajax({
        type: 'POST',
        url: 'backend/signup.php',
        data: {Json:json}    

    })
    .done( function( data ) {

        check_display_backend();
        alert("User edited successfully.");


    })
    .fail( function( data ) {

        check_display_backend();
        alert("User edit failed.");

    });

}

function add_user(){
    edit_html = `
    <div class="edit_div">
    
        <!-- Title -->
        <div class="edit_title">
            Edit User
        </div>
    
        <!-- Close button -->
        <span class= "edit_close" onclick="close_display_edit()">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>
    
        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Email</div>
    
        <input class="input_edit" type="text" id="emailEdit" placeholder="" value=""/>
        </label>

        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Password</div>
    
        <input class="input_edit" type="text" id="passwordEdit" placeholder="" value=""/>
        </label>

        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">First Name</div>
    
        <input class="input_edit" type="text" id="firstNameEdit" placeholder="" value=""/>
        </label>

        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Last Name</div>
    
        <input class="input_edit" type="text" id="lastNameEdit" placeholder="" value=""/>
        </label>

        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Postal Code</div>
    
        <input class="input_edit" type="text" id="postalCodeEdit" placeholder="" value=""/>
        </label>
    

    
        
        <!-- Save Changes button -->
        <div class="container text-center">
            <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="save_add_user()">
                 Add user  <i class="far fa-save"></i>
            </button>
            
        </div>
    </div>`

    document.getElementById("edit_div").innerHTML = edit_html;
}


function save_add_user(){

    if(document.getElementById("emailEdit").value in json){
        alert("Email already in use. Please enter another one.");
        return;
    }
    

    if(document.getElementById("emailEdit").value == ""){
        alert("Cannot leave leave email empty. Please try again.");
        return;
    }

    if(document.getElementById("passwordEdit").value == ""){
        alert("Cannot leave Password empty. Please t    ry again.");
        return;
    }

    if(document.getElementById("firstNameEdit").value == ""){
        alert("Cannot leave First Name empty. Please try again.");
        return;
    }

    if(document.getElementById("lastNameEdit").value == ""){
        alert("Cannot leave Last Name empty. Please try again.");
        return;
    }

    
    if(document.getElementById("postalCodeEdit").value == ""){
        alert("Cannot leave Postal Code empty. Please try again.");
        return;
    }

    var email = document.getElementById("emailEdit").value;

    json[email] = {};
    json[email].password = document.getElementById("passwordEdit").value;
    json[email].firstName = document.getElementById("firstNameEdit").value;
    json[email].lastName = document.getElementById("lastNameEdit").value;
    json[email].postalCode = document.getElementById("postalCodeEdit").value;


    $.ajax({
        type: 'POST',
        url: 'backend/signup.php',
        data: {Json:json}    

    })
    .done( function( data ) {

        check_display_backend();
        alert("User edited successfully.");


    })
    .fail( function( data ) {

        check_display_backend();
        alert("User edit failed.");

    });

}
