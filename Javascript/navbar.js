//Check json for all aisles and display in nav
displayAislesNav();
check_user();


async function displayAislesNav(){
    var html= ""
    json = await fetch("backend/product_info.json")
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
    json_users = await fetch("backend/users.json")
    .then(response => {
    return response.json();
    })

    if(localStorage.getItem("LogInEmail") != null){

        var email = localStorage.getItem("LogInEmail");
        
        var shoppingCart = `
        
        <a href="Shopping Cart Page (P4).html"><button type="button" class="btn btn-primary cart_btn">
        
        <i class="fa cart_icon">&#xf07a;</i>
        <span class="badge badge-light badge_background" id="nb_items_cart">9</span>
        </button></a>`
        document.getElementById("shoppingCartSpan").innerHTML = shoppingCart;

        document.getElementById("UserDisplay").innerHTML = `<i class="far fa-user" title="`+json_users[email].firstName+` `+json_users[email].lastName+`"></i>`

    }

}

