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

const questions = [
    {
        question: 'JavaScript is what kind of language?',
        choices: ['Strongly typed', 'Loosely typed', 'Phonetic', 'None of the above'],
        answer: 'Loosely typed'
    },
    {
        question: 'In order to run a function, you must first: ',
        choices: ['Name it something memorable', 'List at least 2 arguments', 'Call the function', 'Verbally threaten the computer'],
        answer: 'Call the function'
    },
    {
        question: 'The contents of an array are enclosed within: ',
        choices: ['Curly brackets', 'Parentheses', 'Quotes', 'Square brackets'],
        answer: 'Square brackets'
    },
    {
        question: 'Strings in JavaScript must be contained within: ',
        choices: ['Double quotation marks', 'Single quotation marks', 'Either single or double quotation marks', 'None of the above'],
        answer: 'Either single or double quotation marks'
    },
    {
        question: 'Some common issues students have when learning JavaScript are: ',
        choices: ['typos', 'forgetting semicolons', 'forgetting to call a function', 'All of the above'],
        answer: 'All of the above'
    },
];