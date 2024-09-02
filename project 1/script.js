const easyQuestions = [
    { question: "What is the capital of France?", a: "Berlin", b: "Madrid", c: "Paris", d: "Rome", correct: "c" },
    { question: "Which planet is closest to the Sun?", a: "Earth", b: "Venus", c: "Mercury", d: "Mars", correct: "c" },
    { question: "How many continents are there?", a: "5", b: "6", c: "7", d: "8", correct: "c" },
    { question: "What is the largest mammal?", a: "Elephant", b: "Blue Whale", c: "Giraffe", d: "Rhino", correct: "b" },
    { question: "What is the boiling point of water?", a: "90°C", b: "100°C", c: "120°C", d: "80°C", correct: "b" },
    { question: "Which is the longest river in the world?", a: "Amazon River", b: "Nile River", c: "Yangtze River", d: "Mississippi River", correct: "b" },
    { question: "What is the currency of Japan?", a: "Yuan", b: "Won", c: "Yen", d: "Ringgit", correct: "c" },
    { question: "Who is the author of 'Harry Potter'?", a: "J.K. Rowling", b: "J.R.R. Tolkien", c: "Stephen King", d: "George R.R. Martin", correct: "a" },
    { question: "What gas do plants use for photosynthesis?", a: "Oxygen", b: "Carbon Dioxide", c: "Nitrogen", d: "Hydrogen", correct: "b" },
    { question: "Which animal is known as the 'King of the Jungle'?", a: "Tiger", b: "Lion", c: "Elephant", d: "Giraffe", correct: "b" }
];

const normalQuestions = [
    { question: "Who wrote '1984'?", a: "George Orwell", b: "Aldous Huxley", c: "Ray Bradbury", d: "Jules Verne", correct: "a" },
    { question: "What is the square root of 144?", a: "10", b: "12", c: "14", d: "16", correct: "b" },
    { question: "Which is the smallest country in the world?", a: "Monaco", b: "Vatican City", c: "San Marino", d: "Malta", correct: "b" },
    { question: "What element does 'O' represent on the periodic table?", a: "Oxygen", b: "Osmium", c: "Oganesson", d: "Oxygenium", correct: "a" },
    { question: "What is the hardest natural substance on Earth?", a: "Gold", b: "Diamond", c: "Platinum", d: "Graphene", correct: "b" },
    { question: "Which planet is known as the Red Planet?", a: "Earth", b: "Mars", c: "Jupiter", d: "Saturn", correct: "b" },
    { question: "What is the capital of Canada?", a: "Toronto", b: "Vancouver", c: "Ottawa", d: "Montreal", correct: "c" },
    { question: "What is the largest organ in the human body?", a: "Heart", b: "Liver", c: "Skin", d: "Lung", correct: "c" },
    { question: "Which artist painted the Mona Lisa?", a: "Leonardo da Vinci", b: "Vincent van Gogh", c: "Claude Monet", d: "Pablo Picasso", correct: "a" },
    { question: "What is the chemical symbol for Gold?", a: "Au", b: "Ag", c: "Pb", d: "Fe", correct: "a" }
];

const hardQuestions = [
    { question: "What is the chemical formula for table salt?", a: "NaCl", b: "KCl", c: "NaF", d: "CaCl", correct: "a" },
    { question: "Who developed the theory of relativity?", a: "Isaac Newton", b: "Albert Einstein", c: "Nikola Tesla", d: "Galileo Galilei", correct: "b" },
    { question: "What is the longest river in the world?", a: "Amazon River", b: "Nile River", c: "Yangtze River", d: "Mississippi River", correct: "b" },
    { question: "Which element has the atomic number 1?", a: "Helium", b: "Lithium", c: "Hydrogen", d: "Oxygen", correct: "c" },
    { question: "Who painted the Sistine Chapel ceiling?", a: "Leonardo da Vinci", b: "Michelangelo", c: "Raphael", d: "Donatello", correct: "b" },
    { question: "What is the capital of Mongolia?", a: "Ulaanbaatar", b: "Astana", c: "Tashkent", d: "Baku", correct: "a" },
    { question: "What is the largest desert in the world?", a: "Sahara", b: "Gobi", c: "Kalahari", d: "Antarctica", correct: "d" },
    { question: "What is the speed of light in a vacuum?", a: "300,000 km/s", b: "150,000 km/s", c: "1,000,000 km/s", d: "600,000 km/s", correct: "a" },
    { question: "Who was the first person to climb Mount Everest?", a: "Edmund Hillary", b: "Tenzing Norgay", c: "George Mallory", d: "Sir Robert Falcon Scott", correct: "a" },
    { question: "What is the capital of Burkina Faso?", a: "Ouagadougou", b: "Accra", c: "Lima", d: "Abuja", correct: "a" }
];


