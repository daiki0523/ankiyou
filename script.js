let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;
let wrongAnswers = []; 
let selectedGenre = "";
let selectedSubGenre = "all";

// 🌟 スマホの記憶（LocalStorage）から間違えた問題リストを呼び出す
let savedMistakes = JSON.parse(localStorage.getItem('anki_mistakes')) || [];
let isReviewMode = false; // 復習モードかどうかの判定

let touchStartX = 0;
let touchCurrentX = 0;
let isAnimating = false;

function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

const allQuizData = [
    typeof flagData !== 'undefined' ? flagData : [],
    typeof constellationData !== 'undefined' ? constellationData : [],
    typeof worldFlagData !== 'undefined' ? worldFlagData : [] 
].flat();

allQuizData.forEach(item => {
    if (item && item.img) {
        const img = new Image();
        img.src = getImageUrl(item.img);
    }
});

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('subgenre-screen').classList.add('hidden');
    document.getElementById('mode-screen').classList.add('hidden'); 
    document.getElementById('review-start-screen').classList.add('hidden'); // 🌟 追加
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
}

// 🌟 モード切替の処理
function setReviewMode(isReview) {
    isReviewMode = isReview;
    if(isReviewMode) {
        document.getElementById('review-mode-btn').style.background = '#ff9800';
        document.getElementById('review-mode-btn').style.color = '#fff';
        document.getElementById('normal-mode-btn').style.background = '#fff';
        document.getElementById('normal-mode-btn').style.color = '#333';
    } else {
        document.getElementById('normal-mode-btn').style.background = '#333';
        document.getElementById('normal-mode-btn').style.color = '#fff';
        document.getElementById('review-mode-btn').style.background = '#fff';
        document.getElementById('review-mode-btn').style.color = '#333';
    }
}

function selectGenre(type) {
    selectedGenre = type; 
    selectedSubGenre = "all"; 
    document.getElementById('home-screen').classList.add('hidden');

    if (type === 'worldflag') {
        document.getElementById('subgenre-screen').classList.remove('hidden');
    } else {
        // 🌟 復習モードなら専用画面へ、通常なら出題形式へ
        if (isReviewMode) showReviewStartScreen();
        else document.getElementById('mode-screen').classList.remove('hidden');
    }
}

function selectSubGenre(subType) {
    selectedSubGenre = subType;
    document.getElementById('subgenre-screen').classList.add('hidden');
    
    // 🌟 復習モードなら専用画面へ
    if (isReviewMode) showReviewStartScreen();
    else document.getElementById('mode-screen').classList.remove('hidden');
}

// 🌟 対象の復習問題を抽出する処理
function getReviewTarget() {
    return savedMistakes.filter(item => {
        if (item.genre !== selectedGenre) return false;
        if (selectedGenre === 'worldflag' && selectedSubGenre !== 'all') {
            return item.region === selectedSubGenre;
        }
        return true;
    });
}

// 🌟 復習スタート画面の表示
function showReviewStartScreen() {
    const targets = getReviewTarget();
    document.getElementById('review-count-text').textContent = `対象：${targets.length}問`;
    document.getElementById('review-start-screen').classList.remove('hidden');
}

// 🌟 ゴミ箱ボタン（手動リセット）の処理
function resetReviewList() {
    const confirmReset = confirm("このジャンルの復習リストを空にしますか？");
    if (!confirmReset) return;
    
    savedMistakes = savedMistakes.filter(item => {
        if (item.genre !== selectedGenre) return true; 
        if (selectedGenre === 'worldflag' && selectedSubGenre !== 'all') {
            if (item.region === selectedSubGenre) return false; 
            return true; 
        }
        return false; 
    });
    
    localStorage.setItem('anki_mistakes', JSON.stringify(savedMistakes));
    document.getElementById('review-count-text').textContent = `対象：0問`;
    alert("リセットしました！✨");
}

