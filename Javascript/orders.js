display_orders();
select_products();
select_users();
async function select_products(){
    prod_select = "  <select name='product' id='products_select'>";
    json_products = await fetch("backend/product_info.json").then(response => {
        return response.json();
        });

    for(var aisle in json_products){
        prod_select += "<optgroup label='"+aisle+"'>"
        for(var product in json_products[aisle]){
            if(product == "AisleName" || product == "AisleDisplay"){
                continue;
            }else{
                prod_select += "<option value='"+aisle+"_"+product+"'>"+product+"</option>"
            }
        }
        prod_select += "</optgroup>"
    }
    prod_select += "</select>";
}

async function select_users(){
    users_select = "<select name='users' id='users_select'>"
    json_users = await fetch("backend/users.json").then(response => {
        return response.json();
        });
    for(var email in json_users){
        users_select += "<option value='"+email+"'>"+json_users[email].firstName+" "+json_users[email].lastName+"</option>"

    }
    users_select += "</select>";
}

async function display_orders(){
    json = await fetch("backend/orders.json").then(response => {
        return response.json();
        });
    json_users = await fetch("backend/users.json").then(response => {
        return response.json();
        });
    
    

    for(var email in json){
        if(email == "IdCount"){
            continue;
        }
        for(var order in json[email]){
            if(order == "cart"){ //Skip cart
                continue;
            }else{
                var OrderId;
                var OrderString = "";
                var name = json_users[email]["firstName"] + " " + json_users[email]["lastName"];
                for(var aisle in json[email][order]){
                    if(aisle == "OrderId"){
                        OrderId = json[email][order][aisle];
                    }else{
                        for(var item in json[email][order][aisle]){
                            OrderString+= (" "+ item + ": " + json[email][order][aisle][item]+";");
                        }
                    }
                }

                var html = `<div class="container order_color" onclick="document.getElementById('display` + OrderId+ `').click();">
                <i class="far fa-user"></i>
                ` + name+ `
                <button id = "display` + OrderId+ `" class="btn position_right button_display_2" type="button" data-toggle="collapse" data-target="#collapseable` + OrderId+ `" aria-expanded="false" aria-controls="collapseable` + OrderId+ `">
                    <i class="fas fa-chevron-circle-down"></i>
                </button>
                <div class="container">
                    Order ID: #` + OrderId+ `
                    
                </div>
            
            
            
            </div>
            
                <!-- Display order info -->
            <div class="container">
            
                <div class="margin-20 product_div collapse" id="collapseable` + OrderId+ `">
                    <span class="close_btn" onclick="delete_order('` + email+ `','` + order+ `')">
                        <i class="far fa-times-circle"></i>
                    </span>
                
                    <span class="edit_btn" onclick="edit_orders('` + email+ `','` + order+ `')">
                        <i class="far fa-edit"></i>
                    </span>
                    <span class= "product_text">` + OrderString+ `</span>
                
            
                
                
                </div>
            
            
            </div>
            
            `
            document.getElementById("OrdersSpan").innerHTML += html;


            }
        }
    }
}

function edit_orders(email, order){

    var edit_html = `
    <div class="edit_div">
    
        <!-- Title -->
        <div class="edit_title">
            Edit Order
        </div>
    
        <!-- Close button -->
        <span class= "edit_close" onclick="close_display_edit();check_display_backend();">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>
        `

    for(var aisle in json[email][order]){
        if(aisle == "OrderId"){
            continue;
        }else{
            for(var item in json[email][order][aisle]){
                edit_html += `<!-- Product edit inputs -->
                <label class="input">   
                    <div class="input_label">`+item+`</div>
            
                <input class="input_edit" type="number" min="0" id="`+aisle+`_`+item+`" placeholder="" value="`+json[email][order][aisle][item]+`"/>
                </label>
                `
            }
        }
    }
    

    
    edit_html += `
    <div id="add_product_div">
    </div>
    <div class="container text-center">
    <button class="add_product_btn" onclick="add_product_order('` + email+ `','` + order+ `')">
        <i class="fas fa-plus-circle"></i>
    </button>
    </div>
        <!-- Save Changes button -->
        <div class="container text-center">
            <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="save_edit_user('` + email+ `','` + order+ `')">
                 Save  <i class="far fa-save"></i>
            </button>
            
        </div>
    </div>`

    document.getElementById("edit_div").innerHTML = edit_html;

}

