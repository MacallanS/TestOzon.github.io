document.addEventListener("DOMContentLoaded", () => {
  const ringBlock = document.getElementById("ringBlock");
  const ringProgress = document.getElementById("ringMain");
  const valueInput = document.getElementById("valueInput");
  const animateToggle = document.getElementById("animateToggle");
  const hideToggle = document.getElementById("hideToggle");

  const CIRCUMFERENCE = 2 * Math.PI * 60;

  function updateProgress(value) {
    const offset = CIRCUMFERENCE - (value / 100) * CIRCUMFERENCE;
    ringProgress.style.strokeDashoffset = offset;
  }

  valueInput.addEventListener("input", (e) => {
    let raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw.length > 1 && raw.startsWith("0")) {
      raw = raw.replace(/^0+/, "");
    }
    let value = Math.min(Number(raw), 100);
    e.target.value = value;
    updateProgress(value);
  });

  animateToggle.addEventListener("change", (e) => {
    ringBlock.classList.toggle("circle-progress--animated", e.target.checked);
  });

  hideToggle.addEventListener("change", (e) => {
    const hidden = e.target.checked;
    ringBlock.classList.toggle("circle-progress--hidden", hidden);
    valueInput.disabled = hidden;
    if (hidden) {
      animateToggle.checked = false;
      ringBlock.classList.remove("circle-progress--animated");
    }
  });

  ringBlock.addEventListener("click", (e) => {
    const rect = ringBlock.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    let angle = Math.atan2(x, -y) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    const value = Math.round((angle / 360) * 100);

    valueInput.value = value;
    updateProgress(value);
  });

  window.ProgressBlock = {
    setValue(value) {
      value = Math.max(0, Math.min(100, Number(value)));
      valueInput.value = value;
      updateProgress(value);
      return `Значение установлено: ${value}`;
    },

    getValue() {
      return `Текущее значение: ${Number(valueInput.value)}`;
    },

    startAnimation() {
      ringBlock.classList.add("circle-progress--animated");
      animateToggle.checked = true;
      return "Анимация запущена";
    },

    stopAnimation() {
      ringBlock.classList.remove("circle-progress--animated");
      animateToggle.checked = false;
      return "Анимация остановлена";
    },

    hide() {
      ringBlock.classList.add("circle-progress--hidden");
      hideToggle.checked = true;
      valueInput.disabled = true;
      return "Компонент скрыт";
    },

    show() {
      ringBlock.classList.remove("circle-progress--hidden");
      hideToggle.checked = false;
      valueInput.disabled = false;
      return "Компонент показан";
    }
  };

  updateProgress(Number(valueInput.value));
});
