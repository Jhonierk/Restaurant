const cart = JSON.parse(localStorage.getItem("cart"));
setTotalPlatesCart(cart);
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
} else {
  let html = "";
  getTotalPrice(cart);
  cart.forEach((plate) => {
    html =
      `<div class="row mb-5" id="${plate.plateId}">
    <div class="col-3"><img src="${
      plate.plateImage
    }" alt="" class="w-100"></div>
    <div class="col-9">
      <div class="row align-items-end">
        <div class="col-auto">
          <h3 class="m-0 pedido-plate font-weight-bold value text-left">${
            plate.plateTitle
          }</h3>
        </div>
        <div class="col-auto">
          <h4 class="m-0 value font-weight-bold">${
            "$" + plate.platePrice.toLocaleString()
          }</h4>
        </div>
        <div class="col-auto">
          <button class="mr-3"><i class=" fas fa-trash " style="font-size: 1.5rem;"></i></button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-8">
          <p>${plate.plateDescription}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-auto">
          <button class="btn font-weight-bold btn-cal" type="button">-</button>
          <input disabled class="pedido-input text-center" id="quantity1" type="number" inputmode="numeric" value="${
            plate.plateAmount
          }">
          <button class="btn font-weight-bold btn-cal" type="button">+</button>
        </div>
      </div>
    </div>
  </div>` + html;
  });
  html += `<div class="row mt-3 justify-content-center">
  <div class="col-auto">
    <a href="./Pedido.html" class="btn pedido-btn-add font-weight-bold">CONTINUAR COMPRANDO</a>
  </div>
</div>`;
  $("#plates .row .col-8").html(html);
  $("#total").text("$" + getTotalPrice(cart).toLocaleString());

  $("button.btn-cal").on("click", function (event) {
    let button = $(this);
    let operator = button.text();
    setAmount(button, operator, cart);
  });

  $(".fas.fa-trash")
    .parent()
    .on("click", function (event) {
      let cartElement = $(this).closest("div[id]").remove();
      let plateId = parseInt(cartElement.attr("id"));
      let indexToDelete = cart.findIndex((plate) => plate.plateId === plateId);
      let total = getTotalPrice(cart);

      total -= cart[indexToDelete].plateAmount * cart[indexToDelete].platePrice;
      cart.splice(indexToDelete, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      setTotalPlatesCart(cart);
      $("#total").text("$" + total.toLocaleString());

      if (cart.length === 0) {
        $("#btnReservar").off();
      }
    });

  if (cart.length > 0) {
    $("#btnReservar").on("click", function () {
      $("#modalReserva").modal();
      $("#modalReserva").show();

      const modal = $(this);
      const formReservation = $("#formReserva");

      formReservation.on("submit", function (event) {
        event.preventDefault();
        let formData = new FormData($(this)[0]);
        let header = `
        <!DOCTYPE html>
<html>
<head>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

</style>
</head>
<body>
        <table>
        <tr>
            <th>Plato</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
        </tr>`;
        let footer = `<tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>$${getTotalPrice(cart).toLocaleString()}</td>
    </tr>
</table>
</body>
</html>`;

        cart.forEach((plate) => {
          header += `<tr>
          <td>${plate.plateTitle}</td>
          <td><img src="jhonierk.github.io/Restaurant/${plate.plateImage
            .replace(".", "")
            .replace(".", "")
            .replace("/", "")}" alt="" style="width: 100px;height: 100px;"></td>
          <td>$${plate.platePrice.toLocaleString()}</td>
          <td>${plate.plateAmount}</td>
          <td>$${(plate.plateAmount * plate.platePrice).toLocaleString()}</td>
      </tr>`;
        });

        let data = {
          email: formData.get("email"),
          name: formData.get("name"),
          html: header + footer,
        };

        emailjs.init("user_5EBnjcadQYKcG9dJU2dJ6");

        emailjs.send("gmail", "reserva-menu", data).then(
          function (response) {
            if (response.text === "OK") {
              localStorage.setItem("cart", JSON.stringify([]));
              $("#modalReserva").modal("hide");
              setTotalPlatesCart([]);
              $("#total").text("$0");
              $("#btnReservar").off();
              $("#plates .row .col-8").html(`<div class="row py-5">
              <div class="col-auto">
                <h2>No hay nada en el carrito</h2>
              </div>
            </div>
            <div class="row py-5 justify-content-center">
              <div class="col-auto">
                <a href="./Pedido.html" class="btn pedido-btn-add font-weight-bold">CONTINUAR COMPRANDO</a>
              </div>
            </div>`);
              Swal.fire({
                icon: "success",
                title: "El correo se ha enviado de forma exitosa",
                text: "Revise su bandeja de entrada",
                showConfirmButton: false,
                timer: 3000,
              });
            }
            formReservation[0].reset();
            console.log(
              "SUCCESS. status=%d, text=%s",
              response.status,
              response.text
            );
          },
          function (err) {
            footer;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrió un problema al enviar el correo",
            });
            console.log("FAILED. error=", err);
          }
        );
      });

      modal.on("hidden.bs.modal", function (event) {
        formReservation[0].reset();
        formReservation.off("submit");
      });
    });
  }
}

function setAmount(button, operator) {
  let inputAmount;
  let amount;
  let plateId = parseInt(button.closest("div[id]").attr("id"));
  let plateCartIndex = cart.findIndex((plate) => plate.plateId === plateId);
  let total = getTotalPrice(cart);

  switch (operator) {
    case "-":
      inputAmount = button.next();

      if (parseInt(inputAmount.val()) - 1 < 1) {
        amount = 1;
      } else {
        amount = parseInt(inputAmount.val()) - 1;
        total -= cart[plateCartIndex].platePrice;
      }

      break;
    case "+":
      total += cart[plateCartIndex].platePrice;
      inputAmount = button.prev();
      amount = parseInt(inputAmount.val()) + 1;
      break;
    default:
      alert("Error");
      break;
  }

  cart[plateCartIndex].plateAmount = amount;
  localStorage.setItem("cart", JSON.stringify(cart));
  setTotalPlatesCart(cart);
  inputAmount.val(amount);
  $("#total").text("$" + total.toLocaleString());
}

function setTotalPlatesCart(cart) {
  let totalPlatesCart = 0;
  cart.forEach((plate) => {
    totalPlatesCart += plate.plateAmount;
  });
  $("#lblCartCount").text(totalPlatesCart);
}

function getTotalPrice(cart) {
  return cart.length > 0
    ? cart
        .map((plate) => plate.plateAmount * plate.platePrice)
        .reduce((total, i) => total + i)
    : 0;
}
