class Weather {
    constructor(){
        this.city = null;
        this.state = null;
        this.temp = null;
        this.tempUnit = null;
        this.getCurPosSuccess = this.getCurPosSuccess.bind(this);
    }
    getPositionFromBrowser(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getCurPosSuccess, this.getCurPosFail);
        }
        else {
            alert('Sorry, geolocation has been disabled in this browser');
        }
    }
    getCurPosSuccess(geolocationObj){
        const longitude = geolocationObj.coords.longitude;
        const latitude = geolocationObj.coords.latitude;
        this.getLocation(latitude, longitude);
    }
    getCurPosFail(geolocationObj){
        console.log('something went wrong: ', geolocationObj);
    }
    getLocation(latitude, longitude){
        $.getJSON(`https://api.weather.gov/points/${latitude},${longitude}`, data=>{
            const {forecast} = data.properties;
            const {city, state} = data.properties.relativeLocation.properties;
            this.city = city;
            this.state = state;
            this.forecastURL = forecast;          
            this.getTemp(this.forecastURL);  
        });       
    }
    getTemp(url){
        $.getJSON(url, data=>{
            const {temperature, temperatureUnit} = data.properties.periods[0];
            this.temp = temperature;
            this.tempUnit = temperatureUnit;
            this.setWeather();
        })
    }
    setWeather(){
        $('.weather-temp').text(this.temp + '°' + this.tempUnit);
        $('.weather-location').text(this.city + ', ' + this.state);
    }
    init(){
        this.getPositionFromBrowser();
    }
}