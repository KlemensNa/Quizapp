let v = 0;
let score = 0;

function init() {
    document.getElementById('cardContain').innerHTML = /*html*/`
        <div id="menu" class="card">
            <img src="/img/Quizapp/logo.png" alt="">
            <div id="menuList">
                <h3 id="egypt" class="category" onclick="getReadyToStart('egypt')">Ägypten</h3>
                <h3 id="sports" class="category" onclick="getReadyToStart('sports')">Sport</h3>
                <h3 id="it" class="category" onclick="getReadyToStart('it')">IT</h3>
                <h3 id="movies" class="category" onclick="getReadyToStart('movies')">Filme</h3>
            </div>
        </div>

        <div id="startscreen" class="card">
            <div id="startText">
                <h2>Welcome to this Quiz</h2>
                <h3>Select your Category and start!</h3>
            </div>
            <div id="startButton"></div>
        </div>
    `
}


function getReadyToStart(id) {
    deleteActiveCategory();
    activateCategory(id);
    createStartbutton();
}


function deleteActiveCategory() {
    document.getElementById("egypt").classList.remove('active');
    document.getElementById("sports").classList.remove('active');
    document.getElementById("it").classList.remove('active');
    document.getElementById("movies").classList.remove('active');
}

function activateCategory(id) {
    let activeCategory = document.getElementById(`${id}`);
    activeCategory.classList.add('active');
}

function createStartbutton() {
    document.getElementById('startButton').innerHTML = /*html*/`
        <button type="button" id="startBtn" class="btn" onclick="startQuiz()">Start Quiz</button>
    `
}

function startQuiz() {
    blockCategoryButtons();
    createPlayscreen();
    showQuestionAmount();
    renderQuestion(v);
}


function blockCategoryButtons() {
    var nodes = document.getElementById("menuList").getElementsByTagName('*');
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.add('disableAnswers');
    }
}


function createPlayscreen() {
    document.getElementById('startscreen').innerHTML = /*html*/`
        <div class="card" id="playscreen" >
            <!-- <img src="/img/quiztheme.jpg" class="card-img-top">             -->
            <h2 id="question">Frage Zahl???</h2>
            <div id="answerCards">
                
                <div class="card answer">
                    <div class="card-body" id="answer1" onclick="lockinAnswer(id)">
                        Answer 1
                    </div>
                </div>

                <div class="card answer">
                    <div class="card-body" id="answer2" onclick="lockinAnswer(id)">
                        Answer 2
                    </div>
                </div>

                <div class="card answer">
                    <div class="card-body" id="answer3" onclick="lockinAnswer(id)">
                        Answer 3
                    </div>
                </div>

                <div class="card answer">
                    <div class="card-body" id="answer4" onclick="lockinAnswer(id)">
                        Answer 4
                    </div>
                </div>
            </div>
            <div class="cardFooter">
                <div><b id="actualNumber">1 </b> von <b id="questionsAmount"> </b> Fragen</div>
                <div id="buttonAnswer"></div>
            </div>

        </div>
    `
}


function showQuestionAmount() {
    let questionsAmount = document.getElementById('questionsAmount');
    let amount = questions.length;

    questionsAmount.innerHTML = /*html*/`
        ${amount}
    `}


function renderQuestion(v) {
    
    let q = questions[v];
    
    showQuestion(q);
    renderAnswers(q);
    showActualQuestionNumber(v);
    disableAnswerButton();
}


function showQuestion(q){

    document.getElementById('question').innerHTML = /*html*/`
        ${q['question']}
        `
}


function renderAnswers(q) {
    document.getElementById('answer1').innerHTML = q["answer1"];
    document.getElementById('answer2').innerHTML = q["answer2"];
    document.getElementById('answer3').innerHTML = q["answer3"];
    document.getElementById('answer4').innerHTML = q["answer4"];
    unlockAnswerButtons();
}


function showActualQuestionNumber(v) {
    let actualNumber = v + 1;

    document.getElementById('actualNumber').innerHTML = /*html*/`
        ${actualNumber}
    `
}


