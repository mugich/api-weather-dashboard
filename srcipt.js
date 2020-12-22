$(document).ready(function () {
  var currentDay = moment().format("MMM Do YY");

  // search for current day weather
  function searchCities(inputCity) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputCity +
      "&appid=464a210216369d6d7feb73c26252e030";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      $("#cities-temp-here").empty();

      var cityDiv = $("<h2>").text(response.name + " " + currentDay);
      var img = $(
        "<img src='https://openweathermap.org/img/w/" +
          response.weather[0].icon +
          ".png'>"
      );
      cityDiv.append(img);
      var tempDiv = $("<div>").text("Temp: " + tempF.toFixed(2) + " °F");
      var windDiv = $("<div>").text(
        "Wind Speed: " + response.wind.speed + " MPH"
      );
      var humidDiv = $("<div>").text(
        "Humidity: " + response.main.humidity + "%"
      );
      // var uvIndex = $("<div>").text("UV index: " + response.data);

      $("#cities-temp-here").append(cityDiv, tempDiv, windDiv, humidDiv);
      $("#cities-temp-here").addClass("list-group-item");

      // localStorage.setItem("cityName", JSON.stringify(cityDiv));
    });
  }

  // function localStorageFunction(){
  //   $("h2").value = JSON.parse(localStorage.getItem("cityName"));
  // }

  // search and display 5 day forecast
  function displayForecast(inputCity) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      encodeURIComponent(inputCity) +
      "&appid=464a210216369d6d7feb73c26252e030";

    $.ajax({
      url: queryURL,
      dataType: "json",
      method: "GET",
      data: {
        units: "standard",
      },
      success: function (data) {
        console.log("Received data:", data); // For testing
        $("#five-day").empty();
        $("#h2-here").empty();
        var h2Div = $("<h2>").text("5-Day Forecast:");
        h2Div.addClass("h2-style");
        $("#h2-here").append(h2Div);
        for (var i = 5; i <= 40; i += 8) {
          var val = data.list[i];
          var tempF = (val.main.temp - 273.15) * 1.8 + 32;
          var newDiv = $("<div>").addClass("badge badge-primary");
          var hDiv = $("<b>").text(val.dt_txt);
          // hDiv.addClass("back");
          var imgDiv = $(
            "<img src='https://openweathermap.org/img/w/" +
              val.weather[0].icon +
              ".png'>"
          );

          var divTemp = $("<div>").text("Temp: " + tempF.toFixed(2) + " °F");
          var divHumid = $("<div>").text(
            "Humidity: " + val.main.humidity + "%"
          );
          newDiv.append(hDiv, imgDiv, divTemp, divHumid);
          $("#five-day").append(newDiv);
          $("#five-day").addClass("list-group list-group-horizontal");
        }
      },
    });
  }

  function init() {
    var citiesFromStorage = JSON.parse(localStorage.getItem("listCity"));
    if (citiesFromStorage !== null) {
      listOfCities = citiesFromStorage;
    }
    renderButtons();
  }

  var listOfCities = [];
  // list of cities render buttons
  function renderButtons() {
    $("#cities-appear-here").empty();
    for (var i = 0; i < listOfCities.length; i++) {
      var liButton = $("<button>");
      liButton.addClass("list-group-item list-button col-12");
      liButton.css("text-align", "left");
      liButton.attr("data-name", listOfCities[i]);
      liButton.text(listOfCities[i]);
      $("#cities-appear-here").prepend(liButton);
    }
  }
  // search button event listener

  $("#city-form").on("submit", function (e) {
    e.preventDefault();
    var inputCity = $("#city-input").val().trim();
    if (!listOfCities.includes(inputCity)) listOfCities.push(inputCity);
    localStorage.setItem("listCity", JSON.stringify(listOfCities));
    // console.log(listOfCities);
    $("#city-input").val("");
    renderButtons();
    displayForecast(inputCity);
    searchCities(inputCity);
  });

  init();

  $(document).on("click", ".list-button", function () {
    var inputCity = $(this).data("name");
    displayForecast(inputCity);
    searchCities(inputCity);
  });
});
