const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
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
    // we'll need a place to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }
  
  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
  
    // keep track of user's answers
    let numCorrect = 0;
  
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question'+questionNumber+']:checked';
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      // if answer is correct
      if(userAnswer===currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;
  
        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
  
    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
  }
  

 
  let button = document.getElementById('start');

  button.addEventListener('click', function () {
      event.preventDefault();
      document.querySelector('#intro').setAttribute('hidden', true); 
          // display quiz right away
 buildQuiz();   
  
 // on submit, show results
 submitButton.addEventListener("click", showResults);

      let time = 75;
      var timer = setInterval(function () {
          if (time > 0) {
              time--;
              document.getElementById('time').textContent = time;
          } else {
              document.getElementById('time').textContent = "Time's up!"
              clearInterval(timer);
          }
      }, 1000);
  })
