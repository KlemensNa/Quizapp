let v = 0;

function init() {
}


function getReadyToStart(id){
    deleteActiveCategory();
    activateCategory(id);
    createStartbutton(id);    
}


function deleteActiveCategory(){
    document.getElementById("egypt").classList.remove('active');
    document.getElementById("sports").classList.remove('active');
    document.getElementById("it").classList.remove('active');
    document.getElementById("movies").classList.remove('active');
}


function activateCategory(id){
    let activeCategory = document.getElementById(`${id}`);
    activeCategory.classList.add('active');
}


function createStartbutton(categorieID){
    document.getElementById('startButton').innerHTML = /*html*/`
        <button type="button" id="startBtn" class="btn" onclick="startQuiz(${categorieID})">Start Quiz</button>
    `
}


function startQuiz(a){
    toggleScreens();
    questionAmount();
    renderQuestion(a);

}


function toggleScreens(){
    document.getElementById('startscreen').style = "display : none";
    document.getElementById('menu').style = "display : none";
    document.getElementById('playscreen').style = "";
}


function questionAmount() {
    let questionsAmount = document.getElementById('questionsAmount');
    let amount = questions.length;

    questionsAmount.innerHTML = /*html*/`
        ${amount}
    `
}


function renderQuestion(v) {

    if (v == questions.length) {
        finishedQuiz(v);
    } else {

        let question = document.getElementById('question');
        let q = questions[v];
        question.innerHTML = /*html*/`
        ${q['question']}
        `
        renderAnswers(q);
        actualQuestionNumber(v);
        disableButton();
    }
}


function actualQuestionNumber(v) {
    let actualNumber = v + 1;

    document.getElementById('actualNumber').innerHTML = /*html*/`
        ${actualNumber}
    `
}


function renderAnswers(q) {
    document.getElementById('answer1').innerHTML = q["answer1"];
    document.getElementById('answer2').innerHTML = q["answer2"];
    document.getElementById('answer3').innerHTML = q["answer3"];
    document.getElementById('answer4').innerHTML = q["answer4"];
}


function logAnswer(id) {
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
}


function correct(button) {
    button.innerHTML = /*html*/ `
        <button id="nextQuestionButton" type="button" class="btn btn-success" onclick="nextQuestion()">Nächste Frage</button>
    `
}


function wrong(button) {
    button.innerHTML = /*html*/ `
        <button id="restartButton" type="button" class="btn btn-danger" onclick="restartQuiz()">Nochmal</button>
    `
}


function nextQuestion() {
    v++;
    renderQuestion(v);
    //in eigene Funtion und immer iweder benutzen --> deleteLocked Answer kann gelöscht werden
    for (let j = 1; j <= 4; j++) {
        document.getElementById(`answer${j}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer${j}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer${j}`).classList.remove('bg-locked');
    }
}


function restartQuiz() {
    v = 0;
    renderQuestion(v);
    for (let j = 1; j <= 4; j++) {
        document.getElementById(`answer${j}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer${j}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer${j}`).classList.remove('bg-locked');
    }
}


function finishedQuiz() {
    document.getElementById('playscreen').style = "display: none"
    document.getElementById('endscreen').style = "";
    document.getElementById('finalScore').innerHTML = `${(v)}`;

    document.getElementById('maxScore').innerHTML = `${questions.length}`;
}


function startAgain(){
    document.getElementById('playscreen').style = ""
    document.getElementById('endscreen').style = "display: none";
    restartQuiz();
}


function disableButton(){
    document.getElementById('buttonAnswer').innerHTML = "";
}




function renderMenubar(){

}


function renderStartscreen(){

}





