let question1 = new Question(
  "Which country launched the Geostationary Operational Environmental Satellite GOES-T satellite?",
  ["Russia", "China", "USA", "UAE"],
  "USA"
);

let questions = [
  question1,
  new Question(
    "Which Asian country has recently imposed its longest power cut since 1996?",
    ["bangladesh", "Indonesia", "Sri Lanka", "Afghanistan"],
    "Sri Lanka"
  ),
  new Question(
    "Where is India’s largest EV charging station established recently?",
    ["Mumbai", "Gurugram", "Guwahati", "New Delhi"],
    "Gurugram"
  ),
  new Question(
    "Which state/UT launched the ‘Award for College Lecturers’ scheme?",
    ["New Delhi", "Punjab", "Orisha", "West Bengal"],
    "New Delhi"
  ),
  new Question(
    "Hollongi, which was seen in the news, is a city located in which state/UT?",
    ["Meghalaya", "Anuranchal Pradesh", "Gujrat", "Orrisha"],
    "Anuranchal Pradesh"
  ),
  new Question(
    "What is the name of India’s first indigenous flying trainer",
    ["AGNI-NG", "HANSA-NG", "BHIM- NG", "BHARAT-NG"],
    "BHARAT-NG"
  ),
  new Question(
    "Which country topped the medal tally in the ISSF World Cup 2022?",
    ["Norway", "China", "Japan", "India"],
    "India"
  ),
  new Question(
    "‘Bayraktar TB2’, which was seen in the news recently, is a combat drone manufactured by which country?",
    ["Turkey", "India", "Japan", "None of the above"],
    "Turkey"
  ),
];
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.index = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.index];
};

Quiz.prototype.checkForCorrectAnswer = function (answer) {
  //Question -> this.getQuestionByIndex() -> question2
  if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.index++;
};

Quiz.prototype.isEnded = function () {
  return this.index === this.questions.length;
};

function Question(questionText, choices, answer) {
  this.text = questionText;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

function loadQuestions() {
  if (quiz.isEnded()) {
    showFinalScores();
  } else {
    let currentQuestion = quiz.getQuestionByIndex();

    let element = document.getElementById("question"); // <p id="question"></p>
    element.innerHTML = currentQuestion.text;

    let choices = currentQuestion.choices;
    for (let i = 0; i < choices.length; i++) {
      let eachChoiceElement = document.getElementById("choice" + i); //<span id="choice0"></span>
      eachChoiceElement.innerHTML = choices[i];

      let eachButtonElement = document.getElementById("btn" + i);
      eachButtonElement.onclick = function () {
        quiz.checkForCorrectAnswer(choices[i]);
        loadQuestions();
      };
    }
    showProgress();
  }
}
let quiz = new Quiz(questions);
loadQuestions();

function showFinalScores() {
  let resultPercentage = (quiz.score / questions.length) * 100;
  let completeHTML = `<h1> Result </h1>
       <h2 id='score'> Your Scores : ${quiz.score} </h2>
       <h3>And mark percentage is : ${resultPercentage}%  </h3>  
      `;
  let quizCanavs = document.getElementById("quiz");
  quizCanavs.innerHTML = completeHTML;
}

function showProgress() {
  let questNo = quiz.index + 1;
  let element = document.getElementById("progress");
  element.innerHTML = `Question ${questNo} of  ${quiz.questions.length}`;
}
