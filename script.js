let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let wrongList = []; 
let lastClickTime = 0; // 連打防止用

function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

function handleTouch() {
    // 0.3秒以内の連打を無視（誤操作防止）
    const now = Date.now();
    if (now - lastClickTime < 300) return;
    lastClickTime = now;

    if (!isAnswerShowing) {
        showAnswer();
    } else {
        nextQuestion();
    }
}

function useHint() {
    if (!isAnswerShowing) {
        // 現在の問題を間違いリストに追加（ID等があればもっと確実）
        wrongList.push(JSON.stringify(currentQuizData[currentIndex])); 
        showAnswer();
    }
}

function startQuiz(type) {
    // ジャンル情報をデータに直接埋め込む（判定ミス防止）
    const rawData = type === 'flag' ? flagData : presidentData;
    currentQuizData = rawData.map(item => ({...item, genre: type}));
    
    currentQuizData.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    wrongList = [];
    
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('home-btn').classList.remove('hidden');
    showQuestion();
}

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('home-btn').classList.add('hidden');
}

function showQuestion() {
    isAnswerShowing = false;
    const item = currentQuizData[currentIndex];
    
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${currentQuizData.length}`;
    document.getElementById('question-label').textContent = (item.genre === 'flag') ? "この州の州都は？" : "この大統領の名前は？";
    document.getElementById('question-text').textContent = item.q;
    
    const imgEl = document.getElementById('question-img');
    imgEl.src = getImageUrl(item.img);
    
    document.getElementById('answer-text').textContent = item.a;
    document.getElementById('answer-text').classList.add('hidden');
}

function showAnswer() {
    isAnswerShowing = true;
    document.getElementById('answer-text').classList.remove('hidden');
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
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const resList = document.getElementById('wrong-results');
    if (wrongList.length === 0) {
        resList.innerHTML = "<p>🎉 パーフェクト！</p>";
    } else {
        // 文字列化してSetで重複を消してから元に戻す（確実な重複削除）
        const uniqueWrongs = Array.from(new Set(wrongList)).map(s => JSON.parse(s));
        
        resList.innerHTML = uniqueWrongs.map(item => `
            <div class="wrong-item">
                <img src="${getImageUrl(item.img)}" style="width:50px; height:35px; object-fit:cover;">
                <div style="text-align:left;">
                    <div style="font-size:10px; color:#999;">${item.q}</div>
                    <div style="font-size:16px;">${item.a}</div>
                </div>
            </div>
        `).join('');
    }
}
