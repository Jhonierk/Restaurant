/* Funcion que cierra las ventans modales */
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

    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      setTotalPlatesCart(cart);
    }
  }
}





/* 
const btnSetAmount = $("button.btn-cal");

btnSetAmount.on("click", function (event) {
  let button = $(this);
  let operator = button.text();
  setAmount(button, operator);
});

function setAmount(button, operator) {
  let inputAmount;
  let amount;

  switch (operator) {
    case "-":
      inputAmount = button.next();
      amount =
        parseInt(inputAmount.val()) - 1 < 1
          ? 1
          : parseInt(inputAmount.val()) - 1;
      break;
    case "+":
      inputAmount = button.prev();
      amount = parseInt(inputAmount.val()) + 1;
      break;
    default:
      alert("Error");
      break;
  }
  inputAmount.val(amount);

} */



/* Map que contiene los pedidos */
let pedido = [];

/* Fucnion que arga el map al carga la pagina */
window.addEventListener("load", function () {
  localStorage.setItem("pedido", pedido);
});

/* Funcion que guarda los productos al carro y los guarda en el localStorage */
function addcart(number) {
  var img = document.getElementById(`image${number}`).src;
  var image = img.slice(29);
  var title = document.getElementById(`title${number}`).innerHTML;
  var costo = document.getElementById(`cost${number}`).innerHTML;
  var cost = 1000 * parseFloat(costo.slice(1));
  var quantity = document.getElementById(`quantity${number}`).value;
  if (quantity == 0) {
    alert("Por favor elija la cantidad del plato a pedir");
  } else {
    pedido.push({
      item: {
        imagen: image,
        title: title,
        costo: cost,
        cantidad: quantity,
      }
    });
    localStorage.setItem("pedido", pedido);

    $("a.pedido-btn-add").on("click", function (event) {
      //alert("Click");

      let button = $(this);
      let cart = JSON.parse(localStorage.getItem("cart"));
      let plateData = getPlateData(button);
      let plateCartIndex = cart.findIndex(
        (plate) => plate.plateId == plateData.plateId
      );

      if (plateCartIndex === -1) {
        cart.push(plateData);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart[plateCartIndex].plateAmount += plateData.plateAmount;
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      setTotalPlatesCart(cart);
    });
  }
}

function getPlateData(button) {
  let parentRow = button.closest(".row.mb-4");
  //parent.css("background-color", "blue");
  //console.log(parent);
  let plateId = parseInt(parentRow.attr("id"));
  let plateImage = parentRow.find("img").attr("src");
  let plateTitle = parentRow.find(".pedido-plate").text();
  let plateDescription = parentRow.find("p").text();
  let platePrice = parseInt(
    parentRow.find(".value").text().replace("$", "").replace(".", "")
  );
  let plateAmount = parseInt(parentRow.find(".pedido-input").val());

  return {
    plateId,
    plateImage,
    plateTitle,
    plateDescription,
    platePrice,
    plateAmount,
  };
}


function setTotalPlatesCart(cart) {
  let totalPlatesCart = 0;
  cart.forEach((plate) => {
    totalPlatesCart += plate.plateAmount;
  });
  $("#lblCartCount").text(totalPlatesCart);
}