// 🌟 復習クイズを開始する処理
function startReviewQuiz() {
    const targets = getReviewTarget();
    if (targets.length === 0) {
        alert("復習する問題がありません！✨");
        return;
    }
    currentQuizData = [...targets];
    currentQuizData.sort(() => Math.random() - 0.5); // 復習はランダム
    currentIndex = 0;
    wrongAnswers = [];
    
    document.getElementById('review-start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function startQuizMode(isRandom) {
    let rawData = [];
    const type = selectedGenre;
    
    if (type === 'flag') rawData = flagData;
    else if (type === 'constellation') rawData = constellationData;
    else if (type === 'element') rawData = elementData;
    else if (type === 'mountain') rawData = mountainData;
    else if (type === 'olympic') rawData = olympicData;
    else if (type === 'morse') rawData = morseData;
    else if (type === 'president') rawData = presidentData;
    else if (type === 'yamanote') rawData = yamanoteData;
    else if (type === 'worldflag') {
        rawData = typeof worldFlagData !== 'undefined' ? worldFlagData : [];
        if (selectedSubGenre !== 'all') {
            rawData = rawData.filter(item => item.region === selectedSubGenre);
        }
    }

    if (!rawData || rawData.length === 0) {
        alert("エラー：データが見つからないか、その地域に問題がありません。");
        return showHome();
    }

    currentQuizData = rawData.map(item => ({...item, genre: type}));
    if (isRandom) currentQuizData.sort(() => Math.random() - 0.5);

    currentIndex = 0;
    wrongAnswers = []; 
    document.getElementById('mode-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    isAnswerShowing = false;
    isAnimating = false;
    const item = currentQuizData[currentIndex];
    const imgEl = document.getElementById('question-img');
    const stateEl = document.getElementById('state-name-display');
    const ansEl = document.getElementById('answer-text');
    const fallbackEl = document.getElementById('fallback-text');
    const labelEl = document.getElementById('question-label');
    const problemArea = document.getElementById('problem-area');

    problemArea.className = 'problem-area-box';
    problemArea.style.transition = 'none';
    problemArea.style.transform = 'translate(0px, 0px) rotate(0deg)';
    problemArea.style.opacity = '1';

    setTimeout(() => {
        problemArea.style.transition = 'transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease';
    }, 50);

    document.getElementById('counter').textContent = `${currentIndex + 1} / ${currentQuizData.length}`;

    const labels = {
        flag: "この州の州都は？", constellation: "この星座の名前は？", element: "この原子番号の元素名は？", president: "この代の大統領は？", olympic: "この年の開催地は？", mountain: "この山の名前は？", morse: "この信号の意味は？", yamanote: "この駅名は？", worldflag: "この国旗の国名は？"
    };
    labelEl.textContent = labels[item.genre] || "答えは何？";
    stateEl.textContent = (item.genre === 'constellation' || item.genre === 'worldflag') ? "" : (item.q || "");

    if (item.img && item.img !== "") {
        imgEl.src = getImageUrl(item.img);
        imgEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
    } else {
        imgEl.classList.add('hidden');
        if (item.genre !== 'flag' && item.genre !== 'worldflag') {
            fallbackEl.textContent = item.q || "";
            fallbackEl.classList.remove('hidden');
        } else {
            fallbackEl.classList.add('hidden');
        }
    }

    ansEl.textContent = item.a || "データなし";
    ansEl.classList.add('hidden');
}

// 🌟 スマホの記憶に保存する処理
function saveMistake(item) {
    const exists = savedMistakes.find(m => m.a === item.a && m.genre === item.genre);
    if (!exists) {
        savedMistakes.push(item);
        localStorage.setItem('anki_mistakes', JSON.stringify(savedMistakes));
    }
}

// 🌟 スマホの記憶から完全に消す処理（覚えた！）
function removeMistake(item) {
    savedMistakes = savedMistakes.filter(m => !(m.a === item.a && m.genre === item.genre));
    localStorage.setItem('anki_mistakes', JSON.stringify(savedMistakes));
}

function handleTouch() {
    if (isAnimating) return;
    if (!isAnswerShowing) {
        isAnswerShowing = true;
        document.getElementById('answer-text').classList.remove('hidden');
        lastClickTime = Date.now();
    } else {
        const now = Date.now();
        if (now - lastClickTime < 300) return;
        lastClickTime = now;
        
        // タップで次へ進んだ場合も「右スワイプ(正解)」と同じ扱いにして消す
        if (isReviewMode) removeMistake(currentQuizData[currentIndex]);
        nextQuestion();
    }
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuizData.length) {
        showQuestion();
    } else {
        showResult(); 
    }
}

function showResult() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    const listContainer = document.getElementById('wrong-list');
    const retestBtn = document.getElementById('retest-btn');
    listContainer.innerHTML = ""; 

    if (wrongAnswers.length === 0) {
        listContainer.innerHTML = "<div style='text-align:center; padding: 20px; font-weight:bold;'>全問ノーヒントクリア！<br>素晴らしい！🎉</div>";
        retestBtn.classList.add('hidden');
    } else {
        retestBtn.classList.remove('hidden');
        wrongAnswers.forEach(item => {
            const div = document.createElement('div');
            div.className = 'wrong-item';
            div.innerHTML = `<span class="wrong-q">Q: ${item.q || "画像問題"}</span><span class="wrong-a">A: ${item.a}</span>`;
            listContainer.appendChild(div);
        });
    }
}

