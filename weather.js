class Weather {
    constructor(){
        
    }
    getPositionFromBrowser(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getCoords);
        }
        else {
            alert('Sorry, geolocation has been disabled in this browser');
        }
    }
    getCoords(geolocationObj){
        console.log('the geo object: ', geolocationObj);
    }
    init(){
        this.getPositionFromBrowser();
    }
}