let v = 1;


function init(){
    questionAmount();
    renderAnswers(v);
    renderQuestion(v);
}


function questionAmount(){
    let questionsAmount = document.getElementById('questionsAmount');
    let amount = questions.length;

    questionsAmount.innerHTML = /*html*/`
        ${amount}
    `
}


function renderQuestion(v){
    let question = document.getElementById('question');
    let q = questions[v]['question'];
    question.innerHTML = /*html*/`
        ${q}
    `
}

// hier noch verbessern
// function renderAnswers(v){
//     for (let i = 0; i < 5; i++) {
//         const q = questions[i];
        
//         document.getElementById('a' + (i+1)) = /*html*/`
//             ${questions[v][q]};
//         `

//     }
// }