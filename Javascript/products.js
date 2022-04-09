
productHTML(); //Displays all aisles and html for collapseables

function deleteAisle(aisle){
    if (confirm('Are you sure you want to delete this aisle: '+aisle+'?')) {

        delete json[aisle]; //Delete aisle
        $.ajax({
            type: 'POST',
            url: 'backend/product_edit.php',
            data: {Json:json}    
    
        })
        .done( function( data ) {

            check_display_backend();
            $("#navbar").load("Components/navbar.html"); 
            alert("Aisle deleted successfully.");


        })
        .fail( function( data ) {

            check_display_backend();
            $("#navbar").load("Components/navbar.html"); 
            alert("Aisle delete failed.");

        });
    }
}

//Edit button display
function edit_product(aisle,product){
    edit_html = `<!-- This div is displayed when edit button under "products" items clicked  -->
    <div class="edit_div">
    
        <!-- Title -->
        <div class="edit_title">
            Edit Product
        </div>
    
        <!-- Close button -->
        <span class= "edit_close" onclick="close_display_edit()">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>
    
        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Product Name</div>
    
        <input class="input_edit" type="text" id="productName" placeholder="" value="`+product+`"/>
        </label>
    
        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
        <div class="input_label">Aisle</div>
    
        <input class="input_edit" type="text" id="aisleName" list="suggestions" placeholder="" value="`+aisle+`"/>`
        +suggestions+
        `</label>
    
    
        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
            <div class="input_label">Product Price</div>
    
        <input class="input_edit" type="text" id="productPrice" placeholder="" value="`+json[aisle][product].Price+`"/>
        </label>
    
    
        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
            <div class="input_label">Product Description</div>
    
        <textarea class="input_edit" id="productDescription">`+json[aisle][product].Description+`</textarea>
        </label>

        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
            <div class="input_label">Image path/url</div>
    
        <textarea class="input_edit" id="productImgPath">`+json[aisle][product].image+`</textarea>
        </label>
    
        
        <!-- Save Changes button -->
        <div class="container text-center">
            <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="save_edit_product('`+aisle+`','`+product+`')">
                 Save  <i class="far fa-save"></i>
            </button>
            
        </div>
    </div>`

    document.getElementById("edit_div").innerHTML = edit_html;

}


//Add aisle button display
function add_aisle(newAisle){
    if(newAisle == ""){
        var fct = "save_aisle(true)"
    }else{
        var fct = "save_aisle(false)"
    }
    aisle_html = `<!-- This div is displayed when edit button under "products" items clicked  -->
    <div class="edit_div bg_edit_aisle">
    
        <!-- Title -->
        <div class="edit_title">
            Add Aisle
        </div>
    
        <!-- Close button -->
        <span class= "edit_close" onclick="close_add_aisle()">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>
    
        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
        <div class="input_label">Aisle Name</div>
    
        <textarea class="input_edit" type="text" id="aisleName" placeholder="(Spaces permitted - displayed in navbar)" value=""/>`+newAisle+`</textarea>

        </label>
    
    
        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
            <div class="input_label">Aisle Display</div>

            <textarea rows="4" class="input_edit" id="aisleDisplay" placeholder="(How aisles are displayed in backend - can be html; ex: <i class= fas fa-apple-alt></i>Fruits and Vegetables<i class=fas fa-carrot></i>)"></textarea>

        </label>
    
    
        
        <!-- Save Changes button -->
        <div class="container text-center">
            <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="`+fct+`">
                 Save  <i class="far fa-save"></i>
            </button>
            
        </div>
    </div>`

    document.getElementById("edit_aisle").innerHTML = aisle_html;
}

