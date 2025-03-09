const questions = [
    { q: "8x?=56 ?=", options: ["7", "64", "6"], answer: "7" },
    { q: "Care este următorul număr în șir: 10, 15, 25, 30, ?", options: ["35", "40", "25"], answer: "35" },
    { q: "Câte laturi are un cub?", options: ["6", "4", "2"], answer: "6" },
    { q: "Cât face 7x3?", options: ["21", "20", "22"], answer: "21" },
    { q: "Care e sinonimul cuvântului: Gustos?", options: ["Nu există sinonim pentru acest cuvânt", "Delicios", "Insipid"], answer: "Delicios" }
];

let currentQuestion = 0, score = 0;
let userAnswers = [];
let startTime, endTime;

function startTimer() {
    startTime = new Date();
}

function stopTimer() {
    endTime = new Date();
    return ((endTime - startTime) / 1000).toFixed(2);
}

function loadQuestion() {
    if (currentQuestion === 0) startTimer();

    document.getElementById("question").innerText = questions[currentQuestion].q;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    questions[currentQuestion].options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(answer) {
    userAnswers.push({
        question: questions[currentQuestion].q,
        selectedAnswer: answer,
        correctAnswer: questions[currentQuestion].answer
    });

    if (answer === questions[currentQuestion].answer) {
        score += 10;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        let totalTime = stopTimer();
        document.getElementById("quiz").innerHTML = `<h2>Scorul tău: ${score}</h2><p>Timp total: ${totalTime} secunde</p>`;

        document.getElementById("downloadBtn").style.display = "block"; // Afișează butonul de descărcare

        localStorage.setItem("finalScore", score);

        let locul;
        if (score >= 50) locul = 1;
        else if (score >= 40) locul = 2;
        else if (score >= 30) locul = 3;
        else locul = 4;

        let diplomaBtn = document.getElementById("viewDiploma");

        if (locul <= 3) {
            diplomaBtn.style.display = "block"; // Afișează butonul de diplomă
        } else {
            alert("Ai IQ prea mic!");
        }
    }
}

function downloadScore() {
    let totalTime = stopTimer();
    let fileContent = `Test IQ - Rezultate\n\n`;

    userAnswers.forEach((item, index) => {
        fileContent += `?intreb${index + 1}="${item.question}"\n`;
        fileContent += `res="${item.selectedAnswer}"\n`;
        fileContent += `corect="${item.correctAnswer}"\n\n`;
    });

    fileContent += `scor="${score}"\n`;
    fileContent += `timp="${totalTime} secunde"\n`;

    const blob = new Blob([fileContent], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rezultate_test_iq.iqscore";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

loadQuestion();
