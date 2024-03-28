let snoozeTime;
let inputAlarmTime;
const setSnoozeButton = document.querySelector("#snooze-btn");
const displayButton = document.querySelector("#display");
const offButton = document.querySelector("#alarm-off");
let hourFormat = false;
let alarmHasSound = false;


function updateTime() {
    //Get date and time
    let date = new Date();
    let [year, month, day, hours, minutes, seconds] = [
        date.getFullYear(),
        date.toLocaleString('default', { month: 'long' }),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ];
    let convertedTime = (hours * 3600) + (minutes * 60) + seconds;      //Convert time to seconds from 00:00:00



    //Display time
    function displayTime() {
        if (hourFormat == true) {   //if 12-hour time is set ON
            if (hours > 12) {
            hours = hours - 12;
            formatTime();
            document.getElementById("clock").innerHTML =
            hours + ":" +
            minutes + ":" +
            seconds;
            }
        } else {                    //if 12-hour time is set OFF
            formatTime();
            document.getElementById("clock").innerHTML =
            hours + ":" +
            minutes + ":" +
            seconds;
        }
    }


    
    //Formatting for hours, minutes, and seconds value
    function formatTime() {
        if (seconds < 10) {             //if seconds, minutes, or hours is less than ten, then add a 0 before it
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
    }
    


    //Display date
    document.getElementById("date").innerHTML = 
        month + " " +
        day + ", " +
        year;



    //Input Alarm
    let setAlarmTime = document.getElementById("alarm-time");

    setAlarmTime.addEventListener("input", () => {
        let alarm = setAlarmTime.value;
        let alarmHour = parseInt(alarm.split(":")[0]);
        let alarmMinute = parseInt(alarm.split(":")[1]);
        let alarmSecond = parseInt(alarm.split(":")[2]);

        inputAlarmTime = (alarmHour * 3600) + (alarmMinute * 60) + alarmSecond;     //Convert time to seconds from 00:00:00
    })  



    //Alarm
    if (inputAlarmTime == convertedTime) {      //If now equals the set alarm, then sound alarm
        playSound();
        alarmHasSound = true;
    }



    //Snooze
    setSnoozeButton.addEventListener("click", () => {
        if (alarmHasSound == true) {
            snoozeTime = convertedTime + 10;       //New alarm (snoozeTime) equals now (when clicked) plus 5 minutes
            stopSound();
        }
    });
    


    //Snoozed Alarm
    if (snoozeTime == convertedTime) {      //If now equals the snoozeTime alarm, then sound alarm
        playSound();
        alarmHasSound = true;
        snoozeTime = null;          //reset the snoozeTime alarm
    }



    //Stop Alarm Button
    offButton.addEventListener("click", () => {
        if (alarmHasSound == true) {
            stopSound();
            snoozeTime = null;
            alarmHasSound = false;      //resets the alarm
        }
    })



    displayTime();      //display time AFTER math
    


}       //end of update time function




updateTime();       //update time on load
setInterval(updateTime, 1000);      //update time every second




//alarm sound
let alarmSound;

function playSound() {      //when playSound function is called, an audio element is created
    alarmSound = new Audio('sound/alarm.mp3');
    alarmSound.play();
}

function stopSound() {      //when stopSound function is called, the audio element is set to nothing
    alarmSound.setAttribute('src', '');
}




//12-24 Hour Time Button
displayButton.addEventListener("click", () => {
    if (hourFormat == false) {
        hourFormat = true;
        updateTime();
        document.getElementById("display").innerHTML = "12-Hour Time"
    } else {
        hourFormat = false;
        updateTime();
        document.getElementById("display").innerHTML = "24-Hour Time"
    }
});