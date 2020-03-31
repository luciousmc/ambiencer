class Weather {
  constructor(){
    this.city = null;
    this.state = null;
    this.temp = null;
    this.tempUnit = null;
    this.getCurPosSuccess = this.getCurPosSuccess.bind(this);
    this.getCurPosFail = this.getCurPosFail.bind(this);
  }
  getPositionFromBrowser(){
    // If geolocation is enabled in the browser get its position and call getCurPosSuccess()
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.getCurPosSuccess, this.getCurPosFail);
    }
    else {
      alert('Sorry, geolocation has been disabled in this browser');
    }
  }
  getCurPosSuccess(geolocationObj){
    // Save longitude and latitude coordinates and call getLocation using the result
    const longitude = geolocationObj.coords.longitude;
    const latitude = geolocationObj.coords.latitude;
    this.getLocation(latitude, longitude);
  }
  getCurPosFail(geolocationObj){
    console.log('something went wrong: ', geolocationObj);
  }
  getLocation(latitude, longitude){
    // Get request using latitude and longitude arguments
    $.getJSON(`https://api.weather.gov/points/${latitude},${longitude}`, (data)=>{

      // Get forecast url, city and state from the result data
      const {forecast} = data.properties;
      const {city, state} = data.properties.relativeLocation.properties;
      this.city = city;
      this.state = state;

      // Use forecast url to get temperature
      this.forecastURL = forecast;          
      this.getTemp(this.forecastURL);  
    });       
  }
  getTemp(url){

    // GET request using url from arguments
    $.getJSON(url, (data)=>{

      // Store data for temperature and unit from result data
      const {temperature, temperatureUnit} = data.properties.periods[0];
      this.temp = temperature;
      this.tempUnit = temperatureUnit;

      // Call setWeather() to use stored data to write weather to DOM
      this.setWeather();
    })
  }
  setWeather(){
    // Select element for weather and insert data
    console.log('temp: ', this.temp);
    $('.weather-temp').text(this.temp + '°' + this.tempUnit);

    // Select element for location and insert data
    $('.weather-location').text(this.city + ', ' + this.state);
  }
  init(){
    // Get position from the browser
    this.getPositionFromBrowser();
  }
}