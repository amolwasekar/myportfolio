import { LightningElement } from 'lwc';
import alarmClockAssets from '@salesforce/resourceUrl/ALARM_CLOCK_ASSETS'

export default class AlarmClockApp extends LightningElement {
    clockImg = alarmClockAssets + '/clock.png';
    ringtone = new Audio(alarmClockAssets + '/alarmMusic.mp3')
    currentTime;
    hoursOptions = [];
    minutesOptions = [];
    meridiemOptions = ['AM', 'PM'];
    hourSelected = '';
    minuteSelected = '';
    meridiemSelected = '';
    alarmTime = '';
    isAlarmSet = false;
    isAlarmTriggered = false;

    connectedCallback() {
        this.currentTimeHandler();
        this.createHoursOptions();
        this.createMinutesOptions();
    }

    get shakeImage(){
        return this.isAlarmTriggered ? 'shake' : '';
    }

    currentTimeHandler() {

        setInterval(() => {
            let dateTime = new Date();
            let hours = dateTime.getHours();
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let ampm = 'AM';

            if (hours === 0) {
                hours = 12;
            } else if (hours === 12) {
                ampm = 'PM';
            } else if (hours >= 12) {
                hours = hours - 12;
                ampm = 'PM';
            }

            hours = hours < 10 ? '0' + hours : hours;
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;

            this.currentTime = `${hours}:${min}:${sec} ${ampm}`;
            if (this.alarmTime === `${hours}:${min} ${ampm}`) {
                console.log(`Alarm Triggered!!!`);
                this.isAlarmTriggered = true;
                this.ringtone.play();
                this.ringtone.loop = true;
            }
        }, 1000)
    }

    createHoursOptions() {
        for (let i = 1; i <= 12; i++) {
            let val = i < 10 ? `0${i}` : i;
            this.hoursOptions.push(val);
        }
    }

    createMinutesOptions() {
        for (let i = 1; i <= 59; i++) {
            let val = i < 10 ? `0${i}` : i;
            this.minutesOptions.push(val);
        }
    }

    optionsHandler(event) {
        const { label, value } = event.detail;
        if (label === 'Hour(s)') {
            this.hourSelected = value;
        } else if (label === 'Minute(s)') {
            this.minuteSelected = value;
        } else if (label === 'AM/PM') {
            this.meridiemSelected = value;
        } else {

        }
        console.log('this.value : ' + value);
        console.log('this.hourSelected : ' + this.hourSelected);
        console.log('this.minuteSelected : ' + this.minuteSelected);
        console.log('this.meridiemSelected : ' + this.meridiemSelected);
    }
    get isFieldBlank(){
        return !(this.hourSelected && this.minuteSelected && this.meridiemSelected);
    }

    setAlarmHandler() {
        this.alarmTime = `${this.hourSelected}:${this.minuteSelected} ${this.meridiemSelected}`;
        this.isAlarmSet = true;
        console.log('Alarm is set');
    }

    clearAlarmHandler(){
        this.isAlarmSet = false;
        this.alarmTime = '';
        this.isAlarmTriggered = false;
        this.ringtone.pause();
        const elements = this.template.querySelectorAll('c-clock-dropdown');
        Array.from(elements).forEach(element=>{
            element.reset('');
        })
    }
}