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
              <input type="radio" name="question${questionNumber}" value="${letter}">
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
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    // keep track of user's score
    let score = 0;
    // for each question find selected answer
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question'+questionNumber+']:checked';
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      // if answer is correct give points
      if(userAnswer===currentQuestion.correctAnswer){
        score+=15;
      }
      // if answer is wrong or blank color the answers red
      else{
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    // show score out of total
    document.getElementById('score').innerHTML = 'Your score: ' + score;
  }
  
  //button to start the quiz and hide intro div
  let button = document.getElementById('start');

  button.addEventListener('click', function () {
    event.preventDefault(); 
    document.querySelector('#intro').setAttribute('hidden', true); 
          //starts the timer, and clears interval after countdown is done
          let time = 75;
          var timer = setInterval(function () {
              if (time > 0) {
                  time--;
                  document.getElementById('time').textContent = 'Time remaining: ' + time;
              } else {
                  document.getElementById('time').textContent = "Time's up!"
                  clearInterval(timer);
              }
          }, 1000);
      //calls function to generate the quiz after start button is clicked
      buildQuiz();   
    // on submit, show results
    submitButton.addEventListener('click', showResults);
  })
