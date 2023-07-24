//  Getting DOM Elements
const questionContainer = document.getElementById('question-container');
const AnswerContainer = document.getElementById('answer-container');
const optionsContainer = Array.from(document.getElementsByTagName('span'));
const correctAnswer = document.querySelector('.correctAnswer');
const Timer = document.querySelector('.timer');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.highScore');
const submitButton = document.getElementsByTagName('button')[0];
const nextButton = document.querySelector('.next');
const buttons = document.querySelector('.buttons');
const questionsAmount = document.getElementById('questionsAmount');


let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
//  Logic to select an Element
const selectingElement = (clas) => {
    for (let i = 0; i < optionsContainer.length; i++) {
        optionsContainer[i].addEventListener('click', () => {
            for (let j = 0; j < optionsContainer.length; j++) {
                if (i === j) {
                    optionsContainer[j].classList.toggle(clas);
                } else {
                    optionsContainer[j].classList.remove(clas);
                }
            }
        });
    }
}

//  Questions , Answers and Options Arrays
const questions = ['Q1. Which country is in East of Pakistan? ',
    'Q2. Which language is used to give logic to Websites? ',
    'Q3. Which Continent has highest population? ',
    'Q4. Which planet in the Solar System is known as Red Planet?',
    'Q5. Who is the current President of America?',
    'Q6. What are the dimensions of Work? ',
    'Q7. Which city is known as California of Pakistan? ',
    'Q8. What was the name of Leader of Muslim League who presented the Lahore Resolution?',
    'Q9. What is the Capital of Turkiye?',
    'Q10. In which year the Present constitution of Pakistan was Presented?'];
const options1 = ['A. Pakistan', 'B. India', 'C. Iran', 'D. China'];
const options2 = ['A. Python', 'B. HTML', 'C. CSS', 'D. JavaScript'];
const options3 = ['A. North America', 'B. Asia', 'C. Europe', 'D. Africa'];
const options4 = ['A. Mars', 'B. Jupiter', 'C. Mercury', 'D. Venus'];
const options5 = ['A. Nancy Pelosi', 'B. Bill Clinton', 'C. Donald Trump', 'D. Joe Biden'];
const options6 = ['A. M2L1T-2', 'B. M1L2T-2', 'C. L2T-1', 'D. LT-1'];
const options7 = ['A. Lahore', 'B. Islamabad', 'C. Sargodha', 'D. Faisalabad'];
const options8 = ['A. A.K Fazal ul Haq', 'B. Abdul Kalam Azad', 'C. Liaquat Ali Khan', 'D. Chaudhry Rehmat Ali'];
const options9 = ['A. Antalya', 'B. Bursa', 'C. Ankara', 'D. Istanbul'];
const options10 = ['A. 1962', 'B. 1956', 'C. 1973', 'D. 1972'];
const answers = ['B. India', 'D. JavaScript', 'B. Asia', 'A. Mars', 'D. Joe Biden', 'B. M1L2T-2', 'C. Sargodha', 'A. A.K Fazal ul Haq', 'C. Ankara', 'C. 1973'];


//  Placing Questions in container
const placeQuestions = (questionindex) => {
    questionContainer.innerText = `${questions[questionindex]}`
}


//  Putting answers in container
const placeAnswers1 = (a, b, c, d) => {
    for (let i = c; i < d; i++) {
        a[i].innerHTML = `${b[i]}`
    }
}


//  Adding Timer for Questions
const getTimer = (timevalue) => {
    let i = timevalue;
    let timerid = setInterval(() => {
        Timer.innerHTML = `Time Remaining: ${i} Seconds`
        i--
        if (i < 0) {
            clearInterval(timerid)
            questionContainer.hidden = true
            AnswerContainer.remove()
            buttons.remove()
            Timer.hidden = true
            correctAnswer.innerHTML = `<h1>Game Over</h1>`
            questionsAmount.hidden = true
        }
    }, 1000)
}


//  Answer Checking Function
const answerChecking = (index) => {
    let selectedOption = document.querySelector('.selected');
    if (selectedOption.textContent === answers[index]) {
        correctAnswer.innerText = `Congratulations! Correct Answer`
        score += 10

    } else if (selectedOption.textContent !== answers[index]) {
        correctAnswer.innerText = `Wrong Answer`
        score = score
    }
    highScore = (score >= highScore) ? score : highScore;
    localStorage.setItem('highScore', highScore);
}


//  Main Function to Display all Data
const mainData = (question, optionsArray, answerrange1, answerrange2, index) => {
    placeQuestions(question);
    placeAnswers1(optionsContainer, optionsArray, answerrange1, answerrange2);
    submitButton.onclick = function () {
        answerChecking(index)
        scoreElement.innerHTML = `Score: ${score}`
        highScoreElement.innerHTML = `High Score: ${highScore}`
    }
}
let currentQuestionIndex = 0;
mainData(currentQuestionIndex, options1, 0, 4, 0);
getTimer(200);
selectingElement('selected');


//  Next Button Function
nextButton.onclick = async function () {
    correctAnswer.innerHTML = ``
    submitButton.disabled = false;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        function NextButton(currentQuestionIndex, option, answerrange1, answerrange2, index) {
            mainData(currentQuestionIndex, option, answerrange1, answerrange2, index);
            for (let i = 0; i < optionsContainer.length; i++) {
                optionsContainer[i].classList.remove('selected');
                optionsContainer[i].addEventListener('click', (index) => {
                    return () => {
                        for (let j = 0; j < optionsContainer.length; j++) {
                            if (index === j) {
                                optionsContainer[j].classList.toggle('selected');
                            } else {
                                optionsContainer[j].classList.remove('selected');
                            }
                        }
                    };
                })(i);
            }
        }
        const options = {
            1: { option: options2, index: 1 },
            2: { option: options3, index: 2 },
            3: { option: options4, index: 3 },
            4: { option: options5, index: 4 },
            5: { option: options6, index: 5 },
            6: { option: options7, index: 6 },
            7: { option: options8, index: 7 },
            8: { option: options9, index: 8 },
            9: { option: options10, index: 9 },
        };

        if (options.hasOwnProperty(currentQuestionIndex)) {
            const { option, index } = options[currentQuestionIndex];
            NextButton(currentQuestionIndex, option, 0, 4, index);
        }
    }
    else if (currentQuestionIndex === questions.length) {
        questionContainer.hidden = true
        AnswerContainer.remove()
        buttons.remove()
        questionsAmount.hidden = true
        Timer.hidden = true
        correctAnswer.innerHTML = `<h1>Game Over</h1>`
    }
}