function add_product_order(email,order){

    var add_html = `
    <div class="edit_div bg_edit_aisle">
        <div class="edit_title">
            Add Product and Quantity
        </div>
        
        <div class="edit_select">

        `
        +prod_select+
        `
        </div>

        <div class="text-center qty_order">
            Qty: <input type="number" class= "input_qty" id="quantity" name="quantity"
            min="0">
        </div>


        <!-- Close button -->
        <span class= "edit_close" onclick="close_add_aisle()">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>

        <!-- Save Changes button -->
        <div class="container text-center">
            <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="save_product_quantity('` + email+ `','` + order+ `')">
                 Save  <i class="far fa-save"></i>
            </button>
            
        </div>


    </div>
    `
    document.getElementById("edit_aisle").innerHTML = add_html;


}

function save_product_quantity(email,order){
    var value = document.getElementById("products_select").value;
    var aisle = value.substring(0,value.indexOf("_"));
    var quantity = document.getElementById("quantity").value;
    var product =  value.substring(value.indexOf("_")+1);

    if(quantity < 1){
        alert("Please enter a quantity above 0.");
        document.getElementById("quantity").focus();
        return;
    }

    if(!(aisle in json[email][order])){
        json[email][order][aisle] = {};
    }
    json[email][order][aisle][product] = quantity;

    console.log(json)
    if(document.getElementById(aisle+"_"+product)){
        document.getElementById(aisle+"_"+product).value = json[email][order][aisle][product];
    }else{
        document.getElementById("add_product_div").innerHTML += `<!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">`+product+`</div>
    
        <input class="input_edit" type="number" min="0" id="`+aisle+`_`+product+`" placeholder="" value="`+json[email][order][aisle][product]+`"/>
        </label>
        `
    }
    close_add_aisle();

}

function save_edit_user(email,order){
    for(var aisle in json[email][order]){
        if(aisle == "OrderId"){
            continue;
        }else{
            for(var product in json[email][order][aisle]){
                if(document.getElementById(aisle+"_"+product).value <0){
                    alert("Please enter a value above -1.")
                    document.getElementById(aisle+"_"+product).focus()
                    return;
                }
                if(document.getElementById(aisle+"_"+product).value == 0){
                    delete json[email][order][aisle][product]
                    continue;
                }
                json[email][order][aisle][product] = document.getElementById(aisle+"_"+product).value;
            }
        }
    }

    $.ajax({
        type: 'POST',
        url: 'backend/orders_edit.php',
        data: {Json:json}    

    })
    .done( function( data ) {

        alert("Successfully Edited order")

        setTimeout(function () {
            close_display_edit();
            check_display_backend();

        }, 500);


    })
    .fail( function( data ) {

        alert("Attempted to edit order but failed.")
        close_display_edit();
        check_display_backend();

    });

}


function add_new_order(){
    var edit_html = `
    <div class="edit_div">
    
        <!-- Title -->
        <div class="edit_title">
            Add Order
        </div>
    
        <!-- Close button -->
        <span class= "edit_close" onclick="close_display_edit();check_display_backend();">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>
        <div class="text-center">
        <input style="text-align: center; font-weight:bold; background-color:pink;" type="text" onfocus="blur()" value="Order ID: #`+json["IdCount"]+`">
        <br>

        `
        +users_select+

         `

         </div>
        <div id="add_product_div">
        </div>
        <div class="container text-center">
        <button class="add_product_btn" onclick="add_product_order2()">
            <i class="fas fa-plus-circle"></i>
        </button>
        </div>
            <!-- Save Changes button -->
            <div class="container text-center">
                <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="save_add_product2()">
                     Save  <i class="far fa-save"></i>
                </button>
                
            </div>
        </div>`
    document.getElementById("edit_div").innerHTML = edit_html;

}

