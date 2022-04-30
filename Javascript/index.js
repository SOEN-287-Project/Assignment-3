document.addEventListener("DOMContentLoaded", function(){
    
    if(localStorage.getItem("LogInEmail") == null){
        document.getElementById("display_index").innerHTML = ` <button><a href="Sign_Up_Page2.html">Sign up!</a></button>
        <button id="login"><a href="Login_Page2.html">Log in</a></button>`
    }else{
        document.getElementById("display_index").innerHTML = ` <button onclick="logout()">Sign out</button>`
    }
    
});