//Aisle save button
function save_aisle(reload){

    if(document.getElementById("aisleName").value == ""){
        alert("Cannot leave aisle name empty. Please try again.");
        return;
    }


    if(document.getElementById("aisleDisplay").value == ""){
        alert("Cannot leave aisle display empty. Please try again.");
        return;
    }

    var aisleKey = document.getElementById("aisleName").value;
    var Display = document.getElementById("aisleDisplay").value;
    console.log(aisleKey)

    if(aisleKey in json){
        document.getElementById("aisleName").style.color = "red";
        alert("Aisle already exists.");
        return;
    }else{
        json[aisleKey] = {};
        json[aisleKey].AisleName = aisleKey;
        json[aisleKey].AisleDisplay = Display;
        console.log(json)
    }

    $.ajax({
        type: 'POST',
        url: 'backend/product_edit.php',
        data: {Json:json}    
  
    })
    .done( function( data ) {
        if(reload){
            check_display_backend();
            $("#navbar").load("Components/navbar.html"); 
            close_add_aisle();
        }
        alert("Aisle added successfully.");


    })
    .fail( function( data ) {
        if(reload){
            check_display_backend();
            $("#navbar").load("Components/navbar.html"); 
            close_add_aisle();
        }
        alert("Aisle add failed.");

    });



}

function deleteProduct(aisle,product){
    if (confirm('Are you sure you want to delete '+product+' from '+aisle)) {
        delete json[aisle][product]; //Delete product from aisle

        $.ajax({
            type: 'POST',
            url: 'backend/product_edit.php',
            data: {Json:json}    
      
        })
        .done( function( data ) {
    
            check_display_backend();
            $("#navbar").load("Components/navbar.html"); 
            alert("Product removal succeeded.");
    
    
        })
        .fail( function( data ) {
    
            check_display_backend();
            $("#navbar").load("Components/navbar.html"); 
            alert("Product removal failed.");
    
        });
      }

}

async function save_edit_product(aisle,product){

    //Check if price is correct (above 0 and a number)
    if(isNaN(document.getElementById("productPrice").value)||document.getElementById("productPrice").value<0 || document.getElementById("productPrice").value == ""){
        document.getElementById("productPrice").style.color = "red";
        alert("Incorrect product price. Please try again.");
        return;
    }
    document.getElementById("productPrice").style.color = "black";

    if(document.getElementById("productName").value == ""){
        alert("Cannot leave product name empty. Please try again.");
        return;
    }

    if(document.getElementById("aisleName").value == ""){
        alert("Cannot leave aisle name empty. Please try again.");
        return;
    }

    if(document.getElementById("productDescription").value == ""){
        alert("Cannot leave product description empty. Please try again.");
        return;
    }

    
    if(document.getElementById("productImgPath").value == ""){
        alert("Cannot leave image path empty. Please try again.");
        return;
    }

    

    await $.get(document.getElementById("productImgPath").value)
    .done(function() { 
        document.getElementById("productImgPath").style.color = "black";
        console.log("image exists");
        //Image exists

    }).fail(function() { 
        // Image doesn't exist
        document.getElementById("productImgPath").style.color = "red";
        alert("Incorrect image path/url. Please try again.");
        return;
    })




    var newAisle = document.getElementById("aisleName").value;
    var newProduct = document.getElementById("productName").value;
    //if all the same
    if(document.getElementById("aisleName").value == aisle && document.getElementById("productName").value == product 
    && json[newAisle][newProduct].Price == document.getElementById("productPrice").value && json[newAisle][newProduct].Description == document.getElementById("productDescription").value
    && json[newAisle][newProduct].image == document.getElementById("productImgPath").value){
        console.log("no change")
        alert("No values have been changed.");
        return;

    }else if(document.getElementById("aisleName").value != aisle){ //If aisle changed
        console.log("aisle changed")


        if(!(newAisle in json)){
            console.log("creating new aisle")
            alert("Non-existant aisle. Please create a new one.");
            add_aisle(newAisle);
            return;
        }else{

            delete json[aisle][product]; //Delete product from aisle
            console.log("adding product to diff existing aisle")

            json[newAisle][newProduct]={};
            json[newAisle][newProduct].Price = document.getElementById("productPrice").value; //Add product details to aisle and change aisle
            json[newAisle][newProduct].Description = document.getElementById("productDescription").value; 
            json[newAisle][newProduct].image = document.getElementById("productImgPath").value; 

            console.log(json)
        }




    }
    else if(document.getElementById("productName").value != product){ //Same aisle
        delete json[aisle][product]; //Delete product from aisle
        console.log("product name changed")
        
        json[newAisle][newProduct]={};
        json[newAisle][newProduct].Price = document.getElementById("productPrice").value; //Add product details to same aisle
        json[newAisle][newProduct].Description = document.getElementById("productDescription").value; 
        json[newAisle][newProduct].image = document.getElementById("productImgPath").value; 
        console.log(json)

    
    }else{ //Same aisle, same product
        console.log("same aisle, same product")

        json[newAisle][newProduct].Price = document.getElementById("productPrice").value; //Add product details to same aisle
        json[newAisle][newProduct].Description = document.getElementById("productDescription").value; 
        json[newAisle][newProduct].image = document.getElementById("productImgPath").value; 
        console.log(json)

    }




    
    $.ajax({
        type: 'POST',
        url: 'backend/product_edit.php',
        data: {Json:json}    
  
    })
    .done( function( data ) {

        check_display_backend();
        close_display_edit();
        $("#navbar").load("Components/navbar.html"); 
        alert("Product edit succeeded.");


    })
    .fail( function( data ) {

        check_display_backend();
        close_display_edit();
        $("#navbar").load("Components/navbar.html"); 
        alert("Product edit failed.");

    });
}


