const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "maine jo bhi aapke baare m jana hai, wo sab yha hai..aapse permission jaiye aade badne ki?",
        imgSrc : "html.png",
        choiceA : "H pr ku",
        choiceB : "Ni",
        correct : "A"
    },{
        question : "MAINE AAPSE BAAT KARKE JANA.. jitni aap bahar se cute hai utni hi andar se sundar hain",
        imgSrc : "css.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        correct : "B"
    },{
        question : "MAINE AAPSE BAAT KARKE JANA.. jo aapki UTSUKTA hai kisi bhi chiz ko jaanne ki m uss ada ka fan hu",
        imgSrc : "js.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        correct : "B"
    },
    {
        question : "MAINE AAPSE BAAT KARKE JANA.. aap jise like karti hai uske sath pura din bhi bitana aap mind nhi karti",
        imgSrc : "js.png",
        choiceA : "H",
        choiceB : "ni",
        correct : "B"
    },{
        question : "MAINE AAPSE BAAT KARKE JANA.. aapka dil bilkul vaccum cleaner ki taraf saaf hai",
        imgSrc : "js.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        correct : "B"
    },{
        question : "Ye toh bachpan se hi dekh rha.. aap dikhti bahut MAASUM aur had se jyada cute ho,
        imgSrc : "js.png",
        choiceA : "H",
        choiceB : "ni",
        correct : "B"
    },{
        question : "MAINE AAPSE BAAT KARKE JANA.. aapse jab bhi puchho ki aap kya kar rahi toh aapka reply hota hai",
        imgSrc : "js.png",
        choiceA : "Bethe hai",
        choiceB : "100% yhi rhta hai",
        correct : "A"
    },
    {
        question : "MAINE AAPSE BAAT KARKE JANA.. aap jise like karti hai uske sath pura din bhi bitana aap mind nhi karti",
        imgSrc : "js.png",
        choiceA : "H",
        choiceB : "ni",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "5.png" :
              (scorePerCent >= 60) ? "4.png" :
              (scorePerCent >= 40) ? "3.png" :
              (scorePerCent >= 20) ? "2.png" :
              "1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
