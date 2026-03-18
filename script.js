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

    let label = "これの答えは？";
    if (item.genre === 'flag') label = "この州の州都は？";
    else if (item.genre === 'constellation') label = "この星座の名前は？";
    else if (item.genre === 'element') label = "この番号の元素名は？";
    else if (item.genre === 'mountain') label = "この高さの山の名前は？";
    else if (item.genre === 'morse') label = "この信号の意味は？";
    else if (item.genre === 'president') label = "この代の大統領は？";
    else if (item.genre === 'olympic') label = "この年の開催地は？";
    else if (item.genre === 'yamanote') label = "この番号の駅名は？";
    document.getElementById('question-label').textContent = label;

    ansEl.textContent = item.a;
    ansEl.classList.add('hidden');

    if (item.img && item.img !== "") {
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
        txtEl.classList.add('hidden');
    } else {
        imgEl.classList.add('hidden');
        txtEl.textContent = item.q;
        txtEl.classList.remove('hidden');
    }
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
