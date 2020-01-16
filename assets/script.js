var pastSearchCities = [];



$(document).ready(function () {

    $("#city-search-button").click(function() {
        weatherSearch();
        
    });

    
        loadPreviousSearch () /*Should include search history on the left and previous city search with 5 day forecast*/
});


// Trying to get previous searched city 

function loadPreviousSearch() {

    

    var pastSearchString = localStorage.getItem("search");

    if (pastSearchString != null) {

        pastSearchCities = JSON.parse(pastSearchString);

    }

    

    populatePastSearchCities();

}

function populatePastSearchCities() {

    for ( var i = 0; i < pastSearchCities.length; i++) {
        var cityEntry = $('<li class="list-group-item"></li>');
        cityEntry.text(pastSearchCities[i])
        $('#cityList').append(cityEntry);
    }
}

function weatherSearch() {
    
    var searchCity = $('#city-text-box').val();

    var cityEntry = $('<li class="list-group-item"></li>');
        cityEntry.text(searchCity);
        $('#cityList').append(cityEntry);
    

    pastSearchCities.push(searchCity);
    
    localStorage.setItem("search" , JSON.stringify(pastSearchCities));

    getWeather(searchCity);
    
    //Get the text from the text box
    

}

function getWeather (city) {
    console.log(city);

    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a53029242518ad3a567bbcab79de12cc';

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done( function (response) {

        
        todayWeather(response);

        //Call a separate function to get the 5 day
    });

}

function todayWeather (weather) {
    console.log(weather);
    $('#city-name').text(weather.name);
    var temp = Math.floor(((weather.main.temp - 273.15) * 9/5) + 32);
    
    $('#city-temperature').text(`Temperature: ${temp} F`);

    $('#city-humidity').text(`Humidity: ${weather.main.humidity} %`);

    var windSpeed = ((weather.wind.speed) * 2.237).toFixed(2);  
    $('#city-windspeed').text(`Wind Speed: ${windSpeed} MPH`);

    //Now get the UV index for the city (weather.name)
    var queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + weather.name + '&appid=a53029242518ad3a567bbcab79de12cc';

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done( function (response) {

        console.log(response);


        //Get the UV index from the response object
        //Add the UV index like $('#city-temperature').text(`Temperature: ${temp} F`);
        
        
    });
}




// Testing if my api call works.




// function weatherSearch () {
//     var city = $('.form-control').text();
//     city.val(pastSearchCities)
//     input
// })

// This is where I create function that allows me add the current weather to the main card. 

// var city = "Caracas";

// function addCurrentWeather (city) {
//     var queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?appid=a53029242518ad3a567bbcab79de12cc&q=' + city;

//     $.ajax({
//         queryUrl: URL,
//         method: "GET"
//     }).then( function (response) {

//         console.log(response);

//         var currentCityWeatherTitle= $("card-title")
//         currentCityWeatherTitle.text(response.q);


//         $('.card-body').append(currentCityWeatherTitle);



//     });
// }






// Trying to set the searched cities and sending them to local storage

// function searchCityButton () {
//     var searchCities = $('.form-control').val();
    
//     pastSearchCities = searchCities


//     localStorage.setItem("search" , JSON.stringify(pastSearchCities));
// }