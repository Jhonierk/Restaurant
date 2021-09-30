$("#modal1").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal2").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal3").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal4").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal5").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal6").click(() => (window.location.href = '../pages/Mapa.html'))


function add(number) {
        var value = document.getElementById(`quantity${number}`).value;
        var sum = ++value;
        document.getElementById(`quantity${number}`).value = sum;
}


function subtract(number) {
    var value = document.getElementById(`quantity${number}`).value;
    var sum = --value;
    if (sum < 0) {
        document.getElementById(`quantity${number}`).value = 0;
    } else {
        document.getElementById(`quantity${number}`).value = sum;
    }
}

function addcart(number){
    var image = document.getElementById(`image${number}`).src;
    var title = document.getElementById(`title${number}`).innerHTML;
    var description = document.getElementById(`description${number}`).innerHTML;
    var cost = document.getElementById(`cost${number}`).innerHTML;
    var quantity = document.getElementById(`quantity${number}`).value;
    if (quantity==0){
        alert("Por favor elija la cantidad del plato a pedir");
    }else{
        localStorage.setItem(`image${number}`, image);
        localStorage.setItem(`title${number}`, title);
        localStorage.setItem(`description${number}`, description);
        localStorage.setItem(`cost${number}`, cost);
        localStorage.setItem(`quantity${number}`, quantity);
    }
}