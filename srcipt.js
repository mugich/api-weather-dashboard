$(document).ready(function () {
  var currentDay = moment().format("MMM Do YY");

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
      var tempDiv = $("<div>").text("Temperature: " + tempF.toFixed(2) + " °F");
      var windDiv = $("<div>").text(
        "wind Speed: " + response.wind.speed + " MPH"
      );
      var humidDiv = $("<div>").text(
        "Humidity: " + response.main.humidity + "%"
      );

      $("#cities-temp-here").append(cityDiv, tempDiv, windDiv, humidDiv);

      for (var i = 0; i < listOfCities.length; i++) {
        var liButton = $("<button>");
        liButton.addClass("list-group-item list-button");
        liButton.text(listOfCities[i]);
        $("#cities-appear-here").prepend(liButton);
      }
      

      
    });
  }

  function displayForecast(inputCity) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      inputCity +
      "&appid=464a210216369d6d7feb73c26252e030";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      
      
      $("#five-day").empty();
      var fiveDay = $("<div>").text(JSON.stringify(response.list));
      $("#five-day").append(fiveDay);
    });
  }


  var listOfCities = [];
  function init() {
    var citiesFromStorage = JSON.parse(localStorage.getItem("listCity"));
    if (citiesFromStorage !== null) {
      listOfCities = citiesFromStorage;
    }
    
  }



  $("#city-form").on("submit", function (event) {

    event.preventDefault();

    var inputCity = $("#city-input").val().trim();

    listOfCities.push(inputCity);
    localStorage.setItem("listCity", JSON.stringify(listOfCities));

    console.log(listOfCities);

   
   
    displayForecast(inputCity);
    searchCities(inputCity);
  });

  
   

 
  
  $(document).on("click", ".list-button", displayForecast, searchCities);





 

 

 


});
