$("#modal1").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal2").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal3").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal4").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal5").click(() => (window.location.href = '../pages/Mapa.html'))
$("#modal6").click(() => (window.location.href = '../pages/Mapa.html'))


function add(number) {
        var value = document.getElementById(`input${number}`).value;
        var sum = ++value;
        document.getElementById(`input${number}`).value = sum;
}


function subtract(number) {
    var value = document.getElementById(`input${number}`).value;
    var sum = --value;
    if (sum < 0) {
        document.getElementById(`input${number}`).value = 0;
    } else {
        document.getElementById(`input${number}`).value = sum;
    }
}