let alarmTime;
let inputAlarmTime;
const setAlarmButton = document.querySelector("#btn");
const displayButton = document.querySelector("#display");
hourFormat = true;

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

    displayTime();

    

    //Display date
    document.getElementById("date").innerHTML = 
        month + " " +
        day + ", " +
        year;


    //Alarm 10-seconds
    let convertedTime = (hours * 3600) + (minutes * 60) + seconds;

    setAlarmButton.addEventListener("click", () => {
        alarmTime = (hours * 3600) + (minutes * 60) + seconds + 10;
    });

    if (alarmTime == convertedTime) {
        alert("It is " + hours + ":" + minutes + ":" + seconds + ".");
        alarmTime = undefined;
    }


    //Input Alarm
    let setAlarmTime = document.getElementById("alarm-time");

    setAlarmTime.addEventListener("input", () => {
        let alarm = setAlarmTime.value;
        let alarmHour = parseInt(alarm.split(":")[0]);
        let alarmMinute = parseInt(alarm.split(":")[1]);
        let alarmSecond = parseInt(alarm.split(":")[2]);
        
        if (hourFormat == true) {
            if (alarmHour > 12) {
                alarmHour = alarmHour - 12;
            }
        }
        inputAlarmTime = (alarmHour * 3600) + (alarmMinute * 60) + alarmSecond;
    })  

    if (inputAlarmTime == convertedTime) {
        alert("It is " + hours + ":" + minutes + ":" + seconds + ".");
        alarmTime = undefined;
    }

    
}

updateTime();
setInterval(updateTime, 1000);

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

