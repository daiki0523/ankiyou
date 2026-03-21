let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;
let wrongAnswers = []; 
let selectedGenre = "";
let selectedSubGenre = "all"; // 🌟 追加：選んだサブジャンルを記憶する変数

let touchStartX = 0;
let touchCurrentX = 0;
let isAnimating = false;

function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

// 🌟 worldFlagData も読み込めるように追加
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
    document.getElementById('subgenre-screen').classList.add('hidden'); // 🌟 追加
    document.getElementById('mode-screen').classList.add('hidden'); 
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
}

function selectGenre(type) {
    selectedGenre = type; 
    selectedSubGenre = "all"; // リセット
    document.getElementById('home-screen').classList.add('hidden');

    // 🌟 「国旗（worldflag）」を選んだ時だけ、地域選択ページへ寄り道する！
    if (type === 'worldflag') {
        document.getElementById('subgenre-screen').classList.remove('hidden');
    } else {
        // それ以外は今まで通り出題形式ページへ
        document.getElementById('mode-screen').classList.remove('hidden');
    }
}

// 🌟 追加：地域を選んだあとの処理
function selectSubGenre(subType) {
    selectedSubGenre = subType; // アジア、ヨーロッパなどを記憶
    document.getElementById('subgenre-screen').classList.add('hidden');
    document.getElementById('mode-screen').classList.remove('hidden'); // 出題形式へ進む
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
        // 🌟 ここで絞り込み！「ぜんぶ(all)」以外なら、その地域のものだけを残す
        if (selectedSubGenre !== 'all') {
            rawData = rawData.filter(item => item.region === selectedSubGenre);
        }
    }

    if (!rawData || rawData.length === 0) {
        alert("エラー：データが見つからないか、その地域に問題がありません。");
        return showHome();
    }

    currentQuizData = rawData.map(item => ({...item, genre: type}));
    
    if (isRandom) {
        currentQuizData.sort(() => Math.random() - 0.5);
    }

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
        flag: "この州の州都は？",
        constellation: "この星座の名前は？",
        element: "この原子番号の元素名は？",
        president: "この代の大統領は？",
        olympic: "この年の開催地は？",
        mountain: "この山の名前は？",
        morse: "この信号の意味は？",
        yamanote: "この駅名は？",
        worldflag: "この国旗の国名は？" // 🌟 追加
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

function useHint() { 
    const currentItem = currentQuizData[currentIndex];
    if (!wrongAnswers.includes(currentItem)) {
        wrongAnswers.push(currentItem);
    }
    
    if (!isAnswerShowing) {
        isAnswerShowing = true;
        document.getElementById('answer-text').classList.remove('hidden');
        lastClickTime = Date.now();
    } else {
        nextQuestion();
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
        if (direction === 'left') {
            const currentItem = currentQuizData[currentIndex];
            if (!wrongAnswers.includes(currentItem)) {
                wrongAnswers.push(currentItem);
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
            if (Math.abs(diffX) < 10) {
                handleTouch();
            }
        }
    });
};
