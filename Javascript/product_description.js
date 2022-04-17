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

foodCounter1 = localStorage.getItem(`foodCounter1`);     

foodCounter2 = localStorage.getItem(`foodCounter2`);     

foodCounter3 = localStorage.getItem(`foodCounter3`);     

foodCounter4 = localStorage.getItem(`foodCounter4`);     

 foodCounter5 = localStorage.getItem(`foodCounter5`);     

 foodCounter6 = localStorage.getItem(`foodCounter6`);   

 foodCounter7 = localStorage.getItem(`foodCounter7`);     

 foodCounter8 = localStorage.getItem(`foodCounter8`);     

 foodCounter9 = localStorage.getItem(`foodCounter9`);   

foodCounter10 = localStorage.getItem(`foodCounter10`);     

 foodCounter11 = localStorage.getItem(`foodCounter11`);     

 foodCounter12 = localStorage.getItem(`foodCounter12`);   

 foodCounter13 = localStorage.getItem(`foodCounter13`);     

 foodCounter14 = localStorage.getItem(`foodCounter14`);     

 foodCounter15 = localStorage.getItem(`foodCounter15`);   

 foodCounter16 = localStorage.getItem(`foodCounter16`);     

foodCounter17 = localStorage.getItem(`foodCounter17`);     

 foodCounter18 = localStorage.getItem(`foodCounter18`);   

 foodCounter19 = localStorage.getItem(`foodCounter19`);     

 foodCounter20 = localStorage.getItem(`foodCounter20`);   
        

