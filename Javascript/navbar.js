//Check json for all aisles and display in nav
displayAislesNav();
check_user();


async function displayAislesNav(){
    var html= ""
    json = await fetch("backend/product_info.json",{cache: "no-store"})
        .then(response => {
        return response.json();
        })

    var Aisles = Object.keys(json);
    Aisles.forEach(aisle => {
        html+='<li><a class="dropdown-item" href="Aisles.html?aisle='+aisle+'">'+json[aisle].AisleName+'</a></li>'
    });

    document.getElementById("aisles_nav").innerHTML = html;

}

async function check_user(){
    json_users = await fetch("backend/users.json",{cache: "no-store"})
    .then(response => {
    return response.json();
    })

    if(localStorage.getItem("LogInEmail") != null){

        var email = localStorage.getItem("LogInEmail");

        json_cart = await fetch("backend/orders.json",{cache: "no-store"})
        .then(response => {
        return response.json();
        })

        if(!(email in json_cart)){
            cart_count =0;
        }else{
            cart_count = countCartItems(email)
        }
        

        var shoppingCart = `
        
        <a href="Shopping Cart Page (P4).html"><button type="button" class="btn btn-primary cart_btn">
        
        <i class="fa cart_icon">&#xf07a;</i>
        <span class="badge badge-light badge_background" id="nb_items_cart">`+cart_count+`</span>
        </button></a>`
        document.getElementById("shoppingCartSpan").innerHTML = shoppingCart;

        document.getElementById("UserDisplay").innerHTML = `<i class="far fa-user" title="`+json_users[email].firstName+` `+json_users[email].lastName+`" onclick="logout()"></i>`

    }
}

    function logout(){
        var email = localStorage.getItem("LogInEmail");

        if(confirm("You are currently loged in as "+json_users[email].firstName+" "+json_users[email].lastName+". \nWould you like to logout?")){
            localStorage.removeItem("LogInEmail");
            location.href = "./index.html"
        }

    }

    function countCartItems(email){
        if(!("cart" in json_cart[email])){
            return 0;
        }
        
        var Aisles = Object.keys(json_cart[email].cart);
        var count = 0;

        Aisles.forEach(aisle => {
            count += Object.keys(json_cart[email]["cart"][aisle]).length;
        });
        return count;
    }