function disableAnswerButton() {
    document.getElementById('buttonAnswer').innerHTML = "";
}


function unlockAnswerButtons() {
    for (let j = 1; j <= 4; j++) {
        document.getElementById(`answer${j}`).classList.remove('disableAnswers');
    }
}


function lockinAnswer(id) {
    createAnswerButton(id);
    lock(id);
}


function createAnswerButton(id) {
    let button = document.getElementById('buttonAnswer');

    button.innerHTML = /*html*/ `
            <button id="answerBtn" type="button" class="btn btn-warning" onclick="givenAnswer('${id}')">Antworten</button>
        `
}


function lock(id) {
    deleteLockedAnswer();
    let answerCard = document.getElementById(`${id}`);
    answerCard.classList.add('bg-locked');
}


function deleteLockedAnswer() {
    document.getElementById(`answer1`).classList.remove('bg-locked');
    document.getElementById(`answer2`).classList.remove('bg-locked');
    document.getElementById(`answer3`).classList.remove('bg-locked');
    document.getElementById(`answer4`).classList.remove('bg-locked');
}


function givenAnswer(id) {

    let rightAnswer = questions[v]["right_answer"];
    let givenAnswer = id.slice(-1);
    let correctAnswerFullName = `answer${rightAnswer}`;
    let button = document.getElementById('buttonAnswer');

    if (rightAnswer == givenAnswer) {
        document.getElementById(id).parentNode.classList.add('bg-success');
        correct(button)
    } else {
        document.getElementById(id).parentNode.classList.add('bg-danger');
        document.getElementById(correctAnswerFullName).parentNode.classList.add('bg-success');
        wrong(button);
    }

    blockAnswerButtons()


}


function blockAnswerButtons() {
    for (let j = 1; j <= 4; j++) {
        document.getElementById(`answer${j}`).classList.add('disableAnswers');
    }
}


function correct(button) {
    score++;
    if (checkForEnd() == true) {
        button.innerHTML = /*html*/ `
        <button id="nextQuestionButton" type="button" class="btn btn-success" onclick="finishedQuiz()">Spiel beenden</button>
    `;
    } else {
        button.innerHTML = /*html*/ `
        <button id="nextQuestionButton" type="button" class="btn btn-success" onclick="nextQuestion()">Nächste Frage</button>
    `;
        
    }
}


function wrong(button) {
    if (checkForEnd() == true) {
        button.innerHTML = /*html*/ `
        <button id="nextQuestionButton" type="button" class="btn btn-success" onclick="finishedQuiz()">Spiel beenden</button>
    `;
    } else {
        button.innerHTML = /*html*/ `
        <button id="nextQuestionButton" type="button" class="btn btn-success" onclick="nextQuestion()">Nächste Frage</button>
    `;
    }
}


function checkForEnd() {
    v++;
    if (v == questions.length) {
        return true;
    } else {
        return false;
    }
}


function nextQuestion() {
    renderQuestion(v);
    //in eigene Funtion und immer iweder benutzen --> deleteLocked Answer kann gelöscht werden
    for (let j = 1; j <= 4; j++) {
        document.getElementById(`answer${j}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer${j}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer${j}`).classList.remove('bg-locked');
    }
}


function finishedQuiz() {
    document.getElementById('startscreen').innerHTML = /*html*/`
        <div id="endscreen" class="card">
            <img src="./img/Quizapp/brain result.png" alt="">
            <h2>You completed the Quiz</h2>
            <div id="score">
                <b id="scoreText">YOUR SCORE</b>
                <div><b id="finalScore">${score}</b><b>/</b><b id="maxScore">${v}</b></div>
            </div>
            <div id="twoButtons">
                <button type="button" class="btn btn-primary">Share</button>
                <button type="button" class="btn btn-secondary" onclick="startAgain()">Quiz it Again</button>
            </div>
        </div>
    `
}


function startAgain() {
    v = 0;
    score = 0;
    init();
}





