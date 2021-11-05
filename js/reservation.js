$("#modalReserva").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  const service = button.data("service");
  const modal = $(this);
  const formReservation = $("#formReserva");
  const btnCancel = $("#btnCancelar");

  modal.find(".modal-title").text("Reserva de " + service);

  $('input[name="assistants"]').on("keypress", function (event) {
    if (event.key !== "Backspace" && event.key !== "" && (event.key < "0" || event.key > "C"))  
    {
      event.preventDefault();
    }
  });

  formReservation.on("submit", function (event) {
    event.preventDefault();

    let formData = new FormData($(this)[0]);
    let data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      assistants: formData.get("assistants"),
      date: formData.get("date"),
      time: formData.get("time"),
      comments: formData.get("comments"),
      service: service,
    };

    emailjs.init("user_5EBnjcadQYKcG9dJU2dJ6");

    emailjs.send("gmail", "reserva-servicio", data).then(
      function (response) {
        if (response.text === "OK") {
          $("#modalReserva").modal("hide");
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
