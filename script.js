let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;

function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
}

function startQuiz(type) {
    // window[type + 'Data'] で data.js の変数を安全に取得
    const rawData = window[type + 'Data'];
    if (!rawData) {
        alert("データが見つかりません: " + type + "Data");
        return;
    }

    currentQuizData = rawData.map(item => ({...item, genre: type}));
    currentQuizData.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    isAnswerShowing = false;
    const item = currentQuizData[currentIndex];
    const imgEl = document.getElementById('question-img');
    const stateEl = document.getElementById('state-name-display');
    const ansEl = document.getElementById('answer-text');
    const fallbackEl = document.getElementById('fallback-text');
    const labelEl = document.getElementById('question-label');

    document.getElementById('counter').textContent = `${currentIndex + 1} / ${currentQuizData.length}`;

    const labels = {
        flag: "この州の州都は？",
        constellation: "この星座の名前は？",
        element: "この原子番号の元素名は？",
        president: "この代の大統領は？",
        olympic: "この年の開催地は？",
        mountain: "この山の名前は？",
        morse: "この信号の意味は？",
        yamanote: "この駅名は？"
    };
    labelEl.textContent = labels[item.genre] || "答えは何？";

    // E: 基本的に問題(q)を表示（星座は空欄）
    stateEl.textContent = (item.genre === 'constellation') ? "" : item.q;

    // A: 画像またはテキストの表示
    if (item.img && item.img !== "") {
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
    } else {
        imgEl.classList.add('hidden');
        if (item.genre !== 'flag') {
            fallbackEl.textContent = item.q;
            fallbackEl.classList.remove('hidden');
        } else {
            fallbackEl.classList.add('hidden');
        }
    }

    // D: 答えをセットして隠す
    ansEl.textContent = item.a;
    ansEl.classList.add('hidden');
}

function handleTouch() {
    const now = Date.now();
    if (now - lastClickTime < 300) return;
    lastClickTime = now;

    if (!isAnswerShowing) {
        isAnswerShowing = true;
        document.getElementById('answer-text').classList.remove('hidden');
    } else {
        nextQuestion();
    }
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuizData.length) {
        showQuestion();
    } else {
        alert("全問終了！ホームに戻ります。");
        showHome();
    }
}

function useHint() { if (!isAnswerShowing) handleTouch(); }

// 最初にホーム画面を確実に表示
document.addEventListener('DOMContentLoaded', showHome);
