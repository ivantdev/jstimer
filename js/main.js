let hoursSpan = document.querySelector('#hours');
let hoursValue = 0;
let minutesSpan = document.querySelector('#minutes');
let minutesValue = 0;
let secondsSpan = document.querySelector('#seconds');
let secondsValue = 0;
let milisecondsSpan = document.querySelector('#miliseconds');
let milisecondsValue = 0;

// butons
let currentInterval;
let currentButton;
const chronometer = document.getElementById("chronometer-button");
chronometer.addEventListener('click', executeChronometer);
const timer = document.getElementById("timer-button");
timer.addEventListener('click', executeTimer);
const pomodoro = document.getElementById("pomodoro-button");
pomodoro.addEventListener('click', executePomodoro);

// inputs

let inputHours, inputMinutes, inputSeconds;

let start = document.getElementById("start");
let stop = document.getElementById("stop");
stop.addEventListener('click', stopTime);
let reset = document.getElementById("reset");

function activeButtonsChrono() {
    start.removeEventListener('click', startTimer);
    start.removeEventListener('click', startPomodoro);
    start.addEventListener('click', startChronometer);
    reset.addEventListener('click', resetTime);
    reset.removeEventListener('click', resetTimer);
}

function activeButtonsTimer() {
    start.removeEventListener('click', startChronometer);
    start.removeEventListener('click', startPomodoro);
    start.addEventListener('click', startTimer);
    reset.removeEventListener('click', resetTime);
    reset.addEventListener('click', resetTimer);
}

function activeButtonsPomodoro() {
    start.removeEventListener('click', startChronometer);
    start.removeEventListener('click', startTimer);
    start.addEventListener('click', startPomodoro);
}

function iconAddHeaderBG(event) {
    let button = event.target;
    button.classList.add('header--button__active');
    let icon = button.querySelector('i');
    icon.classList.add('active');
    iconAddBeat();
}

function iconRemoveHeaderBG(event) {
    let button = document.querySelector('.header--button__active');
    button.classList.remove('header--button__active');
    iconRemoveBeat();
}

function iconAddBeat() {
    let icon = document.querySelector('header i.active');
    icon.classList.add('fa-beat');
    icon.style = "--fa-animation-duration: 2s;";

}

function iconRemoveBeat() {
    let icon = document.querySelector('header i.active');
    icon.classList.remove('fa-beat');
    icon.classList.remove('active');
    icon.style = "";

}

function formatValue(value) {
    return ("0" + value).slice(-2);
}

function executeChronometer(event) {
    resetTime();
    iconRemoveHeaderBG();
    iconAddHeaderBG(event);
    activeButtonsChrono();

    let div = document.querySelector('#set--timer');
    div.innerHTML = "";
    document.querySelector('#hero--title').textContent = "Chronometer";
}

function executeTimer(event) {
    resetTime();
    iconRemoveHeaderBG();
    iconAddHeaderBG(event);
    activeButtonsTimer();

    let div = document.querySelector('#set--timer');
    let h1 = document.createElement('h1');
    h1.className = "timer--end";
    let h2 = document.createElement('h2');
    h2.textContent = "Settings";
    let form = document.createElement('form');
    let newInputHours = document.createElement('input');
    newInputHours.type = "number", newInputHours.placeholder = "hh", newInputHours.id = "input-hours", newInputHours.max = "99";
    let newInputMinutes = document.createElement('input');
    newInputMinutes.type = "number", newInputMinutes.placeholder = "mm", newInputMinutes.id = "input-minutes", newInputMinutes.max = "59";
    let newInputSeconds = document.createElement('input');
    newInputSeconds.type = "number", newInputSeconds.placeholder = "ss", newInputSeconds.id = "input-seconds", newInputSeconds.max = "59";
    form.appendChild(newInputHours), form.appendChild(newInputMinutes), form.appendChild(newInputSeconds);
    div.appendChild(h1), div.appendChild(h2), div.appendChild(form);

    document.querySelector('#hero--title').textContent = "Timer";
}

function executePomodoro(event) {
    resetTime();
    iconRemoveHeaderBG();
    iconAddHeaderBG(event);
    activeButtonsChrono()

    let div = document.querySelector('#set--timer');
    div.innerHTML = "";
}

