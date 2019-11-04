class Clock {
    constructor(){
        this.getTime = this.getTime.bind(this);
        this.hours = null;
        this.minutes = null;
        this.seconds = null;
    }
    getTime(){
        const date = new Date();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        let dayOrNight = this.hours < 12 ? "am" : "pm";

        let clock12 = `${this.hours > 12 ? `${this.hours - 12}`
                                         : this.hours}:${this.minutes < 10 ? `0${this.minutes}`
                                         : this.minutes} ${dayOrNight}`;

        let clock24 = `${this.hours < 10 ? `0${this.hours}` : this.hours}:
                     ${this.minues < 10 ? `0${this.minutes}` : this.minutes}:
                     ${this.seconds < 10 ? `0${this.seconds}`: this.seconds}`;

        const greeting = this.setGreeting();

        $('.clock').text(clock12);
        $('.greeting').text(greeting);
    }
    setGreeting(){
        switch(this.hours){
            case 1:
            case 2:
            case 3:
            case 4:
                return 'Hello! You\'re up late';
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                return 'Good Morning!';
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                return 'Good Afternoon!';
            case 17:
            case 18:
            case 19:
            case 20:
                return 'Good Evening!';
            default:
                return 'Good Night!';
        } 
    }
    init(){
        setInterval(this.getTime, 1000);
    }
}