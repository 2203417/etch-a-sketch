const DEFAULT_COLOR = "#6d6969ff";
const DEFAULT_MODE = "COLOR";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const container = document.querySelector(".container");

const colorPicker = document.querySelector("#colorPicker");
const colorModeBtn = document.querySelector("#colorMode");
const crazyModeBtn = document.querySelector("#crazyMode");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const sizeBtn = document.querySelector("#size");

let isDrawing = false;




// botones

colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
    currentMode = 'COLOR';
});

colorModeBtn.addEventListener("click", () => {
  currentColor = DEFAULT_COLOR;
});

crazyModeBtn.addEventListener('click', () => {
    currentMode = "RAINBOW";
});

eraserBtn.addEventListener("click", () => {
  currentColor = "white";
});

clearBtn.addEventListener("click", () => {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.style.background = "white";
  });
});

/// --- MOUSE EVENTS ---
container.addEventListener("mousedown", (e) => {
  isDrawing = true;
  if (e.target.classList.contains("cell")) {
    paintCell(e.target);
  }
});

container.addEventListener("mouseover", (e) => {
  if (!isDrawing) return;
  if (e.target.classList.contains("cell")) {
    paintCell(e.target);
  }
});

container.addEventListener("mouseup", () => (isDrawing = false));
container.addEventListener("mouseleave", () => (isDrawing = false));

function paintCell(cell) {
  if (currentMode === "RAINBOW") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    cell.style.background = `rgb(${r}, ${g}, ${b})`;
  } else {
    cell.style.background = currentColor;
  }
}




function makeGrid(size = 16) {
  container.innerHTML = "";

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    container.appendChild(div);
  }
}

makeGrid(16);
