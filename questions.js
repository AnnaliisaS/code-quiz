//Timer still buggy after incorrect answers are selected, but functional.
//high scores only store the one entry in local storage, but managed to get
// user initials and score to be stored and retrieved once - for me that was a victory
// Probably the worst thing I've turned in yet, but I am done fighting with it for now. 
//Will revisit this assignment again at a later date to fix. 
let time = 75;
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
  {
question: 'JavaScript is what kind of language?',
answers: {
    a: 'Strongly typed', 
    b: 'Loosely typed', 
    c:  'Phonetic', 
    d:  'None of the above'
  },
  correctAnswer: 'b'
},
{
question: 'In order to run a function, you must first: ',
answers: {
    a: 'Name it something memorable',
    b: 'List at least 2 arguments', 
    c: 'Call the function', 
    d: 'Verbally threaten the computer'
  },
  correctAnswer: 'c'
},
{
question: 'The contents of an array are enclosed within: ',
answers: {
    a: 'Curly brackets', 
    b: 'Parentheses', 
    c: 'Quotes', 
    d: 'Square brackets'
  },
  correctAnswer: 'd'
},
{
    question: 'Strings in JavaScript must be contained within: ',
    answers: {
        a: 'Double quotation marks', 
        b: 'Single quotation marks', 
        c: 'Either single or double quotation marks', 
        d: 'None of the above'
    },
    correctAnswer: 'c'
},
  {
    question: 'Some common issues students have when learning JavaScript are: ',
    answers: {
        a: 'typos', 
        b: 'forgetting semicolons', 
        c: 'forgetting to call a function', 
        d: 'All of the above'
    },
    correctAnswer: 'd'
  }
];

document.getElementById('submit').setAttribute('hidden', true);

function buildQuiz(){
    const output = [];
    // for each question store the list of answer choices
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        const answers = [];
        //for each available answer add an HTML radio button
        for(letter in currentQuestion.answers){
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}" onclick="showResults()">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        // add question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
    //output list into string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  
  function showResults(){
    // gather answer containers from quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // keep track of user's score
    let score = 0;
    // for each question find selected answer
      myQuestions.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question'+questionNumber+']:checked';
      const userAnswer = (answerContainer.querySelector(selector).value);
      // if answer is correct give points and color green
      if(userAnswer===currentQuestion.correctAnswer){
        score+=15;
        function bonusPoints(){
          if(time>60){
            score+=30;
          }
          else if(time>50){
            score+=20;
          }
          else {
            score+=15;
          } 
        }
        bonusPoints();
        answerContainers[questionNumber].style.color = 'green'
      }
      // if answer is wrong take away points and color red
      else{
        score-=10;
        answerContainers[questionNumber].style.color = 'red';
          time-=15;
    };
    // show score in nav bar
    document.getElementById('score').innerHTML = 'Your score: ' + score;
    // shows score at end of quiz and hides quiz when out of time
    document.getElementById('results').innerHTML = 'Your score: ' + score;
    if(time<=0) {
      document.getElementById('quiz').setAttribute('hidden', true);
    }
    //sets score in local storage - had issues accessing score value elsewhere
    localStorage.setItem('score', score);
      });
};
//way to save player initials to local storage with the score that is saved
//currently only stores the latest initials and score - haven't made it to where
// I can append yet. 
function scoring() {
 var initials = prompt('Enter your initials: ');
  initials = localStorage.setItem('initials', initials);
  var highScore = (localStorage.getItem('initials', initials) + ' : ' + localStorage.getItem('score', score));
  var scoreArray = [highScore]
  document.getElementById('hscore').innerHTML = scoreArray;
}
//hides the highscore div until nav link clicked
document.getElementById('hscore').setAttribute('hidden', true);

//when highscore nav button is clicked it now shows the div where highscores are written to
let scorebtn = document.getElementById('sc-btn');
scorebtn.addEventListener('click', function(){
  document.getElementById('hscore').removeAttribute('hidden', true);
  document.getElementById('hscore').setAttribute('display', true);
})
  //button to start the quiz and hide intro div
  let button = document.getElementById('start');
  button.addEventListener('click', function () {
    event.preventDefault(); 
    document.querySelector('#intro').setAttribute('hidden', true); 
    document.getElementById('submit').removeAttribute('hidden', true);
          //starts the timer, and clears interval after countdown is done
          var timer = setInterval(function () {
              if (time > 0) {
                  time--;
                  document.getElementById('time').textContent = 'Time remaining: ' + time;
              } else {
                  document.getElementById('submitButton').setAttribute('hidden', true);
                  scoring();
                  document.getElementById('time').textContent = "Time's up!"
                  clearInterval(timer);
              }
          }, 1000);
      //calls function to generate the quiz after start button is clicked
      buildQuiz();   
    // on submit, show results
    submitButton.addEventListener('click', function() {
      document.getElementById('submit').setAttribute('hidden', true);
      time = 0;
      document.getElementById('time').textContent = time;
      clearInterval(timer);
      document.getElementById('quiz').setAttribute('hidden', true);
      scoring();
    });
  })
