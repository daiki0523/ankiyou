let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;

// 🌟 新追加：わからなかった問題を記録するリスト
let wrongAnswers = []; 

function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

const allQuizData = [
    typeof flagData !== 'undefined' ? flagData : [],
    typeof constellationData !== 'undefined' ? constellationData : []
].flat();

allQuizData.forEach(item => {
    if (item && item.img) {
        const img = new Image();
        img.src = getImageUrl(item.img);
    }
});

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden'); // 結果画面も隠す
}

function startQuiz(type) {
    let rawData;
    
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
    currentQuizData.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    
    // 🌟 新追加：クイズ開始時に記録をリセット
    wrongAnswers = []; 
    
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

    stateEl.textContent = (item.genre === 'constellation') ? "" : (item.q || "");

    if (item.img && item.img !== "") {
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
    } else {
        imgEl.classList.add('hidden');
        if (item.genre !== 'flag') {
            fallbackEl.textContent = item.q || "";
            fallbackEl.classList.remove('hidden');
        } else {
            fallbackEl.classList.add('hidden');
        }
    }

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
        // 🌟 新追加：全問終わったら結果画面へ！
        showResult(); 
    }
}

// 🌟 新追加：ヒントボタン（！）を押した時の処理
function useHint() { 
    if (!isAnswerShowing) {
        const currentItem = currentQuizData[currentIndex];
        // まだリストに入っていなければ追加する
        if (!wrongAnswers.includes(currentItem)) {
            wrongAnswers.push(currentItem);
        }
        handleTouch(); // 答えを表示
    }
}

// 🌟 新追加：結果画面を表示する機能
function showResult() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    const listContainer = document.getElementById('wrong-list');
    listContainer.innerHTML = ""; // 前のリストを消去

    // 1問も間違えなかった場合
    if (wrongAnswers.length === 0) {
        listContainer.innerHTML = "<div style='text-align:center; padding: 20px; font-weight:bold;'>全問ノーヒントクリア！<br>素晴らしい！🎉</div>";
    } else {
        // 間違えた問題を順番に表示
        wrongAnswers.forEach(item => {
            const div = document.createElement('div');
            div.className = 'wrong-item';
            div.innerHTML = `<span class="wrong-q">Q: ${item.q || "画像問題"}</span><span class="wrong-a">A: ${item.a}</span>`;
            listContainer.appendChild(div);
        });
    }
}

window.onload = showHome;
