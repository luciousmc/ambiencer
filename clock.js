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
        $('.clock').text(clock12);
    }
    init(){
        setInterval(this.getTime, 1000);
    }
}