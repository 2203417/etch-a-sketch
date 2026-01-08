const DEFAULT_COLOR = "#6d6969ff";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor){
  currentColor= newColor;
}

function setCurrendMode(newMode){
  currentMode = newMode;
  
  modeButtons.forEach(btn => btn.classList.remove("active"));

  if (newMode === "color") {
    colorModeBtn.classList.add("active");
  } else if (newMode === "rainbow") {
    crazyModeBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }

}

function setCurrentSize(newSize){
  currentSize = newSize;
}


const container = document.querySelector(".container");

const colorPicker = document.querySelector("#colorPicker");
const colorModeBtn = document.querySelector("#colorMode");
const crazyModeBtn = document.querySelector("#crazyMode");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const sizeSlider = document.querySelector("#sizeSlider");
const sizeValue = document.querySelector("#sizeValue");
const sizeValue2 = document.querySelector("#sizeValue2");

const modeButtons = document.querySelectorAll("#colorMode, #crazyMode, #eraser");


colorPicker.oninput =(e) => setCurrentColor(e.target.value);
colorModeBtn.onclick =  () => setCurrendMode('color');
crazyModeBtn.onclick = () => setCurrendMode('rainbow');
eraserBtn.onclick = () => setCurrendMode('eraser');
clearBtn.onclick =() => eraseGrid();
sizeSlider.oninput = (e) => {
  const newSize = e.target.value;

  sizeValue.textContent = newSize;
  sizeValue2.textContent = newSize;

  setCurrentSize(newSize);
  makeGrid(currentSize);
};

sizeSlider.value = currentSize;
sizeValue.textContent = currentSize;
sizeValue2.textContent = currentSize;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

container.addEventListener("mousedown", paintCell);
container.addEventListener("mouseover", paintCell);



function paintCell(e) {
  console.log(e);console.log(e.target);

  if (e.type == 'mouseover' && !mouseDown) return

  if (currentMode == "rainbow") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    e.target.style.background = `rgb(${r}, ${g}, ${b})`;
  } 
  else if (currentMode == 'color'){
    e.target.style.backgroundColor = currentColor;
  } 
  else if (currentMode == 'eraser'){
    e.target.style.backgroundColor = '#ffffff'
  }
}

function eraseGrid(){
  container.innerHTML =''
  makeGrid(currentSize);
}


function makeGrid(size) {
  container.innerHTML = "";

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    container.appendChild(div);
  }
}





makeGrid(currentSize);


const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");

  if (current === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
});