function startRetest() {
    currentQuizData = [...wrongAnswers];
    currentQuizData.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    wrongAnswers = [];
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    showQuestion();
}

function flyOutCard(direction) {
    if (isAnimating) return;
    isAnimating = true;
    const problemArea = document.getElementById('problem-area');
    
    problemArea.classList.add(direction === 'right' ? 'card-out-right' : 'card-out-left');

    setTimeout(() => {
        const currentItem = currentQuizData[currentIndex];
        if (direction === 'left') {
            if (!wrongAnswers.includes(currentItem)) {
                wrongAnswers.push(currentItem);
            }
            // 🌟 左スワイプ（間違えた）したらスマホに記憶！
            saveMistake(currentItem);
        } else {
            // 🌟 復習モード中に右スワイプ（覚えた）したらリストから消去！
            if (isReviewMode) {
                removeMistake(currentItem);
            }
        }
        nextQuestion(); 
    }, 300);
}

window.onload = () => {
    showHome();
    
    const problemArea = document.getElementById('problem-area');
    const threshold = 100;

    problemArea.addEventListener('touchstart', e => {
        if (isAnimating) return;
        touchStartX = e.changedTouches[0].clientX;
        touchCurrentX = touchStartX;
        problemArea.style.transition = 'none';
    }, {passive: true});

    problemArea.addEventListener('touchmove', e => {
        if (isAnimating) return;
        touchCurrentX = e.changedTouches[0].clientX;
        const diffX = touchCurrentX - touchStartX;
        const rotate = diffX * 0.05;
        problemArea.style.transform = `translate(${diffX}px, 0) rotate(${rotate}deg)`;

        if (diffX > 50) {
            problemArea.classList.add('swiping-right');
            problemArea.classList.remove('swiping-left');
        } else if (diffX < -50) {
            problemArea.classList.add('swiping-left');
            problemArea.classList.remove('swiping-right');
        } else {
            problemArea.classList.remove('swiping-right', 'swiping-left');
        }
    }, {passive: true});

    problemArea.addEventListener('touchend', e => {
        if (isAnimating) return;
        touchCurrentX = e.changedTouches[0].clientX;
        const diffX = touchCurrentX - touchStartX;

        problemArea.style.transition = 'transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease';
        problemArea.classList.remove('swiping-right', 'swiping-left');

        if (Math.abs(diffX) > threshold) {
            flyOutCard(diffX > 0 ? 'right' : 'left');
        } else {
            problemArea.style.transform = 'translate(0px, 0px) rotate(0deg)';
            if (Math.abs(diffX) < 10) handleTouch();
        }
    });
};
