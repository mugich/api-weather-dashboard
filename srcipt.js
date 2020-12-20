$(document).ready(function () {

  var currentDay = moment().format("MMM Do YY");

  function searchCities(inputCity) {

    // var inputCity = $(this).attr("data-name"); 
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputCity +
      "&appid=464a210216369d6d7feb73c26252e030";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // console.log(response);

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
      
      // localStorage.setItem("cityName", JSON.stringify(cityDiv));

      
    });
  }


  // function localStorageFunction(){
  //   $("h2").value = JSON.parse(localStorage.getItem("cityName"));
  // }

  function displayForecast(inputCity) {
    
    
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      inputCity +
      "&appid=464a210216369d6d7feb73c26252e030";

    $.ajax({
      url: queryURL,
      dataType: "json",
      method: "GET",
      data: {
        units: "standard",
        cnt: "5"
      },
      success: function(data) {
        console.log('Received data:', data) // For testing
        var dayList = "";
       
        $.each(data.list, function(index, val) {
          // var tempF = (response.main.temp - 273.15) * 1.8 + 32;
          dayList += "<p>" // Opening paragraph tag
          dayList += "<b>Day " + index + "</b>: " // Day
          dayList += val.main.temp + "&degF" // Temperature
          dayList += "<span> | " + val.weather[0].description + "</span>"; // Description
          dayList += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
          dayList += "</p>" // Closing paragraph tag
        });
        $("#five-day").html(dayList);
      }
  
    
    });
  }

  


  var listOfCities = [];
  function init() {
    var citiesFromStorage = JSON.parse(localStorage.getItem("listCity"));
    if (citiesFromStorage !== null) {
      listOfCities = citiesFromStorage;
    }
    renderButtons();
  }

  function renderButtons(){
   
    for (var i = 0; i < listOfCities.length; i++) {
      var liButton = $("<button>");
      liButton.addClass("list-group-item list-button col-12");
      liButton.css("text-align", "left");
      liButton.attr("data-name", listOfCities[i]);
      liButton.text(listOfCities[i]);
      $("#cities-appear-here").prepend(liButton);
    }
  
  }



  $("#city-form").on("submit", function (event) {

    event.preventDefault();

    var inputCity = $("#city-input").val().trim();

    listOfCities.push(inputCity);
    localStorage.setItem("listCity", JSON.stringify(listOfCities));

    console.log(listOfCities);

   
    renderButtons();
    displayForecast(inputCity);
    searchCities(inputCity);
  });

  
   
  // localStorageFunction();
  init();
  
  $(document).on("click", ".list-button", displayForecast, searchCities);

 



 

 

 


});
