let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;
let wrongAnswers = []; 
let selectedGenre = "";
let selectedSubGenre = "all";

let savedMistakes = JSON.parse(localStorage.getItem('anki_mistakes')) || [];
let isReviewMode = false;

let isVibeEnabled = JSON.parse(localStorage.getItem('anki_vibe_setting'));
if (isVibeEnabled === null) isVibeEnabled = true;

// 🌟 ダークモードの設定を読み込む
let isDarkMode = JSON.parse(localStorage.getItem('anki_dark_mode')) || false;

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
    typeof worldFlagData !== 'undefined' ? worldFlagData : [],
    typeof capitalData !== 'undefined' ? capitalData : [] 
].flat();

allQuizData.forEach(item => {
    if (item && item.img) {
        const img = new Image();
        img.src = getImageUrl(item.img);
    }
});

function updateVibeBtnUI() {
    const btn = document.getElementById('vibe-toggle-btn');
    if (!btn) return;
    if (isVibeEnabled) {
        btn.textContent = "📳 振動: ON";
        btn.style.background = isDarkMode ? "#006064" : "#e0f7fa";
        btn.style.color = isDarkMode ? "#fff" : "#333";
        btn.style.borderColor = "#00bcd4";
    } else {
        btn.textContent = "📴 振動: OFF";
        btn.style.background = isDarkMode ? "#333" : "#f5f5f5";
        btn.style.color = isDarkMode ? "#ccc" : "#333";
        btn.style.borderColor = isDarkMode ? "#555" : "#ccc";
    }
}

function toggleVibration() {
    isVibeEnabled = !isVibeEnabled;
    localStorage.setItem('anki_vibe_setting', JSON.stringify(isVibeEnabled));
    updateVibeBtnUI();
    if (isVibeEnabled && navigator.vibrate) navigator.vibrate(50);
}

// 🌟 ダークモードの見た目を適用する処理
function applyDarkMode() {
    const btn = document.getElementById('dark-toggle-btn');
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if(btn) {
            btn.textContent = "☀️ ライト";
            btn.style.background = "#333";
            btn.style.color = "#fff";
            btn.style.borderColor = "#555";
        }
    } else {
        document.body.classList.remove('dark-mode');
        if(btn) {
            btn.textContent = "🌙 ダーク";
            btn.style.background = "#fff";
            btn.style.color = "#333";
            btn.style.borderColor = "#ccc";
        }
    }
    updateVibeBtnUI();
    updateModeBtnUI();
}

// 🌟 ダークモードのON/OFFを切り替える処理
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('anki_dark_mode', JSON.stringify(isDarkMode));
    applyDarkMode();
}

// 🌟 通常・復習ボタンの色をダークモードに合わせて自動調整
function updateModeBtnUI() {
    const normBtn = document.getElementById('normal-mode-btn');
    const revBtn = document.getElementById('review-mode-btn');
    if(!normBtn || !revBtn) return;
    
    if(isReviewMode) {
        revBtn.style.background = '#ff9800';
        revBtn.style.color = '#fff';
        revBtn.style.borderColor = '#ff9800';
        
        normBtn.style.background = isDarkMode ? '#222' : '#fff';
        normBtn.style.color = isDarkMode ? '#aaa' : '#333';
        normBtn.style.borderColor = isDarkMode ? '#555' : '#ccc';
    } else {
        normBtn.style.background = isDarkMode ? '#555' : '#333';
        normBtn.style.color = '#fff';
        normBtn.style.borderColor = isDarkMode ? '#555' : '#333';
        
        revBtn.style.background = isDarkMode ? '#222' : '#fff';
        revBtn.style.color = isDarkMode ? '#aaa' : '#333';
        revBtn.style.borderColor = isDarkMode ? '#555' : '#ccc';
    }
}

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('subgenre-screen').classList.add('hidden');
    document.getElementById('mode-screen').classList.add('hidden'); 
    document.getElementById('review-start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    updateModeBtnUI();
}

function setReviewMode(isReview) {
    isReviewMode = isReview;
    updateModeBtnUI();
}

function selectGenre(type) {
    selectedGenre = type; 
    selectedSubGenre = "all"; 
    document.getElementById('home-screen').classList.add('hidden');

    if (type === 'worldflag' || type === 'capital') {
        document.getElementById('subgenre-screen').classList.remove('hidden');
    } else {
        if (isReviewMode) showReviewStartScreen();
        else document.getElementById('mode-screen').classList.remove('hidden');
    }
}

function selectSubGenre(subType) {
    selectedSubGenre = subType;
    document.getElementById('subgenre-screen').classList.add('hidden');
    if (isReviewMode) showReviewStartScreen();
    else document.getElementById('mode-screen').classList.remove('hidden');
}

function attachFlagImage(dataArray) {
    if (typeof worldFlagData === 'undefined') return dataArray;
    return dataArray.map(item => {
        if (item.genre === 'capital' && !item.img) {
            const flagInfo = worldFlagData.find(f => f.q === item.q);
            if (flagInfo && flagInfo.img) {
                return { ...item, img: flagInfo.img };
            }
        }
        return item;
    });
}

