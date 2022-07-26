const soal = document.getElementById("soal");
const a = document.getElementById("x1");
const operator = document.getElementById("operator");
const b = document.getElementById("x2");
const buttonNext = document.querySelector(".btn");
const inputUser = document.querySelector("#answer");
const ansInfo = document.querySelector("#crt-ans");

let correctAnswer = 0;
let answer;

ActionNext();

function MakeQuestion() {
  let x = Math.round(Math.random() * 10);
  let y = Math.round(Math.random() * 10);

  a.innerHTML = x;
  b.innerHTML = y;

  answer = x + y;
}

function ActionNext() {
  if (inputUser.value == answer) {
    correctAnswer++;
  }

  ansInfo.innerHTML = correctAnswer;

  inputUser.value = "";

  MakeQuestion();
}

//#region Eventlistener
document.body.addEventListener("click", function (event) {
  callAction(event, ActionNext);
});

document.body.addEventListener("mouseover", function (event) {
  callAction(event, () => {
    buttonNext.style.backgroundColor = "rgb(86, 86, 86)";
  });
});

document.body.addEventListener("mouseout", function (event) {
  callAction(event, () => {
    buttonNext.style.backgroundColor = "rgb(43, 43, 43)";
  });
});

document.body.addEventListener("mousedown", function (event) {
  callAction(event, () => {
    buttonNext.style.backgroundColor = "rgb(43, 43, 43)";
  });
});

document.body.addEventListener("mouseup", function (event) {
  callAction(event, () => {
    buttonNext.style.backgroundColor = "rgb(86, 86, 86)";
  });
});

function callAction(event, action) {
  if (event.target.classList.contains("next")) {
    action();
  }
}

//#endregion
