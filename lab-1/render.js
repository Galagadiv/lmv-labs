const { ipcRenderer } = require("electron");

let timeout;
const idleDelay = 5000; // 5 секунд бездіяльності

function startScreensaver() {
  ipcRenderer.send("show-screensaver");
}

function resetIdleTimer() {
  // При будь-якій дії одразу ховаємо скрінсейвер
  ipcRenderer.send("hide-screensaver");

  // Скидаємо і запускаємо таймер наново
  clearTimeout(timeout);
  timeout = setTimeout(startScreensaver, idleDelay);
}

// слухаємо активність користувача
["mousemove", "keydown", "mousedown", "wheel"].forEach(evt =>
  document.addEventListener(evt, resetIdleTimer)
);

// запуск у активному стані
resetIdleTimer();