//Display add product card
function add_product_div(aisle){
    edit_html = `<!-- This div is displayed when edit button under "products" items clicked  -->
    <div class="edit_div">
    
        <!-- Title -->
        <div class="edit_title">
            Add Product
        </div>
    
        <!-- Close button -->
        <span class= "edit_close" onclick="close_display_edit()">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>
    
        <!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">Product Name</div>
    
        <input class="input_edit" type="text" id="productName" placeholder="" value=""/>
        </label>
    
        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
        <div class="input_label">Aisle</div>
    
        <input class="input_edit" type="text" id="aisleName" placeholder="" readonly value="`+aisle+`"/>
        
        </label>
    
    
        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
            <div class="input_label">Product Price</div>
    
        <input class="input_edit" type="text" id="productPrice" placeholder="" value=""/>
        </label>
    
    
        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
            <div class="input_label">Product Description</div>
    
        <textarea class="input_edit" id="productDescription"></textarea>
        </label>

        <!-- Product edit inputs -->
        <label class="input margin_top_25">   
            <div class="input_label">Image path/url</div>
    
        <textarea class="input_edit" id="productImgPath"></textarea>
        </label>
    
        
        <!-- Save Changes button -->
        <div class="container text-center">
            <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="save_add_product('`+aisle+`')">
                 Save  <i class="far fa-save"></i>
            </button>
            
        </div>
    </div>`

    document.getElementById("edit_div").innerHTML = edit_html;
}

