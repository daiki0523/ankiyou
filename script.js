let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let lastClickTime = 0;
let wrongAnswers = []; 
let selectedGenre = "";

// 🌟 スワイプアニメーション用の変数
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
    document.getElementById('mode-screen').classList.add('hidden'); 
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
}

function selectGenre(type) {
    selectedGenre = type; 
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('mode-screen').classList.remove('hidden');
}

function startQuizMode(isRandom) {
    let rawData;
    const type = selectedGenre;
    
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

    // 🌟 カードの位置とデザインを完全にリセット
    problemArea.className = 'problem-area-box reset-position';
    // transitionを無効にしてからリセットし、一瞬待ってからtransitionを戻す
    setTimeout(() => {
        problemArea.classList.remove('reset-position');
        problemArea.style.transform = '';
    }, 10);

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
    if (isAnimating || isAnswerShowing) {
        const now = Date.now();
        if (now - lastClickTime < 300) return;
        lastClickTime = now;
        nextQuestion();
    } else {
        isAnswerShowing = true;
        document.getElementById('answer-text').classList.remove('hidden');
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

// 🌟 カードを画面外に飛ばして次の問題へ
function flyOutCard(direction) {
    if (isAnimating) return;
    isAnimating = true;
    const problemArea = document.getElementById('problem-area');
    
    // アニメーション用クラスを追加
    problemArea.classList.add(direction === 'right' ? 'card-out-right' : 'card-out-left');

    // アニメーション完了後にロジックを実行
    setTimeout(() => {
        if (direction === 'left') {
            useHint(); // 左スワイプは「間違えた」
        } else {
            if (!isAnswerShowing) {
                isAnswerShowing = true;
                document.getElementById('answer-text').classList.remove('hidden');
                setTimeout(nextQuestion, 100); // 答えを見せてから次へ（ちょっと待つ）
            } else {
                nextQuestion(); // すでに答えが出ていればそのまま次へ
            }
        }
    }, 300); // CSSのtransitionと同じ時間
}

window.onload = () => {
    showHome();
    
    // 🌟 カードのスワイプイベント
    const problemArea = document.getElementById('problem-area');
    const threshold = 100; // 画面外に飛ばす判定距離(px)

    problemArea.addEventListener('touchstart', e => {
        if (isAnimating) return;
        touchStartX = e.changedTouches[0].clientX;
        touchCurrentX = touchStartX;
        problemArea.style.transition = 'none'; // 動かしている間はtransitionを切る
    }, {passive: true});

    problemArea.addEventListener('touchmove', e => {
        if (isAnimating || isAnswerShowing) return; // 答え表示後やアニメ中は動かさない
        touchCurrentX = e.changedTouches[0].clientX;
        const diffX = touchCurrentX - touchStartX;
        
        // カードを指に合わせて回転させながら動かす
        const rotate = diffX * 0.05; // 回転角度の調整
        problemArea.style.transform = `translate(${diffX}px, 0) rotate(${rotate}deg)`;

        // 🌟 背景色のフィードバック
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

        // transitionを戻す
        problemArea.style.transition = '';
        problemArea.classList.remove('swiping-right', 'swiping-left');

        // 🌟 スワイプの判定
        if (Math.abs(diffX) > threshold) {
            // 十分動かしたので飛ばす
            flyOutCard(diffX > 0 ? 'right' : 'left');
        } else {
            // 動かし方が足りないので、真ん中に戻す
            problemArea.style.transform = '';
            // タップ判定 (動きがほとんどない場合)
            if (Math.abs(diffX) < 10) {
                handleTouch();
            }
        }
    });
};
