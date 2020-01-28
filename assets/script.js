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

// Not a DRY code in this section, I couldnt figure out how to skip correctly to get the dates and later conver them to nomal dates. 

function fiveDayForecast (fivedaycity) {
    console.log(fivedaycity);

    var secondQueryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + fivedaycity + '&appid=a53029242518ad3a567bbcab79de12cc';

    $.ajax({
        url: secondQueryURL,
        method: "GET"
    }).done( function (response) {


        var URL = "http://openweathermap.org/img/w/";

        console.log(response);

        var firstDay = response.list[8].dt;

        // console.log(firstDay);

        var firstDaydate = new Date(firstDay*1000);

        console.log(firstDaydate);

        $('#day1-Date').text(firstDaydate);

        var day1Icon = URL + response.list [8].weather[0].icon + ".png";

        console.log(day1Icon);

        $('#day1Icon').attr("src", day1Icon);

        var temperature1 = Math.floor(((response.list[8].main.temp - 273.15) * 9/5) + 32);

        console.log(temperature1);

        $('#day1-temp').text(`Temp: ${temperature1} F`);

        $('#day1-humidity').text(`Humidity: ${response.list[8].main.humidity} %`);


        var secondDay = response.list[16].dt;

        var secondDayDate = new Date (secondDay*1000);

        $('#day2-Date').text(secondDayDate);

        var day2Icon = URL + response.list [16].weather[0].icon + ".png";

        $('#day2Icon').attr("src", day2Icon);

        var temperature2 = Math.floor(((response.list[16].main.temp - 273.15) * 9/5) + 32);

        console.log(temperature2);

        $('#day2-temp').text(`Temp: ${temperature2} F`);

        $('#day2-humidity').text(`Humidity: ${response.list[16].main.humidity} %`);

        
        // 

        var thirdDay = response.list[24].dt;

        var thirdDayDate = new Date (thirdDay*1000);

        $('#day3-Date').text(thirdDayDate);

        var day3Icon = URL + response.list [24].weather[0].icon + ".png";

        $('#day3Icon').attr("src", day3Icon);

        var temperature3 = Math.floor(((response.list[24].main.temp - 273.15) * 9/5) + 32);

        console.log(temperature3);

        $('#day3-temp').text(`Temp: ${temperature3} F`);

        $('#day3-humidity').text(`Humidity: ${response.list[24].main.humidity} %`);

        // 

        var fourthDay = response.list[32].dt;

        var fourthDayDate = new Date (fourthDay*1000);

        $('#day4-Date').text(fourthDayDate);

        var day4Icon = URL + response.list [32].weather[0].icon + ".png";

        $('#day4Icon').attr("src", day4Icon);

        var temperature4 = Math.floor(((response.list[32].main.temp - 273.15) * 9/5) + 32);

        console.log(temperature4);

        $('#day4-temp').text(`Temp: ${temperature4} F`);

        $('#day4-humidity').text(`Humidity: ${response.list[32].main.humidity} %`);


        // 

        var fifthDay = response.list[39].dt;

        console.log(fifthDay);

        var fifthDayDate = new Date (fifthDay*1000);

        $('#day5-Date').text(fifthDayDate);

        var day5Icon = URL + response.list [39].weather[0].icon + ".png";

        $('#day5Icon').attr("src", day5Icon);

        var temperature5 = Math.floor(((response.list[39].main.temp - 273.15) * 9/5) + 32);

        console.log(temperature5);

        $('#day5-temp').text(`Temp: ${temperature5} F`);

        $('#day5-humidity').text(`Humidity: ${response.list[39].main.humidity} %`);

    });


}

