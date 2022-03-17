window.onload = function () {
  getUserPosition();
  formataData(new Date());
  var input = document.getElementById("nomeCidade");
  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("button-addon2").click();
    }
  });
};

function getUserPosition() {
  let url = "";
  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&units=metric&lang=pt_br&appid=492f966c9bd9970a1b20ab6d5dde32e8"
    )
      .then((response) => response.json())
      .then(function (json) {
        atribuirValoresTela(json);
      });
  });
}

function formataData(data) {
  var dia = data.getDate();
  var mes = data.getMonth() + 1;
  var ano = data.getFullYear();

  if (dia.toString().length == 1) dia = "0" + dia;
  if (mes.toString().length == 1) mes = "0" + mes;

  document.getElementById("data").innerHTML = dia + "/" + mes + "/" + ano;
}

function pesquisar() {
  let nomeCidade = document.getElementById("nomeCidade").value;
  if (nomeCidade != "") {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        nomeCidade +
        "&units=metric&lang=pt_br&appid=492f966c9bd9970a1b20ab6d5dde32e8"
    )
      .then((response) => response.json())
      .then(function (json) {
        atribuirValoresTela(json);
        buscarJSONMock();
      });
  } else {
    alert("Digite um cidade!");
  }
}
function atribuirValoresTela(json) {
  console.log(json);
  document.getElementById("cidade").innerHTML =
    json.name + "," + " " + json.sys.country;
  document.getElementById("temp").innerHTML = Math.floor(json.main.temp);
  document.getElementById("weather").innerHTML =
    json.weather[0].description.toUpperCase();
  document.getElementById("low-high").innerHTML =
    Math.floor(json.main.temp_min) +
    "°c" +
    " " +
    "/" +
    " " +
    Math.floor(json.main.temp_max) +
    "°c";
  mudarIconeDoTempo(json.weather[0].icon);
}
function mudarIconeDoTempo(nomeDoIcone) {
  let iconeDoTempo = document.getElementById("iconeDoTempo");
  iconeDoTempo.src = "icons/" + nomeDoIcone + ".png";
}
function buscarJSONMock(){
    fetch(
        "https://raw.githubusercontent.com/probono-digital/DesafioTecnico/main/MOCK_DATA.json"
      )
        .then((response) => response.json())
        .then(function (json) {
          console.log(json);
        });
}
