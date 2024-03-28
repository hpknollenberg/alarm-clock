let snoozeTime;
let inputAlarmTime;
const setSnoozeButton = document.querySelector("#snooze-btn");
const displayButton = document.querySelector("#display");
const offButton = document.querySelector("#alarm-off");
let hourFormat = false;
let alarmHasSound = false;


function updateTime() {
    //Get time
    let date = new Date();
    let [year, month, day, hours, minutes, seconds] = [
        date.getFullYear(),
        date.toLocaleString('default', { month: 'long' }),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ];


    //Formatting for hours, minutes, and seconds value
    function formatTime() {
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
    }


    //Display time
    function displayTime() {
        if (hourFormat == true) {
            if (hours > 12) {
            hours = hours - 12;
            formatTime();
            document.getElementById("clock").innerHTML =
            hours + ":" +
            minutes + ":" +
            seconds;
            }
        } else {
            formatTime();
            document.getElementById("clock").innerHTML =
            hours + ":" +
            minutes + ":" +
            seconds;
        }
    }

    

    

    //Display date
    document.getElementById("date").innerHTML = 
        month + " " +
        day + ", " +
        year;


    //Snooze
    let convertedTime = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);

    setSnoozeButton.addEventListener("click", () => {
        if (alarmHasSound == true) {
            snoozeTime = convertedTime + 10;
            stopSound();
        }
    });
    
    
    if (snoozeTime == convertedTime) {
        playSound();
        alarmHasSound = true;
        snoozeTime = null;
    }


    //Stop Alarm Button
    offButton.addEventListener("click", () => {
        if (alarmHasSound == true) {
            stopSound();
            snoozeTime = null;
            alarmHasSound = false;
        }
    })


    //Input Alarm
    let setAlarmTime = document.getElementById("alarm-time");

    setAlarmTime.addEventListener("input", () => {
        let alarm = setAlarmTime.value;
        let alarmHour = parseInt(alarm.split(":")[0]);
        let alarmMinute = parseInt(alarm.split(":")[1]);
        let alarmSecond = parseInt(alarm.split(":")[2]);

        inputAlarmTime = (alarmHour * 3600) + (alarmMinute * 60) + alarmSecond;
    })  


    if (inputAlarmTime == convertedTime) {
        playSound();
        alarmHasSound = true;
    }


    displayTime();
    
//end of function
}

updateTime();
setInterval(updateTime, 1000);




//alarm sound
let alarmSound;

function playSound() {
    alarmSound = new Audio('sound/alarm.mp3');
    alarmSound.play();
}

function stopSound() {
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