function getReviewTarget() {
    return savedMistakes.filter(item => {
        if (item.genre !== selectedGenre) return false;
        if ((selectedGenre === 'worldflag' || selectedGenre === 'capital') && selectedSubGenre !== 'all') {
            return item.region === selectedSubGenre;
        }
        return true;
    });
}

function showReviewStartScreen() {
    const targets = getReviewTarget();
    document.getElementById('review-count-text').textContent = `対象：${targets.length}問`;
    document.getElementById('review-start-screen').classList.remove('hidden');
}

function resetReviewList() {
    const confirmReset = confirm("このジャンルの復習リストを空にしますか？");
    if (!confirmReset) return;
    
    savedMistakes = savedMistakes.filter(item => {
        if (item.genre !== selectedGenre) return true; 
        if ((selectedGenre === 'worldflag' || selectedGenre === 'capital') && selectedSubGenre !== 'all') {
            if (item.region === selectedSubGenre) return false; 
            return true; 
        }
        return false; 
    });
    
    localStorage.setItem('anki_mistakes', JSON.stringify(savedMistakes));
    document.getElementById('review-count-text').textContent = `対象：0問`;
    alert("リセットしました！✨");
}

function startReviewQuiz() {
    let targets = getReviewTarget();
    if (targets.length === 0) {
        alert("復習する問題がありません！✨");
        return;
    }
    
    targets = attachFlagImage(targets);
    currentQuizData = [...targets];
    currentQuizData.sort(() => Math.random() - 0.5);
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
        if (selectedSubGenre !== 'all') rawData = rawData.filter(item => item.region === selectedSubGenre);
    }
    else if (type === 'capital') {
        rawData = typeof capitalData !== 'undefined' ? capitalData : [];
        if (selectedSubGenre !== 'all') rawData = rawData.filter(item => item.region === selectedSubGenre);
    }

    if (!rawData || rawData.length === 0) {
        alert("エラー：データが見つからないか、その地域に問題がありません。");
        return showHome();
    }

    currentQuizData = rawData.map(item => ({...item, genre: type}));
    currentQuizData = attachFlagImage(currentQuizData);
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

    const progressFill = document.getElementById('progress-fill');
    if (progressFill && currentQuizData.length > 0) {
        const percent = ((currentIndex + 1) / currentQuizData.length) * 100;
        progressFill.style.width = `${percent}%`;
    }

    const labels = {
        flag: "この州の州都は？", constellation: "この星座の名前は？", element: "この原子番号の元素名は？", president: "この代の大統領は？", olympic: "この年の開催地は？", mountain: "この山の名前は？", morse: "この信号の意味は？", yamanote: "この駅名は？", worldflag: "この国旗の国名は？",
        capital: "この国の首都は？"
    };
    labelEl.textContent = labels[item.genre] || "答えは何？";
    
    stateEl.textContent = (item.genre === 'constellation' || item.genre === 'worldflag') ? "" : (item.q || "");

    let displayImgUrl = getImageUrl(item.img); 
    if (item.genre === 'capital') {
        const flagItem = typeof worldFlagData !== 'undefined' ? worldFlagData.find(f => f.q === item.q) : null;
        if (flagItem && flagItem.img) displayImgUrl = getImageUrl(flagItem.img);
    }

    if (displayImgUrl && displayImgUrl !== getImageUrl("")) {
        imgEl.style.visibility = 'hidden'; 
        
        imgEl.onload = () => {
            imgEl.style.visibility = 'visible'; 
        };
        
        imgEl.src = displayImgUrl; 
        imgEl.classList.remove('hidden');
        fallbackEl.classList.add('hidden');
    } else {
        imgEl.classList.add('hidden');
        imgEl.style.visibility = 'visible'; 
        if (item.genre !== 'flag' && item.genre !== 'worldflag' && item.genre !== 'capital') {
            fallbackEl.textContent = item.q || "";
            fallbackEl.classList.remove('hidden');
        } else {
            fallbackEl.classList.add('hidden');
        }
    }

    ansEl.textContent = item.a || "データなし";
    ansEl.classList.add('hidden');
}

function saveMistake(item) {
    const exists = savedMistakes.find(m => m.a === item.a && m.genre === item.genre);
    if (!exists) {
        savedMistakes.push(item);
        localStorage.setItem('anki_mistakes', JSON.stringify(savedMistakes));
    }
}

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
        if (isReviewMode) removeMistake(currentQuizData[currentIndex]);
        nextQuestion();
    }
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuizData.length) showQuestion();
    else showResult(); 
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

    if (isVibeEnabled && navigator.vibrate) {
        if (direction === 'right') {
            navigator.vibrate(40); 
        } else {
            navigator.vibrate([40, 60, 40]); 
        }
    }

    setTimeout(() => {
        const currentItem = currentQuizData[currentIndex];
        if (direction === 'left') {
            if (!wrongAnswers.includes(currentItem)) wrongAnswers.push(currentItem);
            saveMistake(currentItem);
        } else {
            if (isReviewMode) removeMistake(currentItem);
        }
        nextQuestion(); 
    }, 300);
}

// 🌟 画面を開いた瞬間に、記憶していたダークモードを適用する！
window.onload = () => {
    applyDarkMode();
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
