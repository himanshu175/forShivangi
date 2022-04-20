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
    question:
      "aapko 2 OPTIONS m se koi bhi ek pr click karna jo aapko sai lage...",
    imgSrc: "js.png",
    choiceA: "Abhi k liye second option click de",
    choiceB: "okay",
    correct: "B",
  },
  {
    question: "Aap bahut MAASUM si aur had se jyada cute ho",
    imgSrc: "S3.png",
    choiceA: "H aur chant bhi bahut hun m",
    choiceB: "han woh toh hai",
    correct: "A",
  },
  {
    question:
      "MAINE AAPSE BAAT KARKE JANA.. jitni aap bahar se cute hai utni hi andar se sundar hain",
    imgSrc: "S2.png",
    choiceA: "mujhe(shivangi) bhi pta h wo",
    choiceB: "kuch alag batao",
    correct: "B",
  },
  {
    question:
      "MAINE AAPSE BAAT KARKE JANA.. jo aapki UTSUKTA hai kisi bhi chiz ko jaanne ki m uss ada ka fan hu",
    imgSrc: "S4.png",
    choiceA: "aise hi fan bane rhna",
    choiceB: "aur gwalior wali video ke fan ?",
    correct: "A",
  },
  {
    question:
      "MAINE AAPSE BAAT KARKE JANA.. aap jise like karti hai uske sath pura din bhi bitana aap mind nhi karti",
    imgSrc: "PET.jpg",
    choiceA: "han 100%",
    choiceB: "par m tumahe sath toh ni bitati pura din",
    correct: "A",
  },
  {
    question:
      "MAINE AAPSE BAAT KARKE JANA.. aapka dil bilkul vaccum cleaner ki taraf saaf hai",
    imgSrc: "S0.jpg",
    choiceA: "bilkul bilkul",
    choiceB: "secrets karugi tumare sath share",
    correct: "B",
  },
  {
    question:
      "Wo din kab aayga jab aap meri bhi baatein manegi...haaye soch ke hi kitna sukoon mil ra",
    imgSrc: "S1.jpg",
    choiceA: "han wo din bhi aayga",
    choiceB: "mai aane bhi dungi kya",
    correct: "B",
  },
  {
    question:
      "sorry yha m khud ke baare m soch rha...par m aapke sath tima bita ke apni saari thakaan bhool jata hun",
    imgSrc: "S11.jpg",
    choiceA: "toh fir DATE pakki kare",
    choiceB: "100% DATE DONE aapke sath himanshu",
    correct: "B",
  },
  {
    question: "Thanks shivangi, for being my friend",
    imgSrc: "S8.jpg",
    choiceA: "u too himanshu!!",
    choiceB: "thanks himanshu!",
    correct: "B",
  },
  {
    question:
      "aur bhi bahut kuch h share karne ko karunga aage..agr aap permisson de toh, tab tak k liye LIKE, SHARE, SUNSCRIBE kare",
    imgSrc: "S12.jpg",
    choiceA: "puchhne ki baat h",
    choiceB: "han next quiz jaldi lana..",
    correct: "B",
  },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 10s
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
