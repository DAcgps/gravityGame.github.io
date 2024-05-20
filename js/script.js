// async function fetchAndUseIP() {
//     try {
//         const response = await fetch('https://api.ipify.org?format=json');
//         const data = await response.json();
//         console.log('Your Public IP Address:', data.ip);
//         return data.ip;
//     } catch (error) {
//         console.error('Error fetching IP:', error);
//         return null;
//     }
// }
// console.log(fetchAndUseIP());
//
// var ip = fetchAndUseIP().then();
// $(document).click(function() {
//     fetchAndUseIP().then(ip => alert("bum your ip is"+ip));
// })







$(document).ready(function() {
    const allQuestions = [
        {
            question: "What is the acceleration due to gravity on Earth?",
            answers: ["9.8 m/s²", "5 m/s²", "12.5 m/s²", "7.5 m/s²"],
            correct: "9.8 m/s²"
        },
        {
            question: "Who formulated the laws of motion and universal gravitation?",
            answers: ["Albert Einstein", "Galileo Galilei", "Isaac Newton", "Nicolaus Copernicus"],
            correct: "Isaac Newton"
        },
        {
            question: "Which planet has the strongest gravity in our solar system?",
            answers: ["Earth", "Jupiter", "Mars", "Saturn"],
            correct: "Jupiter"
        },
        {
            question: "Gravity on the Moon is about what fraction of Earth's gravity?",
            answers: ["1/2", "1/3", "1/6", "1/8"],
            correct: "1/6"
        },
        {
            question: "What is the term for the point where the gravitational forces of two bodies balance each other?",
            answers: ["Center of Mass", "Gravitational Equilibrium", "Lagrange Point", "Event Horizon"],
            correct: "Lagrange Point"
        },
        {
            question: "What causes tides on Earth?",
            answers: ["Winds", "Sun's Heat", "Moon's Gravity", "Earth's Rotation"],
            correct: "Moon's Gravity"
        },
        {
            question: "Which scientist is known for his theory of general relativity?",
            answers: ["Albert Einstein", "Niels Bohr", "James Clerk Maxwell", "Michael Faraday"],
            correct: "Albert Einstein"
        },
        {
            question: "What is a black hole?",
            answers: ["A star", "A planet", "A region of space where gravity is so strong that nothing can escape", "A type of galaxy"],
            correct: "A region of space where gravity is so strong that nothing can escape"
        },
        {
            question: "What is the escape velocity from Earth?",
            answers: ["7 km/s", "11.2 km/s", "15 km/s", "20 km/s"],
            correct: "11.2 km/s"
        },
        {
            question: "What does the gravitational force depend on?",
            answers: ["Charge", "Mass and distance", "Volume", "Speed"],
            correct: "Mass and distance"
        }
    ];

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function selectRandomQuestions() {
        shuffle(allQuestions);
        questions = allQuestions.slice(0, 5);
    }

    function loadQuestion() {
        const $questionContainer = $('#question-container');
        $questionContainer.empty();

        if (currentQuestionIndex >= questions.length) {
            showResult();
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const $questionElement = $('<div></div>').text(currentQuestion.question);
        $questionContainer.append($questionElement);

        currentQuestion.answers.forEach(answer => {
            const $answerElement = $('<div></div>')
                .addClass('answer')
                .text(answer)
                .on('click', function() {
                    selectAnswer(answer);
                });
            $questionContainer.append($answerElement);
        });
    }

    function selectAnswer(answer) {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correct) {
            score++;
        }
        currentQuestionIndex++;
        loadQuestion();
    }

    function showResult() {
        const $questionContainer = $('#question-container');
        $questionContainer.empty();
        const $resultElement = $('#result');
        $resultElement.text(`You scored ${score} out of ${questions.length}!`);

        if (score === 5) {
            $('body').css('background-color', '#ffeb3b'); // Change background color to yellow
            const $specialMessage = $('<div></div>')
                .addClass('special-message')
                .text('Perfect Score! Congratulations!');
            $('#game').append($specialMessage);

            // Add confetti
            for (let i = 0; i < 100; i++) {
                const $confetti = $('<div></div>').addClass('confetti');
                $confetti.css({
                    left: Math.random() * 100 + 'vw',
                    top: Math.random() * -20 + 'vh',
                    animationDuration: Math.random() * 3 + 2 + 's'
                });
                $('body').append($confetti);
            }
        }

        $('#play-again').show();
    }

    function resetGame() {
        currentQuestionIndex = 0;
        score = 0;
        $('#result').empty();
        $('#play-again').hide();
        $('.special-message').remove();
        $('.confetti').remove();
        $('body').css('background-color', '#f0f8ff'); // Reset background color
        selectRandomQuestions();
        loadQuestion();
    }

    $('#play-again').on('click', function() {
        resetGame();
    });

    // Initial setup
    selectRandomQuestions();
    loadQuestion();
});

