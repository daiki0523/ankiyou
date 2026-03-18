let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;

// 画像URLを生成（Wikimediaから取得）
function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

// 読み込みを速くするために画像を裏でロードしておく
function preloadImages(data) {
    data.forEach(item => {
        if (item.img) {
            const img = new Image();
            img.src = getImageUrl(item.img);
        }
    });
}

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
}

function startQuiz(type) {
    let rawData;
    // どのジャンルが選ばれたか判定
    if (type === 'flag') rawData = flagData;
    else if (type === 'president') rawData = presidentData;
    else if (type === 'constellation') rawData = constellationData;
    else if (type === 'element') rawData = elementData;
    else if (type === 'mountain') rawData = mountainData;
    else if (type === 'morse') rawData = morseData;
    else if (type === 'olympic') rawData = olympicData;
    else if (type === 'yamanote') rawData = yamanoteData;

    if (!rawData) return;
    
    // 画像を事前に読み込む
    preloadImages(rawData);

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
    const txtEl = document.getElementById('question-text');
    const ansEl = document.getElementById('answer-text');

    // C: カウンター
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${currentQuizData.length}`;

    // B: 問題ラベル
    let label = "これの答えは？";
    if (item.genre === 'flag') label = "この州の州都は？";
    else if (item.genre === 'constellation') label = "この星座の名前は？";
    document.getElementById('question-label').textContent = label;

    // E: 州の名前（表で見せる）
    txtEl.textContent = item.q;
    txtEl.classList.remove('hidden');

    // A: 画像（もしあれば出す）
    if (item.img && item.img !== "") {
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
    } else {
        imgEl.classList.add('hidden');
    }

    // D: 答え（最初は隠す）
    ansEl.textContent = item.a;
    ansEl.classList.add('hidden');
}

function handleTouch() {
    const now = Date.now();
    if (now - lastClickTime < 300) return; // 連続タップ防止
    lastClickTime = now;

    if (!isAnswerShowing) {
        // 1回目のタップ：答え（D）を表示
        isAnswerShowing = true;
        document.getElementById('answer-text').classList.remove('hidden');
    } else {
        // 2回目のタップ：次の問題へ
        nextQuestion();
    }
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuizData.length) {
        showQuestion();
    } else {
        alert("全問終了！");
        showHome();
    }
}

function useHint() { if (!isAnswerShowing) handleTouch(); }

showHome();
