var pastSearchCities = [];

// var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

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

    
    // todayWeather();

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

    fiveDayForecast(searchCity);
    
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
    // $('#city-name').text(weather.name);

    // Date Converter from Unix to Date

    var todayDate = weather.dt;

    console.log(todayDate);

    // console.log(todayDate);

    var date = new Date(todayDate*1000);

    console.log(date);

    // console.log(date);

    $('#city-name').text(weather.name + " : " + " " + date);

    var temp = Math.floor(((weather.main.temp - 273.15) * 9/5) + 32);
    
    $('#city-temperature').text(`Temperature: ${temp} F`);

    $('#city-humidity').text(`Humidity: ${weather.main.humidity} %`);

    var windSpeed = ((weather.wind.speed) * 2.237).toFixed(2);  
    $('#city-windspeed').text(`Wind Speed: ${windSpeed} MPH`);


    var cityLat = weather.coord.lat;
    var cityLon =weather.coord.lon;

    // console.log(cityLat);
    // console.log(cityLon);
    
    var queryUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=a53029242518ad3a567bbcab79de12cc&lat=' + cityLat + '&lon=' + cityLon;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done( function (response) {

        // console.log(response);

        $('#city-uv').text(`UV Index: ${response.value}`);
        
    });
}

function fiveDayForecast (fivedaycity) {
    console.log(fivedaycity);

    var secondQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + fivedaycity + '&appid=a53029242518ad3a567bbcab79de12cc';

    $.ajax({
        url: secondQueryURL,
        method: "GET"
    }).done( function (response) {

        console.log(response);

        var firstDay = response.list[8].dt;

        // console.log(firstDay);

        var firstDaydate = new Date(firstDay*1000);

        console.log(firstDaydate);

        $('#day1-Date').text(firstDaydate);
        
    });


}

