const time = document.getElementById("time");
const pomo = document.getElementById("pomo");
const short = document.getElementById("short");
const long = document.getElementById("long");
const stop = document.getElementById("stop");
const bip = new Audio('assets/beep.mp3');
let pomo_t = 25*60;
let short_t = 5*60;
let long_t = 20*60;
let prev;

function stopp(){
    if(prev)clearInterval(prev);
    time.textContent = "00:00";
    long.classList.remove("btn2");
    short.classList.remove("btn2");
    pomo.classList.remove("btn2");
}

function startTimer(duration, called, no){
    let timer = duration, min, sec;
    called.classList.toggle("btn2");
    prev =setInterval(() => {
        min = parseInt(timer/60,10);
        sec = parseInt(timer%60,10);
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec :sec;

        time.textContent = min + ":" + sec;

        if(--timer <0){
            bip.play();
            called.classList.toggle("btn2");
            if(called==pomo && no==4){
                stopp();
                startTimer(long_t,long,0);
            }
            else if(called==pomo){
                stopp();
                startTimer(short_t,short,no+=1);
            }
            else if(called==short){
                stopp();
                startTimer(pomo_t,pomo,no);
            }
            else if(called==long){
                stopp();
                startTimer(pomo_t,pomo,no)
            }
        }
    }, 1000);
}

pomo.addEventListener('click', () => {
    if(prev)clearInterval(prev);
    long.classList.remove("btn2");
    short.classList.remove("btn2");
    pomo.classList.remove("btn2");
    startTimer(pomo_t,pomo,1);
})

short.addEventListener('click', () => {
    if(prev)clearInterval(prev);
    long.classList.remove("btn2");
    short.classList.remove("btn2");
    pomo.classList.remove("btn2");
    startTimer(short_t,short,0);
})

long.addEventListener('click', () => {
    if(prev)clearInterval(prev);
    long.classList.remove("btn2");
    short.classList.remove("btn2");
    pomo.classList.remove("btn2");
    startTimer(long_t,long,0);
})

stop.addEventListener('click',stopp)

