let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;

// Wikimedia CommonsのFilePath URLを生成する関数
function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

// 起動時に州都と星座の全画像を裏側で読み込んでおく関数（遅さ対策）
function preloadImages() {
    // data.jsが存在する場合のみ実行
    if (typeof flagData !== 'undefined') {
        flagData.forEach(item => {
            if (item.img) {
                const img = new Image();
                img.src = getImageUrl(item.img);
            }
        });
    }
    if (typeof constellationData !== 'undefined') {
        constellationData.forEach(item => {
            if (item.img) {
                const img = new Image();
                img.src = getImageUrl(item.img);
            }
        });
    }
}

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
}

// クイズを開始する関数（確実にデータを見つける方式）
function startQuiz(type) {
    let rawData;
    
    // すべてのデータを直接指定して読み込む
    if (type === 'flag') rawData = flagData;
    else if (type === 'constellation') rawData = constellationData;
    else if (type === 'element') rawData = elementData;
    else if (type === 'mountain') rawData = mountainData;
    else if (type === 'olympic') rawData = olympicData;
    else if (type === 'morse') rawData = morseData;
    else if (type === 'president') rawData = presidentData;
    else if (type === 'yamanote') rawData = yamanoteData;

    if (!rawData || rawData.length === 0) {
        alert("エラー：データが見つかりません。");
        return;
    }

    currentQuizData = rawData.map(item => ({...item, genre: type}));
    currentQuizData.sort(() => Math.random() - 0.5); // シャッフル
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

    // C: カウンター
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${currentQuizData.length}`;

    // B: ジャンルごとのラベル切り替え
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

    // E: 基本的に問題(q)を表示（星座だけは形を見せたいので空欄）
    stateEl.textContent = (item.genre === 'constellation') ? "" : (item.q || "");

    // A: 画像の処理
    if (item.img && item.img !== "") {
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
    } else {
        imgEl.classList.add('hidden');
        // 州旗以外で画像がない場合は中央に文字(fallback-text)を出す
        if (item.genre !== 'flag') {
            fallbackEl.textContent = item.q || "";
            fallbackEl.classList.remove('hidden');
        } else {
            fallbackEl.classList.add('hidden');
        }
    }

    // D: 答えをセット
    ansEl.textContent = item.a || "データなし";
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

// ページ読み込み完了時に画像の事前読み込みを実行し、ホーム画面を表示
window.onload = () => {
    preloadImages(); // 画像の裏読みを開始
    showHome();     // ホーム画面を表示
};
