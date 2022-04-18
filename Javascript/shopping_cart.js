var sub_t = 0;

var QST = 0;

var GST = 0;

var Total = 0;



document.addEventListener('DOMContentLoaded', e =>{

    let button = document.getElementById("add_to_cart");

    let list = document.getElementById("list1");

    button.addEventListener('click', e =>{

        let url = new URLSearchParams(location.search);

        var i = 0;

        let bool = false;

        var items = list.getElementsByTagName('li');

        if(bool == true){

            let nbr = document.getElementById('quantity_input').value;

            if(nbr != 0){

                let price = localStorage.getItem("Price of " + document.getElementById('item_name'));

                sub_t = (parseInt(nbr))*price;

                QST = sub_t * 0.1;

                GST = sub_t * 0.05;

                Total = sub_t + QST + GST;

                sub_t = round(sub_t);
                QST = round(QST);
                GST = round(GST);
                Total = round(Total);

                localStorage.setItem("sub_t", round(sub_t + parseFloat(localStorage.getItem("sub_t"))));
                localStorage.setItem("QST", round(QST + parseFloat(localStorage.getItem("QST"))));
                localStorage.setItem("GST", round(GST + parseFloat(localStorage.getItem("GST"))));
                localStorage.setItem("Total", round(Total + parseFloat(localStorage.getItem("Total"))));

                document.getElementById("total4").innerHTML = "$".concat(localStorage.getItem("sub_t"));

                document.getElementById("total7").innerHTML = "$".concat(localStorage.getItem("Total"));

                document.getElementById("total5").innerHTML = "$".concat(localStorage.getItem("QST"));

                document.getElementById("total6").innerHTML = "$".concat(localStorage.getItem("GST"));

            }

        }

        else{

            let nbr = document.getElementById('quantity_input').value

            if(nbr != 0){

                var item = document.createElement('li');
                var add = document.createElement('button');
                var remove = document.createElement('button');
                var input = document.createElement('input');

                let aisle = url.get('aisle');
                let product = url.get('product');

                var json = fetch("backend/product_info.json")
                    .then(response => {
                        return response.json();
                    })

                let price = json[aisle][product];

                localStorage.setItem("Price of " + document.getElementById('item_name').textContent, price);

                localStorage.setItem("Shopping Cart Counter", (1 + parseInt(localStorage.getItem("Shopping Cart Counter"))).toString())

                item.textContent = document.getElementById('item_name').textContent;

                input.type = "number";
                input.id = "cart-" + localStorage.getItem("Shopping Cart Counter") + "-quantity";
                input.value = "0";
                input.min = "0";
                input.oninput = "this.value = Math.abs(this.value)";

                add.class = "add";
                add.onclick = "add()";

                remove.class = "remove";
                remove.onclick = "remove()";

                list.appendChild(item);
                item.appendChild(input);
                item.appendChild(add);
                item.appendChild(remove);

                sub_t = (parseInt(nbr))*price;

                QST = sub_t * 0.1;

                GST = sub_t * 0.05;

                Total = sub_t + QST + GST;

                sub_t = round(sub_t);
                QST = round(QST);
                GST = round(GST);
                Total = round(Total);

                localStorage.setItem("sub_t", round(sub_t + parseFloat(localStorage.getItem("sub_t"))));
                localStorage.setItem("QST", round(QST + parseFloat(localStorage.getItem("QST"))));
                localStorage.setItem("GST", round(GST + parseFloat(localStorage.getItem("GST"))));
                localStorage.setItem("Total", round(Total + parseFloat(localStorage.getItem("Total"))));

                document.getElementById("total4").innerHTML = "$".concat(localStorage.getItem("sub_t"));

                document.getElementById("total7").innerHTML = "$".concat(localStorage.getItem("Total"));

                document.getElementById("total5").innerHTML = "$".concat(localStorage.getItem("QST"));

                document.getElementById("total6").innerHTML = "$".concat(localStorage.getItem("GST"));

            }

        }

    })

})



function refresh(){

    // localStorage.setItem("sub_t", 0);
    //
    // localStorage.setItem("QST", 0);
    //
    // localStorage.setItem("GST", 0);
    //
    // localStorage.setItem("Total", 0);

    document.getElementById("total4").innerHTML = "$".concat(localStorage.getItem("sub_t"));

    document.getElementById("total7").innerHTML = "$".concat(localStorage.getItem("Total"));

    document.getElementById("total5").innerHTML = "$".concat(localStorage.getItem("QST"));

    document.getElementById("total6").innerHTML = "$".concat(localStorage.getItem("GST"));

}

