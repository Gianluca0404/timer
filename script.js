const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

let totalSeconds = 0;
let intervalId = null;

// Aggiorna il display in formato mm:ss
function updateDisplay() {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  display.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Countdown ogni secondo
function tick() {
  if (totalSeconds > 0) {
    totalSeconds--;
    updateDisplay();
  } else {
    clearInterval(intervalId);
    intervalId = null;
    alert("⏰ Timer terminato!");
  }
}

// Avvia il timer
startBtn.addEventListener("click", () => {
  // Se già in esecuzione, ignora
  if (intervalId !== null) return;

  // Se è la prima volta, prendi i valori dagli input
  if (totalSeconds === 0) {
    const mins = parseInt(minutesInput.value) || 0;
    const secs = parseInt(secondsInput.value) || 0;
    totalSeconds = mins * 60 + secs;
    if (totalSeconds <= 0) return;
  }

  updateDisplay();
  intervalId = setInterval(tick, 1000);
});

// Pausa
pauseBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

// Reset
resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  totalSeconds = 0;
  updateDisplay();
  minutesInput.value = "";
  secondsInput.value = "";
});
