let currentQuizData = [];
let currentIndex = 0;

// 画像URLを取得する関数
function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=400";
}

function startQuiz(type) {
    // data.jsにあるデータを使う
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
    const item = currentQuizData[currentIndex];
    document.getElementById('question-text').textContent = item.q;
    document.getElementById('question-img').src = getImageUrl(item.img);
    document.getElementById('answer-text').textContent = item.a;
    document.getElementById('answer-text').style.display = 'none';
    document.getElementById('show-btn').style.display = 'inline-block';
    document.getElementById('hint-btn').style.display = 'inline-block';
    document.getElementById('next-btn').style.display = 'none';
}

function showAnswer() {
    document.getElementById('answer-text').style.display = 'block';
    document.getElementById('show-btn').style.display = 'none';
    document.getElementById('hint-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuizData.length) {
        showQuestion();
    } else {
        alert("全問終了しました！メニューに戻ります。");
        showMenu();
    }
}
