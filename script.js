let currentQuizData = [];
let currentIndex = 0;
let isAnswerShowing = false;
let wrongList = []; // 間違えた問題を保存する

function getImageUrl(fileName) {
    if (!fileName) return "";
    const name = encodeURIComponent(fileName.trim().replace(/\s/g, '_'));
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=500";
}

// 画像の読み込みラグを減らすための事前読み込み
function preloadNextImage() {
    if (currentIndex + 1 < currentQuizData.length) {
        const nextImg = new Image();
        nextImg.src = getImageUrl(currentQuizData[currentIndex + 1].img);
    }
}

function handleTouch() {
    if (!isAnswerShowing) {
        showAnswer();
    } else {
        nextQuestion();
    }
}

// ヒント（！）ボタンは間違いとしてカウントする
function useHint() {
    if (!isAnswerShowing) {
        wrongList.push(currentQuizData[currentIndex]);
        showAnswer();
    }
}

function startQuiz(type) {
    currentQuizData = type === 'flag' ? [...flagData] : [...presidentData];
    currentQuizData.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    wrongList = [];
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    showQuestion();
}

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
}

function showQuestion() {
    isAnswerShowing = false;
    const item = currentQuizData[currentIndex];
    
    // カウンター更新
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${currentQuizData.length}`;
    
    // 問題文の追加（州都のみ）
    const qText = currentQuizData[0].hasOwnProperty('img') && flagData.includes(currentQuizData[0]) 
                  ? "この州の州都は？" : "この大統領の名前は？";
    document.getElementById('question-label').textContent = qText;
    document.getElementById('question-text').textContent = item.q;
    
    // 画像表示（ラグ対策：読み込み完了まで少し透明にする等の処理も可）
    const imgEl = document.getElementById('question-img');
    imgEl.src = getImageUrl(item.img);
    
    document.getElementById('answer-text').textContent = item.a;
    document.getElementById('answer-text').style.display = 'none';
    
    preloadNextImage(); // 次の画像を裏で読み込み
}

function showAnswer() {
    isAnswerShowing = true;
    document.getElementById('answer-text').style.display = 'block';
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
        resList.innerHTML = "<p style='padding:20px;'>全問正解！素晴らしい！</p>";
    } else {
        // 重複を削除して表示
        const uniqueWrongs = Array.from(new Set(wrongList));
        resList.innerHTML = "<h3>復習リスト</h3>" + uniqueWrongs.map(item => 
            `<div class="wrong-item"><b>${item.q}</b>: ${item.a}</div>`
        ).join('');
    }
}
