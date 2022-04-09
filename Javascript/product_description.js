var price;
var description;
var image;
// foodCounter = localStorage.getItem(`${url.get('product')}foodCounter`);
// if(foodCounter == null)
// foodCounter = 0;
let url1 = new URLSearchParams(location.search);
console.log(url1.get('product'))
foodCounter = localStorage.getItem(`${url1.get('product')}foodCounter`);


window.addEventListener('load', async() => {

    //Get parameters set in url
    let url = new URLSearchParams(location.search);
    console.log(url)
    let quantity = url.get('quantity');
    let aisle = url.get('aisle');
    let product = url.get('product');
    


    //Get necessary data from json file
    var json = await fetch("backend/product_info.json")
    .then(response => {
       return response.json();
    })
    
    price = json[aisle][product].Price;
    description = json[aisle][product].Description;
    image = json[aisle][product].image;

    //Display data
    document.getElementById("description").innerHTML = description;
    document.getElementById("product_img").src = image;
    document.getElementById("item_name").innerHTML = product;






    if(foodCounter != null){
        document.getElementById("quantity_input").value = foodCounter;
        update_input();
    }
    


  });



function update_input() {
    let quantity = document.getElementById("quantity_input").value;
    // let quantity = localStorage.getItem('foodCounter');
    foodCounter = document.getElementById("quantity_input").value;
    localStorage.setItem(`${url1.get('product')}foodCounter`, foodCounter);

    console.log(localStorage.getItem(`${url1.get('product')}foodCounter`));

    if (foodCounter < 0) { //Alert if below 0 (invalid)
        document.getElementById("price_update").style.color = "red";

    } else {
        document.getElementById("price_update").style.color = "#32CD32";

    }

    if (window.location.href.indexOf("?") == -1) {
        history.replaceState("", "", window.location.href + "?quantity=" + foodCounter) //Updates quantity parameter in url

    } else {

        if (window.location.href.indexOf("&quantity") != -1) {
            history.replaceState("", "", window.location.href.substring(0, window.location.href.indexOf("&quantity")) + "&quantity=" + foodCounter) //Updates quantity parameter in url

        } else {
            history.replaceState("", "", window.location.href + "&quantity=" + foodCounter) //Updates quantity parameter in url

        }

    }

    document.getElementById("price_update").innerHTML = "$" + foodCounter * price; //Update price


}

function check_block(){

    if(sessionStorage.getItem("bool") == "block"){

        document.getElementById("description").style.display = "block";

    }

}

function description_button(){

    if(document.getElementById("description").style.display == "none"){

        document.getElementById("description").style.display = "block";
        sessionStorage.setItem("bool", "block");
    }

    else{

        document.getElementById("description").style.display = "none";
        sessionStorage.setItem("bool", "none");
    }

}