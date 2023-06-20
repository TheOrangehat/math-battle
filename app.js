const question_span = document.getElementById("question");
const user_answer = document.getElementById("user_answer");
const score_box = document.getElementById("score");
const submit_btn = document.getElementById("submit-btn");
const game_type_btn = document.getElementById("game_type_btn");
const game_level_btn = document.getElementById("game_level_btn");

const game_types = ["Addition", "Subtraction", "Division", "Multiplication"];
const game_levels = ["Easy", "Medium", "Hard", "Ultra Hard Pro Max ++"];

let number1;
let number2;
let score = 0;
let game_over = false;
let current_game_type = game_types[0];
let current_game_level = game_levels[0];

function startgame() {
  game_over = false;
  submit_btn.classList.remove("disabled");
  submit_btn.innerText = "Submit";
  score = 0;
  score_box.innerHTML = score;
  game_type_btn.innerText = current_game_type;
  game_level_btn.innerText = current_game_level;
  questiongenerator();
}

function questiongenerator() {
  let meow;
  if (current_game_level == game_levels[0]) {
    meow = 50;
  } else if (current_game_level == game_levels[1]) {
    meow = 200;
  } else if (current_game_level == game_levels[2]) {
    meow = 500;
  } else if (current_game_level == game_levels[3]) {
    meow = 5000;
  }

  number1 = Math.floor(Math.random() * meow) + 1;
  number2 = Math.floor(Math.random() * meow) + 1;
  let ques = `${number1.toString()} + ${number2.toString()}`;
  question_span.innerHTML = ques;
}

function answerchecker(e, box) {
  let correctanswer = number1 + number2;
  if ((e.keyCode === 13 || box.id == "submit-btn") && !game_over) {
    console.log(box.value);
    if (box.value == correctanswer) {
      score += 1;
      score_box.innerHTML = score;
      questiongenerator();
      box.value = "";
    } else {
      score -= 1;
      score_box.innerHTML = score;
      box.value = "";
    }
  }
  if (box.innerText == "Retry" && game_over) {
    startgame();
  }
  if ((score <= -5) || (current_game_level == game_levels[3] && score <= -1)){
    gameover();
  }
}

function gameover() {
  game_over = true;
  console.log(game_over);
  score = 0;
  user_answer.value = "";
  submit_btn.classList.add("disabled");
  submit_btn.innerText = "Retry";
  score_box.innerHTML = score;
  alert("Game over!")

}



function settings(btn) {
  let id = btn.id;
  let text = btn.innerText;

  if (id == "game_type_btn") {
    let type = game_types.indexOf(current_game_type);
    type++;
    if (type == game_types.length) {
      type = 0;
    }
    current_game_type = game_types[type];
    startgame();
  } else if (id == "game_level_btn") {
    let level = game_levels.indexOf(current_game_level);
    level++;
    if (level == game_levels.length) {
      level = 0;
    }
    current_game_level = game_levels[level];
    startgame();
  }
}


// starts the game 
startgame();