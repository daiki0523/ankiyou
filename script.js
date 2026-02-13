let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;

function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

// 画像か答えをタップした時の処理
function handleTouch() {
    if (!isAnswerShowing) {
        showAnswer();
    } else {
        nextQuestion();
    }
}

function startQuiz(type) {
    currentQuizData = type === 'flag' ? [...flagData] : [...presidentData];
    currentQuizData.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    showQuestion();
}

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
}

function showQuestion() {
    isAnswerShowing = false;
    const item = currentQuizData[currentIndex];
    document.getElementById('question-text').textContent = item.q;
    document.getElementById('question-img').src = getImageUrl(item.img);
    document.getElementById('answer-text').textContent = item.a;
    document.getElementById('answer-text').style.display = 'none';
}

function showAnswer() {
    isAnswerShowing = true;
    document.getElementById('answer-text').style.display = 'block';
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuizData.length) {
        showQuestion();
    } else {
        alert("全問終了！メニューに戻ります。");
        showMenu();
    }
}
