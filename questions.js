const quizContainer = document.getElementById('quiz');
const myQuestions = [
    {
        question: 'JavaScript is what kind of language?',
        answers: {
            a: 'Strongly typed',
            b: 'Loosely typed',
            c: 'Phonetic',
            d: 'None of the above'
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
    },
];

function buildQuiz(){
//to store the HTML output
  const output = [];

  // for each question store the list of answer choices
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {
      const answers = [];

      //for each answer add an HTML radio button
      for(letter in currentQuestion.answers){
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

  //combine output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

let button = document.getElementById('start');

button.addEventListener('click', function () {
    event.preventDefault();
    document.querySelector('#intro').setAttribute('hidden', true);
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
