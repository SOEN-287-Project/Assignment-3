var sub_t = 0;

var QST = 0;

var GST = 0;

var Total = 0;


function refresh(){

    localStorage.setItem("sub_t", 0);

    localStorage.setItem("QST", 0);

    localStorage.setItem("GST", 0);

    localStorage.setItem("Total", 0);

    document.getElementById("total4").innerHTML = "$".concat(localStorage.getItem("sub_t"));

    document.getElementById("total7").innerHTML = "$".concat(localStorage.getItem("Total"));

    document.getElementById("total5").innerHTML = "$".concat(localStorage.getItem("QST"));

    document.getElementById("total6").innerHTML = "$".concat(localStorage.getItem("GST"));

}

function add(){
    var x = document.getElementById("cart-1-quantity").value;

    var y = document.getElementById("cart-2-quantity").value;

    var z = document.getElementById("cart-3-quantity").value;

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



}

function round(num, decimalPlaces = 2) {

    return Decimal(num).toDecimalPlaces(decimalPlaces).toNumber();
}