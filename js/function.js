const cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
} else {
  setTotalPlatesCart(cart);
}

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
}

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
