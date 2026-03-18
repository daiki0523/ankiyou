let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;

function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

// ページ読み込み時に全画像をキャッシュ（爆速化）
window.onload = () => {
    const dataSources = ['flagData', 'constellationData', 'elementData'];
    dataSources.forEach(ds => {
        if (window[ds]) {
            window[ds].forEach(item => {
                if (item.img) {
                    const img = new Image();
                    img.src = getImageUrl(item.img);
                }
            });
        }
    });
};

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
}

function startQuiz(type) {
    let rawData = window[type + 'Data'];
    if (!rawData) return;
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

    // ジャンルごとのラベル切り替え
    const labels = {
        flag: "この州の州都は？",
        constellation: "この星座の名前は？",
        element: "この番号の元素名は？",
        president: "この代の大統領は？",
        olympic: "この年の開催地は？",
        mountain: "この山の名前は？",
        morse: "この信号の意味は？",
        yamanote: "この駅名は？"
    };
    labelEl.textContent = labels[item.genre] || "これの答えは？";

    // Eの表示設定
    stateEl.textContent = (item.genre === 'constellation') ? "" : item.q;

    // A（画像・文字）の表示設定
    if (item.img) {
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
    } else {
        imgEl.classList.add('hidden');
        fallbackEl.textContent = (item.genre === 'flag') ? "" : item.q;
        fallbackEl.classList.toggle('hidden', item.genre === 'flag');
    }

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
    if (currentIndex < currentQuizData.length) { showQuestion(); } else { alert("全問終了！"); showHome(); }
}

function useHint() { if (!isAnswerShowing) handleTouch(); }
showHome();
