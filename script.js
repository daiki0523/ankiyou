let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;

// ウィキメディアから画像を取得
function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

// ホーム画面を表示
function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
}

// クイズ開始
function startQuiz(type) {
    // data.js のグローバル変数からデータを取得
    const rawData = window[`${type}Data`] || window.flagData; // 見つからない場合はflagData
    currentQuizData = rawData.map(item => ({...item, genre: type}));
    currentQuizData.sort(() => Math.random() - 0.5); // シャッフル
    
    currentIndex = 0;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

// 問題を表示
function showQuestion() {
    isAnswerShowing = false;
    const item = currentQuizData[currentIndex];
    const imgEl = document.getElementById('question-img');
    const txtEl = document.getElementById('question-text');
    const ansEl = document.getElementById('answer-text');

    // C: カウンター
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${currentQuizData.length}`;

    // B: 問題文（ジャンルごとに固定）
    let label = "これの答えは？";
    if (item.genre === 'flag') label = "この州の州都は？";
    else if (item.genre === 'constellation') label = "この星座の名前は？";
    else if (item.genre === 'element') label = "この原子番号の元素記号は？";
    document.getElementById('question-label').textContent = label;

    // A: 画像とテキスト
    ansEl.textContent = item.a;
    ansEl.classList.add('hidden');

    if (item.img) {
        // 画像がある場合（州旗、星座）
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
        txtEl.classList.add('hidden'); // テキストAは隠す
    } else {
        // 画像がない場合（元素記号、大統領など）
        imgEl.classList.add('hidden');
        txtEl.textContent = item.q; // テキストAを表示
        txtEl.classList.remove('hidden');
    }
}

// タップ処理
function handleTouch() {
    const now = Date.now();
    if (now - lastClickTime < 300) return; // ダブルタップ防止
    lastClickTime = now;
    if (!isAnswerShowing) { isAnswerShowing = true; document.getElementById('answer-text').classList.remove('hidden'); } else { nextQuestion(); }
}

// 次の問題へ
function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuizData.length) { showQuestion(); } else { alert("全問終了！"); showHome(); }
}

// ヒント（今回は単純に答えを表示）
function useHint() { if (!isAnswerShowing) handleTouch(); }

// 初期表示
showHome();
