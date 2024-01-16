//Variables for curernt time in tunisia and all zones
const allzone = document.getElementById("allzone");
const currentTime = document.getElementById("currentTime");
const currentTimeTunisia = document.getElementById("currentTimeTunisia");
let data; 

//Varibles for Countdown Timer
var start = document.getElementById('start');
var reset = document.getElementById('reset');
var h = document.getElementById("hour");
var m = document.getElementById("minute");
var s = document.getElementById("sec");

//Variables for Alarm
var alarmTimeInput = document.getElementById('alarmTime');
var setAlarmButton = document.getElementById('setAlarm');
var stopAlarmButton = document.getElementById('stopAlarm'); 
var clearAlarmButton = document.getElementById('clearAlarm');
var alarmAudio = new Audio('/files/ringtone.mp3');
var alarmInterval;



//Part of "Current time in Tunisia"
setInterval(() => {
    currentTimeTunisia.innerText = new Date().toLocaleString('en-us', {
        timeStyle: 'medium',
        dateStyle: 'medium',
        hour12: false
    });
}, 1000);

currentTime.innerText = new Date().toLocaleString('en-us', {
    timeStyle: 'full',
});
//End part "Current time in Tunisia"


//Part of "World Time"
fetch("timezone.json")
    .then((res) => res.json())
    .then((jsonData) => {
        data = jsonData; 
        data.map(e => {
            const option = document.createElement('option');
            option.value = e.iso; 
            option.innerText = e.name; 
            allzone.appendChild(option);
        });
    })
    .catch((err) => console.log(err));

allzone.oninput = () => setInterval(() => timeDifferentZone(), 1000);

function timeDifferentZone() {
    const selectedIso = allzone.value;
    const country = data.find(e => e.iso === selectedIso);
    if (country) {
        const ctime = new Date().toLocaleString('en-us', {
            timeZone: country.timezone,
            timeStyle: 'medium',
            hour12: true 
        });
        currentTime.innerText = ctime;
    }
}
//End Part "World Time"


//Part of "Countdown Timer"
var startTimer = null;

start.addEventListener('click', function(){
    
    function startInterval(){
        startTimer = setInterval(function() {
            timer();
        }, 1000);
    }
    startInterval();
})

reset.addEventListener('click', function(){
    h.value = 0;
    m.value = 0;
    s.value = 0;
    
    stopInterval()
})

function timer(){
    if(h.value == 0 && m.value == 0 && s.value == 0){
        h.value = 0;
        m.value = 0;
        s.value = 0;
    } else if(s.value != 0){
        s.value--;
    } else if(m.value != 0 && s.value == 0){
        s.value = 59;
        m.value--;
    } else if(h.value != 0 && m.value == 0){
        m.value = 60;
        h.value--;
    }
    return;
}


function stopInterval() {
    clearInterval(startTimer);
}
//End part "Countdown Timer"


// Part of "Alarm"

setAlarmButton.addEventListener('click', function () {
    var alarmTime = alarmTimeInput.value;
    if (alarmTime) {
        var currentDateTime = new Date();
        var alarmDateTime = new Date(currentDateTime.toDateString() + ' ' + alarmTime);
        var timeDifference = alarmDateTime - currentDateTime;

        if (timeDifference > 0) {
            alarmInterval = setTimeout(function () {
                playAlarm();
            }, timeDifference);
        } else {
            alert('Invalid alarm time. Please set a future time.');
        }
    }
});

clearAlarmButton.addEventListener('click', function () {
    clearTimeout(alarmInterval);
    alert('Alarm cleared.');
});


stopAlarmButton.addEventListener('click', function () {
    stopAlarm();
});

function playAlarm() {
    alarmAudio.play();
    setTimeout(() => {
        alert('Alarm! Wake up!');
        
    }, 100);
    
}

function stopAlarm() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    alert('Alarm stopped.');
}
// End part "Alarm"