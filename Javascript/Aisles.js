//Get aisle from url and display all products for this aisle
displayAisle();
async function displayAisle(){
    var html="";
    let url = new URLSearchParams(location.search);
    console.log(url)
    let aisle = url.get('aisle');

    json = await fetch("backend/product_info.json")
        .then(response => {
        return response.json();
        })

    html =   `<div class="Main">
    <h3>`+aisle+`</h3>
    <div class="Projects">
    `

    var keys = Object.keys(json[aisle]);
        //For each product in aisle, add a product card
        keys.forEach(element => {
            if(element!="AisleName" && element!="AisleDisplay"){
                html+= `<div class="card">
                <p class="title"><a href="Product Description Page (P3).html?aisle=`+aisle+`&product=`+element+`">`+element+`</a></p>
                <a href="Product Description Page (P3).html?aisle=`+aisle+`&product=`+element+`"><img class="food-img" src="`+json[aisle][element].image+`" alt="`+element+`"
                /></a>
                </div>`
            }
        })


    html += `</div>
    </div>`

    document.getElementById("main").innerHTML = html;
}
