/* Funcion que */
$("#modal1").click(() => (window.location.href = "../pages/Mapa.html"));
$("#modal2").click(() => (window.location.href = "../pages/Mapa.html"));
$("#modal3").click(() => (window.location.href = "../pages/Mapa.html"));
$("#modal4").click(() => (window.location.href = "../pages/Mapa.html"));
$("#modal5").click(() => (window.location.href = "../pages/Mapa.html"));
$("#modal6").click(() => (window.location.href = "../pages/Mapa.html"));


/* Funcion que añade 1 al input de cantidad del producto */
function add(number) {
  var value = document.getElementById(`quantity${number}`).value;
  var sum = ++value;
  document.getElementById(`quantity${number}`).value = sum;
}

/* Funcion que resta 1 al input de cantidad del producto */
function subtract(number) {
  var value = document.getElementById(`quantity${number}`).value;
  var sum = --value;
  if (sum < 0) {
    document.getElementById(`quantity${number}`).value = 0;
  } else {
    document.getElementById(`quantity${number}`).value = sum;
  }
}
/* Map que contiene los pedidos */
let pedido = [];

/* Fucnion que arga el map al carga la pagina */
window.addEventListener("load", function(){
  localStorage.setItem("pedido", pedido);
});


/* Funcion que guarda los productos al carro y los guarda en el localStorage */
function addcart(number) {
  var img = document.getElementById(`image${number}`).src;
  var image = img.slice(29);
  var title = document.getElementById(`title${number}`).innerHTML;
  var costo = document.getElementById(`cost${number}`).innerHTML;
  var cost = 1000*parseFloat(costo.slice(1));
  var quantity = document.getElementById(`quantity${number}`).value;
  if (quantity == 0) {
    alert("Por favor elija la cantidad del plato a pedir");
  } else {
    pedido.push({
      item:{
      imagen: image,
      title: title,
      costo: cost,
      cantidad: quantity,
    }});
    localStorage.setItem("pedido", pedido);
  }
}
