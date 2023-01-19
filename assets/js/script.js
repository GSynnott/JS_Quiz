var h1El = document.getElementById("header-title");
var titleDiv = document.getElementById("title");
var startQuizButton = document.getElementById("start-Quiz");
var timerEl = document.getElementById("countdown");
var answerButtons = document.querySelectorAll(".alternative");
var questionAnswerEl = document.getElementById("QA");
var enterHSEl = document.getElementById("Enter-Score");
var enterHSListingEl = document.getElementById("Score-Listing");
var enterHSButtonEl = document.getElementById("Enter-Score-Button");
var enterHSNameEl = document.getElementById("High-Score-Name");
var displayHSListEl = document.getElementById("display-High-Scores");
var displayHSButton = document.getElementById("HSButton");
var qNum;
var timeInterval;
var currentScore = 0;
var highScoresListJSON = localStorage.getItem("Scores");
var highScoresList = JSON.parse(localStorage.getItem("Scores"));
var myQuestions = [
	{
		question: "1. What is 10/2?",
		alternatives: ["A1", "A2", "A3", "A4"],
		correctAnswer: 0
	},
	{
		question: "2. What is 10/2?",
		alternatives: ["A1", "A2", "A3", "A4"],
		correctAnswer: 0
	},
    {
		question: "3. What is 10/2?",
		alternatives: ["A1", "A2", "A3", "A4"],
		correctAnswer: 0
	},
    {
		question: "4. What is 10/2?",
		alternatives: ["A1", "A2", "A3", "A4"],
		correctAnswer: 0
	},
    {
		question: "5. What is 10/2?",
		alternatives: ["A1", "A2", "A3", "A4"],
		correctAnswer: 0
	}
];

function countdown() {
    timeLeft = 60;
    timeInterval = setInterval(function (){
        if (timeLeft > 0){
            timerEl.innerHTML = "Time Remaining: " + timeLeft;
        } else {
            timerEl.innerHTML = "";
            clearInterval(timeInterval);
            diplayGameOverMessage();
        }
        timeLeft--;
    }, 1000);
}

function diplayGameOverMessage() {
    h1El.innerHTML = "GAME OVER"
}

function startQuiz() {
    qNum = 0;
    currentScore = 0;
    startQuizButton.style.display = "none";
    showQuestion(qNum);
    countdown();
    questionAnswerEl.style.display = 'block';
}

function showQuestion(qNum){
    titleDiv.innerHTML = myQuestions[qNum].question;
    answerButtons.forEach(function(element, index){
        element.innerHTML = myQuestions[qNum].alternatives[index];
        
        function clicked(){
            if(myQuestions[qNum].correctAnswer === index){
                console.log("Correct Answer");
                currentScore += 10;
            } else {
                console.log("Wrong Answer");
            }
            console.log(currentScore);
            nextQuestion();
        }
        element.addEventListener("click", clicked);
        if (qNum != 0){
            element.removeEventListener("click", clicked, false);
        }
    });
}

function nextQuestion(){
    qNum++;
    if(qNum > 4){
        clearInterval(timeInterval);
        currentScore += timeLeft;
        console.log(currentScore);
        goToHighscoreInput();
    } else {
        showQuestion(qNum);
    }
}

function goToHighscoreInput(){
    questionAnswerEl.style.display = "none";
    enterHSEl.style.display = "block";
    enterHSListingEl.innerHTML = "Score: " + currentScore
    enterHSButtonEl.innerHTML = "Submit Score";
    enterHSButtonEl.addEventListener("click", function(){
        if (enterHSNameEl.value == ""){
            alert("Please enter in a name");
        } else{
            console.log(enterHSNameEl.value);
            console.log(highScoresList);
            newScore = {name: enterHSNameEl.value, score: currentScore};
            console.log(newScore);

            highScoresListJSON.name[enterHSButtonEl] = currentScore;
            console.log(highScoresListJSON);
        }
    })
}

function displayHS(){
    questionAnswerEl.style.display = "none";
    enterHSEl.style.display = "none";
    displayHSListEl.style.direction = "block";
}

displayHSButton.addEventListener("click", displayHS);
startQuizButton.addEventListener("click", startQuiz);