function update_input1(){      

      var x = document.getElementById("cart-1-quantity").value;    

      var y = document.getElementById("cart-2-quantity").value;      

      var z = document.getElementById("cart-3-quantity").value;      

           var a = document.getElementById("cart-4-quantity").value;    

      var b = document.getElementById("cart-5-quantity").value;      

      var c = document.getElementById("cart-6-quantity").value;    

           var d = document.getElementById("cart-7-quantity").value;    

      var e = document.getElementById("cart-8-quantity").value;      

      var f = document.getElementById("cart-9-quantity").value;    

           var g = document.getElementById("cart-10-quantity").value;    

      var h = document.getElementById("cart-11-quantity").value;      

      var i = document.getElementById("cart-12-quantity").value;    

           var j = document.getElementById("cart-13-quantity").value;    

      var k = document.getElementById("cart-14-quantity").value;      

      var l = document.getElementById("cart-15-quantity").value;    

           var m = document.getElementById("cart-16-quantity").value;    

      var n = document.getElementById("cart-17-quantity").value;      

      var o = document.getElementById("cart-18-quantity").value;    

           var p = document.getElementById("cart-19-quantity").value;    

      var q = document.getElementById("cart-20-quantity").value;      

    var aa = (x)*1.99 + (y)*1.99 + (z)*1.99 + (a)*0.25 + (b)*3.99 + (c)*1.99 + (d)*3.99 + (e)*0.89   

    + (f)*2.99 + (g)*0.98 + (h)*0.35 + (i)*0.45 + (j)*0.15 + (k)*3.99 + (l)*0.50 + (m)*0.99 + (n)*1.99   

    + (o)*1.99 + (p)*1.85 + (q)*2.99;      

   var bb = aa * 0.1;      

  var cc = aa * 0.05;      

  var dd = aa + bb + cc;      

     let quantity1 = document.getElementById("cart-1-quantity").value;      

      let quantity2 = document.getElementById("cart-2-quantity").value;      

       let quantity3 = document.getElementById("cart-3-quantity").value;      

         let quantity4 = document.getElementById("cart-4-quantity").value;      

      let quantity5 = document.getElementById("cart-5-quantity").value;      

       let quantity6 = document.getElementById("cart-6-quantity").value;      

         let quantity7 = document.getElementById("cart-7-quantity").value;      

      let quantity8 = document.getElementById("cart-8-quantity").value;      

       let quantity9 = document.getElementById("cart-9-quantity").value;      

         let quantity10 = document.getElementById("cart-10-quantity").value;      

      let quantity11 = document.getElementById("cart-11-quantity").value;      

        let quantity12 = document.getElementById("cart-12-quantity").value;      

         let quantity13 = document.getElementById("cart-13-quantity").value;      

      let quantity14 = document.getElementById("cart-14-quantity").value;      

       let quantity15 = document.getElementById("cart-15-quantity").value;      

         let quantity16 = document.getElementById("cart-16-quantity").value;      

      let quantity17 = document.getElementById("cart-17-quantity").value;      

       let quantity18 = document.getElementById("cart-18-quantity").value;      

         let quantity19 = document.getElementById("cart-19-quantity").value;      

      let quantity20 = document.getElementById("cart-20-quantity").value;  
      
      

    foodCounter1 = document.getElementById("cart-1-quantity").value;      

  
    foodCounter2 = document.getElementById("cart-2-quantity").value;      

  
    foodCounter3 = document.getElementById("cart-3-quantity").value;      

  
        foodCounter4 = document.getElementById("cart-4-quantity").value;      

  

    foodCounter5 = document.getElementById("cart-5-quantity").value;      

  
    foodCounter6 = document.getElementById("cart-6-quantity").value;   

  
        foodCounter7 = document.getElementById("cart-7-quantity").value;      

  
    foodCounter8 = document.getElementById("cart-8-quantity").value;      

  
    foodCounter9 = document.getElementById("cart-9-quantity").value;   

  
        foodCounter10 = document.getElementById("cart-10-quantity").value;      

  

    foodCounter11 = document.getElementById("cart-11-quantity").value;      

  
    foodCounter12 = document.getElementById("cart-12-quantity").value;   

  
        foodCounter13 = document.getElementById("cart-13-quantity").value;      

  

    foodCounter14 = document.getElementById("cart-14-quantity").value;      

 
    foodCounter15 = document.getElementById("cart-15-quantity").value;   

  
        foodCounter16 = document.getElementById("cart-16-quantity").value;      

  
    foodCounter17 = document.getElementById("cart-17-quantity").value;      

  
    foodCounter18 = document.getElementById("cart-18-quantity").value;   

  
        foodCounter19 = document.getElementById("cart-19-quantity").value;      

  
    foodCounter20 = document.getElementById("cart-20-quantity").value;      

  
  

    localStorage.setItem(`foodCounter1`, foodCounter1);      


    localStorage.setItem(`foodCounter2`, foodCounter2);      

 
    localStorage.setItem(`foodCounter3`, foodCounter3);   

  
    localStorage.setItem(`foodCounter4`, foodCounter4);      


    localStorage.setItem(`foodCounter5`, foodCounter5);      

  
    localStorage.setItem(`foodCounter6`, foodCounter6);   


    localStorage.setItem(`foodCounter7`, foodCounter7);      


    localStorage.setItem(`foodCounter8`, foodCounter8);      


    localStorage.setItem(`foodCounter9`, foodCounter9);       

  
    localStorage.setItem(`foodCounter10`, foodCounter10);      


    localStorage.setItem(`foodCounter11`, foodCounter11);      


    localStorage.setItem(`foodCounter12`, foodCounter12);   


    localStorage.setItem(`foodCounter13`, foodCounter13);      


    localStorage.setItem(`foodCounter14`, foodCounter14);      


    localStorage.setItem(`foodCounter15`, foodCounter15);   


    localStorage.setItem(`foodCounter16`, foodCounter16);      


    localStorage.setItem(`foodCounter17`, foodCounter17);      


    localStorage.setItem(`foodCounter18`, foodCounter18);   


    localStorage.setItem(`foodCounter19`, foodCounter19);      

  
    localStorage.setItem(`foodCounter20`, foodCounter20);      

  

      console.log(localStorage.getItem(`foodCounter1`));      

 

    console.log(localStorage.getItem(`foodCounter2`));      

 
    console.log(localStorage.getItem(`foodCounter3`));   



    console.log(localStorage.getItem(`foodCounter4`));      

  
    console.log(localStorage.getItem(`foodCounter5`));      


    console.log(localStorage.getItem(`foodCounter6`));   

  

    console.log(localStorage.getItem(`foodCounter7`));      

  
    console.log(localStorage.getItem(`foodCounter8`));      

  
    console.log(localStorage.getItem(`foodCounter9`));   

 
    console.log(localStorage.getItem(`foodCounter10`));      

 
    console.log(localStorage.getItem(`foodCounter11`));      

  
    console.log(localStorage.getItem(`foodCounter12`));   

  
    console.log(localStorage.getItem(`foodCounter13`));      

  

    console.log(localStorage.getItem(`foodCounter14`));      

 

    console.log(localStorage.getItem(`foodCounter15`));   

  
    console.log(localStorage.getItem(`foodCounter16`));      

  
    console.log(localStorage.getItem(`foodCounter17`));      

  
    console.log(localStorage.getItem(`foodCounter18`));   

  
    console.log(localStorage.getItem(`foodCounter19`));      

  
    console.log(localStorage.getItem(`foodCounter20`));      

  
    if (window.location.href.indexOf("?") == -1) {      

        history.replaceState("", "", window.location.href + "?quantity1=" + foodCounter1  + "&quantity2=" + foodCounter2 + "&quantity3=" + foodCounter3 + "&quantity4=" + foodCounter4 + "&quantity5=" + foodCounter5   

  
        + "&quantity6=" + foodCounter6 + "&quantity7=" + foodCounter7 + "&quantity8=" + foodCounter8   

  
        + "&quantity9=" + foodCounter9 + "&quantity10=" + foodCounter10 + "&quantity11=" + foodCounter11   

  
        + "&quantity12=" + foodCounter12 + "&quantity13=" + foodCounter13 + "&quantity14=" + foodCounter14   

  
        + "&quantity15=" + foodCounter15 + "&quantity16=" + foodCounter16 + "&quantity17=" + foodCounter17   

  

        + "&quantity18=" + foodCounter18 + "&quantity19=" + foodCounter19 + "&quantity20=" + foodCounter20) //Updates quantity parameter in url      

     } else {      

             history.replaceState("", "", window.location.href.substring(0, window.location.href.indexOf("?quantity1")) + "?quantity1=" + foodCounter1  + "&quantity2=" + foodCounter2 + "&quantity3=" + foodCounter3 + "&quantity4=" + foodCounter4 + "&quantity5=" + foodCounter5 + "&quantity6=" + foodCounter6 + "&quantity7=" + foodCounter7 + "&quantity8=" + foodCounter8 + "&quantity9=" + foodCounter9 + "&quantity10=" + foodCounter10 + "&quantity11=" + foodCounter11 + "&quantity12=" + foodCounter12 + "&quantity13=" + foodCounter13 + "&quantity14=" + foodCounter14 + "&quantity15=" + foodCounter15 + "&quantity16=" + foodCounter16 + "&quantity17=" + foodCounter17 + "&quantity18=" + foodCounter18 + "&quantity19=" + foodCounter19 + "&quantity20=" + foodCounter20) //Updates quantity parameter in url      

     }      

 document.getElementById("total4").innerHTML = "$".concat(aa);       

 document.getElementById("total7").innerHTML = "$".concat(dd);      


document.getElementById("total5").innerHTML = "$".concat(bb);      

  
document.getElementById("total6").innerHTML = "$".concat(cc);      

  


  

}          
    

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

  