function add(){
    var x = document.getElementById("cart-1-quantity").value;

    var y = document.getElementById("cart-2-quantity").value;

    var z = document.getElementById("cart-3-quantity").value;

    // let list = document.getElementById("list1");

    sub_t = (parseInt(x))*1.99 + (parseInt(y))*1.99 + (parseInt(z))*1.99;

    QST = sub_t * 0.1;

    GST = sub_t * 0.05;

    Total = sub_t + QST + GST;

    sub_t = round(sub_t);
    QST = round(QST);
    GST = round(GST);
    Total = round(Total);

    localStorage.setItem("sub_t", round(sub_t + parseFloat(localStorage.getItem("sub_t"))));
    localStorage.setItem("QST", round(QST + parseFloat(localStorage.getItem("QST"))));
    localStorage.setItem("GST", round(GST + parseFloat(localStorage.getItem("GST"))));
    localStorage.setItem("Total", round(Total + parseFloat(localStorage.getItem("Total"))));

    let foodCounter1 = document.getElementById("cart-1-quantity").value;

    let foodCounter2 = document.getElementById("cart-2-quantity").value;

    let foodCounter3 = document.getElementById("cart-3-quantity").value;

    localStorage.setItem("foodCounter1", foodCounter1);
    localStorage.setItem("foodCounter2", foodCounter2);
    localStorage.setItem("foodCounter3", foodCounter3);


    if (window.location.href.indexOf("?") == -1) {


        history.replaceState("", "", window.location.href + "?quantity1=" + foodCounter1  + "&quantity2=" + foodCounter2 + "&quantity3=" + foodCounter3) //Updates quantity parameter in url

    } else {
        history.replaceState("", "", window.location.href.substring(0, window.location.href.indexOf("?quantity1")) + "?quantity1=" + foodCounter1 + "&quantity2=" + foodCounter2 + "&quantity3=" + foodCounter3) //Updates quantity parameter in url
    }

    document.getElementById("total4").innerHTML = "$".concat(localStorage.getItem("sub_t"));

    document.getElementById("total7").innerHTML = "$".concat(localStorage.getItem("Total"));

    document.getElementById("total5").innerHTML = "$".concat(localStorage.getItem("QST"));

    document.getElementById("total6").innerHTML = "$".concat(localStorage.getItem("GST"));
}

function remove(){

    var x = document.getElementById("cart-1-quantity").value;

    var y = document.getElementById("cart-2-quantity").value;

    var z = document.getElementById("cart-3-quantity").value;

    sub_t = (-parseInt(x))*1.99 + (-parseInt(y))*1.99 + (-parseInt(z))*1.99;

    QST = sub_t * 0.1;

    GST = sub_t * 0.05;

    Total = sub_t + QST + GST;

    sub_t = round(sub_t);
    QST = round(QST);
    GST = round(GST);
    Total = round(Total);

    localStorage.setItem("sub_t", clamp(round(sub_t + parseFloat(localStorage.getItem("sub_t")))));
    localStorage.setItem("QST", clamp(round(QST + parseFloat(localStorage.getItem("QST")))));
    localStorage.setItem("GST", clamp(round(GST + parseFloat(localStorage.getItem("GST")))));
    localStorage.setItem("Total", clamp(round(Total + parseFloat(localStorage.getItem("Total")))));

    let foodCounter1 = clamp(parseInt(localStorage.getItem("foodcounter1")) - parseInt(document.getElementById("cart-1-quantity").value));

    let foodCounter2 = clamp(parseInt(localStorage.getItem("foodcounter2")) - parseInt(document.getElementById("cart-2-quantity").value));

    let foodCounter3 = clamp(parseInt(localStorage.getItem("foodcounter3")) - parseInt(document.getElementById("cart-3-quantity").value));

    if (window.location.href.indexOf("?") == -1) {


        history.replaceState("", "", window.location.href + "?quantity1=" + foodCounter1.toString()  + "&quantity2=" + foodCounter2.toString() + "&quantity3=" + foodCounter3.toString()) //Updates quantity parameter in url

    } else {
        history.replaceState("", "", window.location.href.substring(0, window.location.href.indexOf("?quantity1")) + "?quantity1=" + foodCounter1.toString() + "&quantity2=" + foodCounter2.toString() + "&quantity3=" + foodCounter3.toString()) //Updates quantity parameter in url
    }

    document.getElementById("total4").innerHTML = "$".concat(localStorage.getItem("sub_t"));

    document.getElementById("total7").innerHTML = "$".concat(localStorage.getItem("Total"));

    document.getElementById("total5").innerHTML = "$".concat(localStorage.getItem("QST"));

    document.getElementById("total6").innerHTML = "$".concat(localStorage.getItem("GST"));

}

function round(num, decimalPlaces = 2) {

    return Decimal(num).toDecimalPlaces(decimalPlaces).toNumber();
}

function clamp(nbr){

    if(nbr < 0){

        return 0;
    }

    return nbr;
}