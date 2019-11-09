class Weather {
    constructor(){
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

        this.getWeather(latitude, longitude);
    }
    getCurPosFail(geolocationObj){
        console.log('something went wrong: ', geolocationObj);
    }
    getWeather(latitude, longitude){
        console.log('im in get weather: ',  latitude, longitude);
        const forecastURL = '';
        const temp = '';
        const city = '';
        const state = '';

        $.getJSON(`https://api.weather.gov/points/${latitude},${longitude}`, data=>{
            forecastURL = data.forecast;
            ({city, state} = data.properties.relativeLocation.properties);
        })
    }
    init(){
        this.getPositionFromBrowser();
    }
}