let currentQuestions = [];
let currentQuiz = 0;
let score = 0;
let selectedAnswer = '';

// Add event listeners for buttons
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        startQuiz(this.getAttribute('data-mode'));
    });
});

function startQuiz(mode) {
    if (mode === 'easy') {
        currentQuestions = [...shuffleArray(easyQuestions)];
    } else if (mode === 'normal') {
        currentQuestions = [...shuffleArray(normalQuestions)];
    } else if (mode === 'hard') {
        currentQuestions = [...shuffleArray(hardQuestions)];
    }

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuiz();
}

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = currentQuestions[currentQuiz];

    document.getElementById('question').innerText = currentQuizData.question;
    document.getElementById('a_text').innerText = currentQuizData.a;
    document.getElementById('b_text').innerText = currentQuizData.b;
    document.getElementById('c_text').innerText = currentQuizData.c;
    document.getElementById('d_text').innerText = currentQuizData.d;
}

function deselectAnswers() {
    selectedAnswer = '';
    document.querySelectorAll('.option').forEach(option => {
        option.style.backgroundColor = '#222254';
    });
}

function selectAnswer(option) {
    deselectAnswers();
    document.getElementById(option).style.backgroundColor = '#3e3e75';
    selectedAnswer = option;
}

function submitAnswer() {
    if (selectedAnswer) {
        if (selectedAnswer === currentQuestions[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < currentQuestions.length) {
            loadQuiz();
        } else {
            document.getElementById('quiz').innerHTML = `
                <h2>You answered ${score}/${currentQuestions.length} questions correctly</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// script.js

// script.js

// script.js

let timer;
let timeLeft = 300; // 5 minutes in seconds
let timerRunning = false;
let previousQuestions = [];



function startQuiz(mode) {
    timeLeft = 300;
    document.getElementById('timer').innerText = 'Time Left: 5:00';
    startTimer();

    if (mode === 'easy') {
        currentQuestions = [...shuffleArray(easyQuestions)];
    } else if (mode === 'normal') {
        currentQuestions = [...shuffleArray(normalQuestions)];
    } else if (mode === 'hard') {
        currentQuestions = [...shuffleArray(hardQuestions)];
    }

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuiz();
}

function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz(); // Automatically end the quiz when time is up
        }
    }, 1000);
}

function loadQuiz() {
    deselectAnswers();
    document.getElementById('next').style.display = 'block'; // Show Next button
    document.getElementById('undo').style.display = 'block'; // Show Undo button
    document.getElementById('submit').style.display = 'none'; // Hide Submit button initially

    const currentQuizData = currentQuestions[currentQuiz];
    previousQuestions.push(currentQuizData); // Save current question for undo

    document.getElementById('question').innerText = currentQuizData.question;
    document.getElementById('a_text').innerText = currentQuizData.a;
    document.getElementById('b_text').innerText = currentQuizData.b;
    document.getElementById('c_text').innerText = currentQuizData.c;
    document.getElementById('d_text').innerText = currentQuizData.d;
}

function deselectAnswers() {
    selectedAnswer = '';
    document.querySelectorAll('.option').forEach(option => {
        option.style.backgroundColor = '#222254';
    });
}

function selectAnswer(option) {
    deselectAnswers();
    document.getElementById(option).style.backgroundColor = '#3e3e75';
    selectedAnswer = option;
}

function nextQuestion() {
    if (selectedAnswer) {
        if (selectedAnswer === currentQuestions[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < currentQuestions.length) {
            loadQuiz();
        } else {
            document.getElementById('next').style.display = 'none';
            document.getElementById('undo').style.display = 'none';
            document.getElementById('submit').style.display = 'block'; // Show Submit button
        }
    }
}

function undoQuestion() {
    if (previousQuestions.length > 1) {
        currentQuiz--;
        previousQuestions.pop(); // Remove the current question
        const previousQuestion = previousQuestions[previousQuestions.length - 1];
        document.getElementById('question').innerText = previousQuestion.question;
        document.getElementById('a_text').innerText = previousQuestion.a;
        document.getElementById('b_text').innerText = previousQuestion.b;
        document.getElementById('c_text').innerText = previousQuestion.c;
        document.getElementById('d_text').innerText = previousQuestion.d;
        deselectAnswers();
        selectedAnswer = '';
    }
}

function submitQuiz() {
    endQuiz(); // Finalize the quiz
}

function endQuiz() {
    document.getElementById('quiz').innerHTML = `
        <h2>You answered ${score}/${currentQuestions.length} questions correctly</h2>
        <button onclick="location.reload()">Reload</button>
    `;
    clearInterval(timer); // Clear timer when quiz ends
    timerRunning = false;
}
