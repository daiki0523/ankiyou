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
    let rawData;
    if (type === 'flag') rawData = flagData;
    else if (type === 'president') rawData = presidentData;
    else if (type === 'constellation') rawData = constellationData;
    else if (type === 'element') rawData = elementData;
    else if (type === 'mountain') rawData = mountainData;
    else if (type === 'morse') rawData = morseData;
    else if (type === 'olympic') rawData = olympicData;
    else if (type === 'yamanote') rawData = yamanoteData;

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
    const txtEl = document.getElementById('question-text');
    const ansEl = document.getElementById('answer-text');

    document.getElementById('counter').textContent = `${currentIndex + 1} / ${currentQuizData.length}`;
    document.getElementById('question-label').textContent = "この州の州都は？";

    // E: 州名
    txtEl.textContent = item.q;
    // A: 画像
    if (item.img) {
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
    } else {
        imgEl.classList.add('hidden');
    }
    // D: 答え（隠す）
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
