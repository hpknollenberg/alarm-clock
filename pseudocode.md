# Display the current time in a digital clock format Hours:Mintues:Seconds

const date = new Date();
const [hours, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
];

Display as a string.

# Clock should update every second without refreshing
done

# Be able to set an alarm (e.g. a button that sets the alarm to go off 10 seconds from now)
create button
button's function => get time, convert time to number (hoursx3600 + minutesx60 + seconds), converted time + 10 , if time=converted time + 10  then alarm

# Start the alarm when the difference between the current time and the time the alarm is set for reaches 0 (use a javascript alert, no need for noise)