async function save_add_product(aisle){
    
    if(isNaN(document.getElementById("productPrice").value)||document.getElementById("productPrice").value<0 || document.getElementById("productPrice").value == ""){
        document.getElementById("productPrice").style.color = "red";
        alert("Incorrect product price. Please try again.");
        return;
    }
    document.getElementById("productPrice").style.color = "black";


    if(document.getElementById("productName").value == ""){
        alert("Cannot leave product name empty. Please try again.");
        return;
    }


    if(document.getElementById("productDescription").value == ""){
        alert("Cannot leave product description empty. Please try again.");
        return;
    }

    
    if(document.getElementById("productImgPath").value == ""){
        alert("Cannot leave image path empty. Please try again.");
        return;
    }

    await $.get(document.getElementById("productImgPath").value)
    .done(function() { 
        document.getElementById("productImgPath").style.color = "black";
        console.log("image exists");
        //Image exists

    }).fail(function() { 
        // Image doesn't exist
        document.getElementById("productImgPath").style.color = "red";
        alert("Incorrect image path/url. Please try again.");
        return;
    })

    var newProduct = document.getElementById("productName").value;

    json[aisle][newProduct]={};
    json[aisle][newProduct].Price = document.getElementById("productPrice").value; //Add product details to same aisle
    json[aisle][newProduct].Description = document.getElementById("productDescription").value; 
    json[aisle][newProduct].image = document.getElementById("productImgPath").value; 

    $.ajax({
        type: 'POST',
        url: 'backend/product_edit.php',
        data: {Json:json}    
  
    })
    .done( function( data ) {

        check_display_backend();
        close_display_edit();
        $("#navbar").load("Components/navbar.html"); 
        alert("Product add succeeded.");


    })
    .fail( function( data ) {

        check_display_backend();
        close_display_edit();
        $("#navbar").load("Components/navbar.html"); 
        alert("Product add failed.");

    });


}


async function productHTML(){
    //Fetch info from json file
    json = await fetch("backend/product_info.json")
    .then(response => {
    return response.json();
    })
    console.log(json)
    var Aisles = Object.keys(json);

    //Suggestions used for edit div (suggest all the aisle)
    suggestions = `<datalist id="suggestions">`
    //Get aisles
    Aisles.forEach(element => getProductsFromAisle(element));
    suggestions+= `</datalist>`
}

function getProductsFromAisle(aisle){
    suggestions += `<option value="`+aisle+`">`

    
    AisleID = aisle;
    
    AisleDisplay = json[aisle].AisleDisplay;

    //Check json for aisle names and display in rectangular card
    AisleCard = `<div class="container"> 
    <div class="container table_display center_horiz" onclick="document.getElementById('btn_`+AisleID+`').click();">
        <button id = "btn_`+AisleID+`" class="btn position_right button_display" type="button" data-parent="#Product_`+AisleID+`" data-toggle="collapse" data-target=".collapseable`+AisleID+`" aria-expanded="false" aria-controls="collapseable`+AisleID+`">
            <i class="fas fa-chevron-circle-down"></i>
        </button>

        <button id = "" class="btn position_right trash_display" type="button" onclick="deleteAisle('`+AisleID+`')">
        <i class="fa fa-trash" aria-hidden="true"></i>
        
        </button>

        <div class="center_vertical">
        `+AisleDisplay+`
        </div>
    </div>
    </div>`;
    document.getElementById("displayProducts").innerHTML += AisleCard;


    content="";
    productName="";
    var keys = Object.keys(json[aisle]);
    //For each product in aisle, add a product card
    keys.forEach(element => {
        if(element!="AisleName" && element!="AisleDisplay"){
            productName = element;
            
            productCard = `<div class="margin-20 product_div collapse collapseable`+AisleID+`">
            <span class="close_btn" onclick="deleteProduct('`+AisleID+`','`+productName+`')">
                <i class="far fa-times-circle"></i>
            </span>
            <span class="edit_btn" onclick="edit_product('`+AisleID+`','`+productName+`')">
                <i class="far fa-edit"></i>
            </span>
            <span class= "product_text">`+productName+`</span>
            </div>`;

            content += productCard;
            console.log(element);
        }
    });

    //For each aisle, place product cards in a collapseable
    collapseableProducts = `<div class="container" id="Product`+AisleID+`">`+content+`
    <div class="container collapse text-center collapseable`+AisleID+`">
        <button class="add_product_btn" onclick="add_product_div('`+AisleID+`')">
            <i class="fas fa-plus-circle"></i>
        </button>
    </div>
    </div>`;

    document.getElementById("displayProducts").innerHTML += collapseableProducts;

    
}