function save_add_product2(){
    if(document.getElementsByClassName("classinput1").length == 0){
        alert("Cannot leave order empty.")
        return;
    }

    var email = document.getElementById("users_select").value;
    var idCount = json["IdCount"]; //Get OrderId
    if(!(email in json)){
        json[email] = {}
    }
    var orderIndex = Object.keys(json[email]).length-1;
    if(orderIndex <0){
        orderIndex =0;
    }
    json[email]["Order"+orderIndex] ={};
    json[email]["Order"+orderIndex].OrderId = idCount;
    json["IdCount"] = parseInt(idCount)+1;

    for(var i=0;i<document.getElementsByClassName("classinput1").length;i++){
        if(document.getElementsByClassName("classinput1")[i].value <0){
            alert("Please enter a value above -1.")
            document.getElementsByClassName("classinput1")[i].focus()
            delete json[email]["Order"+orderIndex];
            json["IdCount"] = idCount;
            return;
        }

        var id_value = document.getElementsByClassName("classinput1")[i].id;
        var aisle = id_value.substring(0,id_value.indexOf("_"));
        var quantity = document.getElementById(id_value).value;
        var product =  id_value.substring(id_value.indexOf("_")+1);

        if(!(aisle in json[email]["Order"+orderIndex])){
            json[email]["Order"+orderIndex][aisle] = {}
        }
        
        json[email]["Order"+orderIndex][aisle][product] = quantity;
        
    }

    console.log(json)

    $.ajax({
        type: 'POST',
        url: 'backend/orders_edit.php',
        data: {Json:json}    

    })
    .done( function( data ) {

        alert("Successfully Added order")

        setTimeout(function () {
            close_display_edit();
            check_display_backend();

        }, 500);


    })
    .fail( function( data ) {

        alert("Attempted to add order but failed.")
        close_display_edit();
        check_display_backend();

    });
}

function delete_order(email,order){
    delete json[email][order];
    $.ajax({
        type: 'POST',
        url: 'backend/orders_edit.php',
        data: {Json:json}    

    })
    .done( function( data ) {

        alert("Successfully deleted order")

        setTimeout(function () {
            check_display_backend();

        }, 500);


    })
    .fail( function( data ) {

        alert("Attempted to delete order but failed.")
        setTimeout(function () {
            check_display_backend();

        }, 500);

    });
}

function add_product_order2(){

    var add_html = `
    <div class="edit_div bg_edit_aisle">
        <div class="edit_title">
            Add Product and Quantity
        </div>
        
        <div class="edit_select">

        `
        +prod_select+
        `
        </div>

        <div class="text-center qty_order">
            Qty: <input type="number" class= "input_qty" id="quantity" name="quantity"
            min="0">
        </div>


        <!-- Close button -->
        <span class= "edit_close" onclick="close_add_aisle()">
            <i class="fas fa-window-close position_x fa-2x"></i>
        </span>

        <!-- Save Changes button -->
        <div class="container text-center">
            <button type="button" class="btn btn-outline-primary add_aisle_btn save_btn" onclick="save_product_quantity2()">
                 Save  <i class="far fa-save"></i>
            </button>
            
        </div>


    </div>
    `
    document.getElementById("edit_aisle").innerHTML = add_html;


}

function save_product_quantity2(){
    var value = document.getElementById("products_select").value;
    var aisle = value.substring(0,value.indexOf("_"));
    var quantity = document.getElementById("quantity").value;
    var product =  value.substring(value.indexOf("_")+1);

    if(quantity < 1){
        alert("Please enter a quantity above 0.");
        document.getElementById("quantity").focus();
        return;
    }


    if(document.getElementById(aisle+"_"+product)){
        document.getElementById(aisle+"_"+product).value = quantity;
    }else{
        document.getElementById("add_product_div").innerHTML += `<!-- Product edit inputs -->
        <label class="input">   
            <div class="input_label">`+product+`</div>
    
        <input class="input_edit classinput1" type="number" min="0" id="`+aisle+`_`+product+`" placeholder="" value="`+quantity+`"/>
        </label>
        `
    }
    close_add_aisle();
}

