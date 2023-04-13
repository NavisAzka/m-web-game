const soal = document.getElementById("soal");
const a = document.getElementById("x1");
const operator = document.getElementById("operator");
const b = document.getElementById("x2");
const buttonNext = document.querySelector(".btn");
const inputUser = document.getElementById("answer");
const ansInfo = document.querySelector("#crt-ans");
const timeInfo = document.querySelector("#avg-time");

const operation = document.querySelector(".operation");
const type = document.querySelector(".type");
const digit1 = document.querySelector(".digit1");
const digit2 = document.querySelector(".digit2");
const bottomPart = document.getElementById("jawaban");
const pilGan = bottomPart.children[0];
const essay = bottomPart.children[1];
const opt = document.getElementsByClassName("opt");

const check = document.getElementById("check");

let essayTog = true;

let digit1int = 10;
let digit2int = 10;

let correctAnswer = 0;
let answer = 0;

let timer = 0;
let avgTime = 0;

let i = 0;

setInterval(() => {
  timer++;
}, 1000);

ActionNext();

function CalculateAvgTime() {
  avgTime = Math.round(timer / correctAnswer);

  if (correctAnswer <= 0) {
    avgTime = 0;
  }
}

function MakeQuestion() {
  let x = Math.round(Math.random() * digit1int);
  let y = Math.round(Math.random() * digit2int);

  digit2.innerHTML = "x < " + digit2int;
  digit1.innerHTML = "x < " + digit1int;

  if (i == 0) {
    answer = x + y;
  }
  if (i == 1) {
    answer = x - y;
  }
  if (i == 2) {
    answer = x * y;
  }
  if (i == 3) {
    answer = x * y;
    [x, answer] = [answer, x];
  }

  a.innerHTML = x;
  b.innerHTML = y;

  MakeMultipleChoice();
}

function MakeMultipleChoice() {
  let choices = [5, 14, 10, 3, 12, 8, 33, 21, 20, -4, -10, -2, -15];

  let right = Math.floor(Math.random() * 4);

  for (let index = 0; index < 4; index++) {
    if (right == index) {
      opt[index].innerHTML = answer;
    } else {
      let p = choices[Math.floor(Math.random() * choices.length)];
      opt[index].innerHTML = answer + p;
      choices.splice(choices.indexOf(p), 1);
    }
  }
}

function ActionNext(finalAnswer) {
  if (finalAnswer == answer) {
    correctAnswer++;

    check.innerHTML = "Correct!";
    check.style.color = "lime";
  } else {
    check.innerHTML = "Wrong!";
    check.style.color = "red";

    correctAnswer = 0;
    answer = 0;

    timer = 0;
    avgTime = 0;
  }

  setTimeout(() => {
    check.style.color = "Transparent";
  }, 200);

  CalculateAvgTime();

  ansInfo.innerHTML = correctAnswer;
  timeInfo.innerHTML = avgTime;

  MakeQuestion();
}

function ActNextEssay() {
  if (essayTog) {
    ActionNext(inputUser.value);
    inputUser.autofocus = true;
    inputUser.value = null;
  } else {
    ActionNext(arguments[0].innerHTML);
  }
}

//#region Eventlistener

document.body.addEventListener("click", function (event) {
  callAction(event, ActNextEssay);
});

document.body.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    ActNextEssay();
  }
});

document.body.addEventListener("mouseover", function (event) {
  callAction(event, (e) => {
    e.style.backgroundColor = "rgb(86, 86, 86)";
  });
});

document.body.addEventListener("mouseout", function (event) {
  callAction(event, (e) => {
    e.style.backgroundColor = "rgb(43, 43, 43)";
  });
});

document.body.addEventListener("mousedown", function (event) {
  callAction(event, (e) => {
    e.style.backgroundColor = "rgb(43, 43, 43)";
  });
});

document.body.addEventListener("mouseup", function (event) {
  callAction(event, (e) => {
    e.style.backgroundColor = "rgb(86, 86, 86)";
  });
});

function callAction(event, action) {
  if (event.target.classList.contains("next")) {
    action(buttonNext);
  } else if (event.target.classList.contains("opt")) {
    action(event.target);
  }
}

//#endregion

//#region EventListenerLPilGan

//#endregion

//#region Navbar
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
//#endregion

type.addEventListener("click", () => {
  pilGan.classList.toggle("aktif");
  essay.classList.toggle("aktif");
  essayTog = !essayTog;

  MakeQuestion();

  if (!essayTog) {
    MakeMultipleChoice();
  }
});

digit1.addEventListener("click", () => {
  digit1int += 10;
  if (digit1int > 31) {
    digit1int = 10;
  }

  MakeQuestion();

  if (!essayTog) {
    MakeMultipleChoice();
  }
});

digit2.addEventListener("click", () => {
  digit2int += 10;
  if (digit2int > 31) {
    digit2int = 10;
  }

  MakeQuestion();

  if (!essayTog) {
    MakeMultipleChoice();
  }
});

operation.addEventListener("click", () => {
  i++;
  if (i > 3) {
    i = 0;
  }

  if (i == 0) {
    operator.innerHTML = " + ";
  } else if (i == 1) {
    operator.innerHTML = " - ";
  } else if (i == 2) {
    operator.innerHTML = " × ";
  } else if (i == 3) {
    operator.innerHTML = " / ";
  }

  MakeQuestion();

  if (!essayTog) {
    MakeMultipleChoice();
  }
});
