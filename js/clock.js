class Clock {
    constructor(){
        this.getTime = this.getTime.bind(this);
        this.hours = null;
        this.minutes = null;
        this.seconds = null;
    }

    getTime(){

        // Instanstiate a new date and stores values for hours, minute and seconds
        const date = new Date();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();

        // If hours is less than 12, it is morning(am). Otherwise its pm. 
        let dayOrNight = this.hours < 12 ? "am" : "pm";

        // Convert to 12 Hour clock
        let clock12;    
        
        // If hours is greater than 12 but less than 24, subtract 12 from the hour
        if (this.hours > 12 && this.hours <= 23) {
            clock12 = this.hours - 12;

        // If hour is 0(midnight), set the hour to 12
        } else if (this.hours === 0) {
            clock12 = 12;

        // Otherwise just use the current hour
        } else {
            clock12 = this.hours;
        }
        
        // Add a leading zero if the minutes are less than 10
        if (this.minutes < 10) {
            clock12 += ':0' + this.minutes;
        } else {
            clock12 += ':' + this.minutes;
        }

        // Attach am or pm to the end of the time
        clock12 += dayOrNight;

        const greeting = this.setGreeting();

        $('.clock').text(clock12);
        $('.greeting').text(greeting);
    }

    setGreeting(){

        // Selects the body to attach background images
        let page = $('body');

        // Changes Greeting text and background image based on the hour of the day
        switch(this.hours){
            case 1:
            case 2:
            case 3:
            case 4:
                page.css('background-image', 'url("images/night.jpg")');
                return 'Hello! You\'re up late';
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                page.css('background-image', 'url("images/morning.jpg")');                return 'Good Morning!';
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                page.css('background-image', 'url("images/afternoon.jpg")');
                return 'Good Afternoon!';
            case 17:
            case 18:
            case 19:
            case 20:
                page.css('background-image', 'url("images/evening.jpg")');
                return 'Good Evening!';
            default:
                page.css('background-image', 'url("images/night.jpg")');
                return 'Good Night!';
        } 
    }
    init(){

        // Start the clock
        setInterval(this.getTime, 1000);
    }
}