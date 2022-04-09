//Check json for all aisles and display in nav
displayAislesNav();
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

