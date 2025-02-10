let workTime = 25 * 60; // 25 минут работы
let breakTime = 5 * 60; // 5 минут отдыха
let timeLeft = workTime;
let isRunning = false;
let isWorkSession = true;
let timer;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const statusText = document.getElementById("status");

// Функция обновления таймера на экране
function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

}

// Функция запуска таймера
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                switchPhase();
            }
        }, 1000);
    }
}

// Функция паузы
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Функция сброса
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorkSession = true;
    timeLeft = workTime;
    updateTimerDisplay();
    statusText.textContent = "Режим: Работа";
}

// Функция смены фаз (работа / отдых)
function switchPhase() {
    isWorkSession = !isWorkSession;
    timeLeft = isWorkSession ? workTime : breakTime;
    statusText.textContent = isWorkSession ? "Режим: Работа" : "Режим: Отдых";
    startTimer(); // Автоматически запускаем следующую фазу
}

// Обработчики кнопок
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Устанавливаем стартовое время
updateTimerDisplay();
