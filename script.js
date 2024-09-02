// Array of quiz objects, each containing questions, answers, and a corresponding word
const quizzes = [
    {
        questions: [
            "What is the color of the sky?", 
            "What do bees produce?", 
            "How many legs does a spider have?", 
            "What is the capital of France?"
        ],
        answers: ["blue", "honey", "8", "paris"],
        word: "sky"
    },
    {
        questions: [
            "What is 2+2?", 
            "What planet do we live on?", 
            "What is H2O?", 
            "What is the largest mammal?"
        ],
        answers: ["4", "earth", "water", "blue whale"],
        word: "water"
    },
    {
        questions: [
            "What shape has 3 sides?", 
            "What gas do plants absorb?", 
            "What is the square root of 9?", 
            "What is the largest organ in the human body?"
        ],
        answers: ["triangle", "carbon dioxide", "3", "skin"],
        word: "triangle"
    },
    {
        questions: [
            "What is the speed of light?", 
            "What is the boiling point of water?", 
            "What does DNA stand for?", 
            "What is the hardest natural substance?"
        ],
        answers: ["299792458", "100", "deoxyribonucleic acid", "diamond"],
        word: "diamond"
    }
];

let currentQuizIndex = -1;
let currentQuestionIndex = 0;
let collectedWords = [];

// Start a quiz by showing the first question of the selected quiz
function startQuiz(index) {
    currentQuizIndex = index;
    currentQuestionIndex = 0;
    document.querySelector(".box-container").style.display = "none";
    document.querySelector(".quiz").style.display = "block";
    showQuestion();
}

// Display the current question
function showQuestion() {
    document.getElementById("question").textContent = quizzes[currentQuizIndex].questions[currentQuestionIndex];
    document.getElementById("answer").value = "";
}

// Submit an answer and check if it is correct
function submitAnswer() {
    const answer = document.getElementById("answer").value.trim().toLowerCase();
    if (answer === quizzes[currentQuizIndex].answers[currentQuestionIndex].toLowerCase()) {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizzes[currentQuizIndex].questions.length) {
            showQuestion();
        } else {
            const word = quizzes[currentQuizIndex].word;
            collectedWords.push(word);
            document.getElementById("wordDisplay").textContent = `You've earned the word: ${word}`;
            document.querySelector(".quiz").style.display = "none";
            document.querySelector(".word").style.display = "block";
        }
    } else {
        alert("Incorrect answer, please try again.");
    }
}

// Return to the main box selection after completing a quiz
function returnToBoxes() {
    document.querySelector(".word").style.display = "none";
    document.querySelector(".box-container").style.display = "flex";
    if (collectedWords.length === quizzes.length) {
        document.querySelector(".box-container").style.display = "none";
        document.querySelector(".final").style.display = "block";
    }
}

// Check the final sentence by sending it to the backend
function checkFinalSentence() {
    const finalSentence = document.getElementById("finalSentence").value.trim().toLowerCase();
    fetch('http://localhost:3000/check-sentence', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence: finalSentence })
    })
    .then(response => response.json())
    .then(data => {
        if (data.correct) {
            document.getElementById("finalResult").textContent = `Correct! The place is: ${data.place}`;
        } else {
            document.getElementById("finalResult").textContent = "Incorrect! Please try again.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("finalResult").textContent = "An error occurred. Please try again later.";
    });
}
