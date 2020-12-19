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
   $("#cities-appear-here").prepend("<br><hr>" + inputCity);

   var tempF = (response.main.temp - 273.15) * 1.80 + 32;
   
   var cityDiv = $("<h2>").text(response.name + " " + currentDay);
   var tempDiv = $("<div>").text("Temperature: " + tempF.toFixed(2) + " °F");
   var windDiv = $("<div>").text("wind Speed: " + response.wind.speed + " MPH");
   var humidDiv = $("<div>").text("Humidity: " + response.main.humidity + "%");
   $("#cities-temp").append(cityDiv, tempDiv, windDiv, humidDiv );


  
  
  });

}
  function displayForecast (inputCity){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputCity + "&appid=464a210216369d6d7feb73c26252e030";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
     
  
     var fiveDay = $("<div>").text(response.list);
     localStorage.setItem("forecast", JSON.stringify(fiveDay));
     $("#5-day").append(fiveDay);
    
  
    });

  }
  



$("#city-form").on("click", function (event) {
  event.preventDefault();

  var inputCity = $("#city-input").val().trim();
  
 
  displayForecast(inputCity);
  searchCities(inputCity);
});






