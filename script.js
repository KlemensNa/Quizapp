let v = 0;
let score = 0;

function init() {
    document.getElementById('cardContain').innerHTML = /*html*/`
        <div id="menu" class="card">
            <img src="img/Quizapp/logo.png" alt="" onclick="init()">
            <div id="menuList">
                <h3 id="egypt" class="category" onclick="getReadyToStart(id, 'one')">Ägypten</h3>
                <h3 id="sports" class="category" onclick="getReadyToStart(id, 'two')">Sport</h3>
                <h3 id="it" class="category" onclick="getReadyToStart(id, 'three')">IT</h3>
                <h3 id="movies" class="category" onclick="getReadyToStart(id, 'four')">Filme</h3>
                <button type="button" id="close" class="btn" onclick="toggleSelectionMenu()">Close</button>                
            </div>
            <div id="burgerMenu" onclick="toggleSelectionMenu()">
                    <p></p>
                    <p></p>
                    <p></p>
            </div>
        </div>

        <div id="startscreen" class="card">
            <div id="startText">
                <h2>Welcome to this Quiz</h2>
                <h3 id="showCategory">Select your Category and start!</h3>
            </div>
            <div id="startButton"></div>
        </div>
    `
}


function getReadyToStart(id, a) {
    deleteActiveCategory();
    activateCategory(id);
    updateStartscreen(id);
    createStartbutton(id, a);
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


function updateStartscreen(id){
    let category = document.getElementById(`${id}`).innerHTML;
    let categoryField = document.getElementById('showCategory');

    categoryField.innerHTML = `<b>${category}</b>`;
}


function createStartbutton(id, a) {
    document.getElementById('startButton').innerHTML = /*html*/`
        <button type="button" id="startBtn" class="btn" onclick="startQuiz('${id}', ${a}, '${a}')">Start Quiz</button>
    `
}


function startQuiz(id, a, aString) {
    blockCategoryButtons();
    createPlayscreen(aString);
    showQuestionAmount(a);
    renderQuestion(v, a);
    blockBurgerMenu();
}


function blockCategoryButtons() {
    var buttons = document.getElementById("menuList");
        buttons.innerHTML = '';
        buttons.classList.add('d-none');
}


function createPlayscreen(a) {
    document.getElementById('startscreen').innerHTML = /*html*/`
        <div class="card" id="playscreen">
            <div class="progress" id="progressBar" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: 25%">25%</div>
            </div>
            <h2 id="question">Frage Zahl???</h2>
            <div id="answerCards">
                
                <div class="card answer">
                    <div class="card-body" id="answer1" onclick="chooseAnswer(id, '${a}')">
                        Answer 1
                    </div>
                </div>

                <div class="card answer">
                    <div class="card-body" id="answer2" onclick="chooseAnswer(id, '${a}')">
                        Answer 2
                    </div>
                </div>

                <div class="card answer">
                    <div class="card-body" id="answer3" onclick="chooseAnswer(id, '${a}')">
                        Answer 3
                    </div>
                </div>

                <div class="card answer">
                    <div class="card-body" id="answer4" onclick="chooseAnswer(id, '${a}')">
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


function showQuestionAmount(a) {
    let questionsAmount = document.getElementById('questionsAmount');
    let amount = a.length;

    questionsAmount.innerHTML = /*html*/`
        ${amount}
    `}


function renderQuestion(v, a) {
    let q = a[v];
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


function chooseAnswer(id, a) {
    let b = eval(a);
    deleteLockedAnswer();
    lockinNewAnswer(id);
    createAnswerButton(id, a);    
}


function lockinNewAnswer(id) {
    let answerCard = document.getElementById(`${id}`);
    answerCard.classList.add('bg-locked');
}


function createAnswerButton(id, a) {
    let button = document.getElementById('buttonAnswer');

    button.innerHTML = /*html*/ `
            <button id="answerBtn" type="button" class="btn btn-warning" onclick="checkAnswer('${id}', ${a}, '${a}')">Antworten</button>
        `
}


function deleteLockedAnswer() {

    for (let j = 1; j <= 4; j++) {
        document.getElementById(`answer${j}`).classList.remove('bg-locked');
    }
}


function checkAnswer(id, a, aString) {
    let rightAnswer = a[v]["right_answer"];
    let givenAnswer = id.slice(-1);
    let correctAnswerFullName = `answer${rightAnswer}`;
    let button = document.getElementById('buttonAnswer');

    if (rightAnswer == givenAnswer) {
        document.getElementById(id).parentNode.classList.add('bg-success');
        correctAnswer(button, a, aString)
    } else {
        document.getElementById(id).parentNode.classList.add('bg-danger');
        document.getElementById(correctAnswerFullName).parentNode.classList.add('bg-success');
        wrongAnswer(button, a, aString);
    }

    blockAnswerButtons();
}


function blockAnswerButtons() {
    for (let j = 1; j <= 4; j++) {
        document.getElementById(`answer${j}`).classList.add('disableAnswers');
    }
}


function correctAnswer(button, a, aString) {
    score++;
    if (checkForEnd(a) == true) {
        createEndbutton(button);
    } else {
        createNextQuestionButton(button, aString);        
    }
}


function wrongAnswer(button, a, aString) {
    if (checkForEnd(a) == true) {
        createEndbutton(button);
    } else {
        createNextQuestionButton(button, aString);
    }
}


function createEndbutton(button){
    button.innerHTML = /*html*/ `
        <button id="nextQuestionButton" type="button" class="btn btn-success" onclick="finishedQuiz()">Spiel beenden</button>
    `;
}


function createNextQuestionButton(button, aString){
    button.innerHTML = /*html*/ `
    <button id="nextQuestionButton" type="button" class="btn btn-success" onclick="nextQuestion(${aString})">Nächste Frage</button>
`;
}


function checkForEnd(a) {
    v++;
    if (v == a.length) {
        return true;
    } else {
        return false;
    }
}


function nextQuestion(a) {
    deleteAnswerMarks();
    renderQuestion(v, a);
    //in eigene Funtion und immer iweder benutzen --> deleteLocked Answer kann gelöscht werden    
}


function deleteAnswerMarks(){
    for (let j = 1; j <= 4; j++) {
        document.getElementById(`answer${j}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer${j}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer${j}`).classList.remove('bg-locked');
    }
}


function finishedQuiz() {
    document.getElementById('startscreen').innerHTML = /*html*/`
        <div id="endscreen" class="card">
            <img src="img/Quizapp/brain result.png" alt="">
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



/** Funktionen für die Responsivität   */

function toggleSelectionMenu(){
    document.getElementById('menuList').classList.toggle('d-flex');
    document.getElementById('close').classList.toggle('d-block');
}


function dontShowCloseBtn(){
    document.getElementById('close').classList.remove('d-block');
}


function blockBurgerMenu(){
    document.getElementById('burgerMenu').classList.add('d-none');
}





