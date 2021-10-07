const cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
} else {
  setTotalPlatesCart(cart);
  let html = "";

  let total = 0;
  cart.forEach((plate) => {
    total += plate.plateAmount * plate.platePrice;
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
          <button><i class="fas fa-edit" style="font-size: 1.5rem;"></i></button>

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
          <input class="pedido-input text-center" id="quantity1" type="number" inputmode="numeric" value="${
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
  $("#total").text("$" + total.toLocaleString());

  $(".fas.fa-trash")
    .parent()
    .on("click", function (event) {
      let cartElement = $(this).closest("div[id]").remove();
      let plateId = parseInt(cartElement.attr("id"));

      let indexToDelete = cart.findIndex((plate) => plate.plateId === plateId);
      total -= cart[indexToDelete].plateAmount * cart[indexToDelete].platePrice;
      cart.splice(indexToDelete, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      setTotalPlatesCart(cart);

      $("#total").text("$" + total.toLocaleString());
    });
}

function setTotalPlatesCart(cart) {
  let totalPlatesCart = 0;
  cart.forEach((plate) => {
    totalPlatesCart += plate.plateAmount;
  });
  $("#lblCartCount").text(totalPlatesCart);
}
