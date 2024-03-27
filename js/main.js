let alarmTime;
const setAlarmButton = document.querySelector("#btn");

function updateTime() {
    //Get time
    const date = new Date();
    let [year, month, day, hours, minutes, seconds] = [
        date.getFullYear(),
        date.toLocaleString('default', { month: 'long' }),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ];

    //Formatting for hours, minutes, and seconds value
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }

    //Display time
    document.getElementById("clock").innerHTML =
        hours + ":" +
        minutes + ":" +
        seconds;
    
    //Display date
    document.getElementById("date").innerHTML = 
        month + " " +
        day + ", " +
        year;

    //Alarm
    let convertedTime = (hours * 3600) + (minutes * 60) + seconds;

    setAlarmButton.addEventListener("click", () => {
        alarmTime = (hours * 3600) + (minutes * 60) + seconds + 10;
    });

    if (alarmTime == convertedTime) {
        alert("It is " + hours + ":" + minutes + ":" + seconds + ".");
        alarmTime = undefined;
    }
}

setInterval(updateTime, 1000);


