//Check value of #selectBackend and serve corresponding html
function check_display_backend(){
    if(localStorage.getItem("LogInEmail") != "Admin"){
        alert("You are not logged in as Admin Account!\n Try connecting with Email: Admin, Password: Admin")
        window.location.href = "index.html";
        return;
    }

    var choice = document.getElementById("selectBackend").value;
    if (choice == "products"){
        $( "#backend_display" ).load( "backend/products.html" );

    }else if(choice == "orders"){
        $( "#backend_display" ).load( "backend/orders.html" );

    }else if(choice == "users"){
        $( "#backend_display" ).load( "backend/users.html" );

    }
}


function display_edit_demo_orders(){
    $( "#edit_div" ).load( "backend/edit_div_orders.html" );
}

function display_edit_demo_user(){
    $( "#edit_div" ).load( "backend/edit_div_users.html" );
}

function display_add_demo_user(){
    $( "#edit_div" ).load( "./backend/add_div_users.html" );
}

function close_display_edit(){
    document.getElementById("edit_div").innerHTML = ""
}

function close_add_aisle(){
    document.getElementById("edit_aisle").innerHTML = ""

}