function stopTime() {
    clearInterval(currentInterval);
    if(currentButton) {
        currentButton.disabled = false
    }
}

function resetTime() {
    hoursValue = 0;
    hoursSpan.textContent = '00';
    minutesValue = 0;
    minutesSpan.textContent = '00';
    secondsValue = 0;
    secondsSpan.textContent = '00';
    milisecondsValue = 0;
    milisecondsSpan.textContent = '00';
}

function startChronometer(event) {
    currentButton = event.target;
    currentButton.disabled = true;
    currentInterval = setInterval(() => {
        milisecondsValue += 1;
        if(milisecondsValue === 100) {
            milisecondsValue = 0;
            secondsValue += 1;
            if(secondsValue === 60) {
                secondsValue = 0;
                minutesValue += 1;
                if(minutesValue === 60) {
                    minutesValue = 0;
                    hoursValue += 1;
                    if(String(hoursValue) <= 1) {
                        hoursSpan.textContent = formatValue(hoursValue);
                    }
                    hoursSpan.textContent = hoursValue;
                }
                minutesSpan.textContent = formatValue(minutesValue);
            }
            secondsSpan.textContent = formatValue(secondsValue);
        }
        milisecondsSpan.textContent = formatValue(milisecondsValue)
    }, 10);
}

function startTimer() {
    inputSeconds = document.querySelector('#input-seconds');
    inputMinutes = document.querySelector('#input-minutes');
    inputHours = document.querySelector('#input-hours');
    let seconds = inputSeconds.value != "" ? parseInt(inputSeconds.value) : 0;
    let minutes = inputMinutes.value != "" ? parseInt(inputMinutes.value) : 0;
    let hours = inputHours.value != "" ? parseInt(inputHours.value) : 0;

    if (secondsValue===0 && minutesValue===0 && hoursValue===0){
        milisecondsValue = 1, secondsValue = seconds, minutesValue = minutes, hoursValue = hours;
        secondsSpan.textContent = formatValue(seconds);
        minutesSpan.textContent = formatValue(minutes);
        hoursSpan.textContent = formatValue(hours);
        let h1 = document.querySelector('.timer--end');
        h1.textContent = "";
    }

    currentButton = event.target;
    currentButton.disabled = true;

    currentInterval = setInterval(() => {
        if(secondsValue > 0 || minutesValue > 0 || hoursValue > 0 || milisecondsValue > 0) {
            milisecondsValue -= 1;
            if(milisecondsValue === 0 && (secondsValue > 0 || minutesValue > 0 || hoursValue > 0)) {
                milisecondsValue = 99;
                secondsValue -= 1;
                if((secondsValue === -1 || secondsValue < 0) && minutesValue > 0) {
                    secondsValue = 59;
                    minutesValue -= 1;
                    if((minutesValue === 0 || minutesValue < 0) && hoursValue > 0) {
                        minutesValue = 59;
                        hoursValue -= 1;
                        if(hoursValue < 0) {
                            hoursSpan.textContent = formatValue(hoursValue);
                        }
                        hoursSpan.textContent = hoursValue;
                    }
                    minutesSpan.textContent = formatValue(minutesValue);
                }
                secondsSpan.textContent = formatValue(secondsValue);
            }
            milisecondsSpan.textContent = formatValue(milisecondsValue);
        }
        else {
            stopTime();
            let h1 = document.querySelector('.timer--end');
            h1.textContent = "Timer Finished";
        }
        milisecondsSpan.textContent = formatValue(milisecondsValue);
    }, 10);
}

function resetTimer() {
    if(!(inputHours && inputMinutes && inputSeconds)) {
        return;
    }
    milisecondsSpan.textContent = "01";
    secondsSpan.textContent = inputSeconds.value != "" ? formatValue(inputSeconds.value) : "00";
    minutesSpan.textContent = inputMinutes.value != "" ? formatValue(inputMinutes.value) : "00";
    hoursSpan.textContent = inputHours.value != "" ? formatValue(inputHours.value) : "00";
    let h1 = document.querySelector('.timer--end');
    h1.textContent = "";
    secondsValue = parseInt(inputSeconds.value), minutesValue = parseInt(inputMinutes.value), hoursValue = parseInt(inputHours.value , milisecondsValue = 1);
}

function startPomodoro() {
    
}

activeButtonsChrono();
iconAddBeat();