// startQuiz 関数の中身がこうなっているか確認してください
function startQuiz(type) {
    const rawData = type === 'flag' ? flagData : presidentData;
    currentQuizData = rawData.map(item => ({...item, genre: type}));
    
    currentQuizData.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    wrongList = [];
    
    // 画面の切り替え
    document.getElementById('menu').classList.add('hidden'); // メニューを隠す
    document.getElementById('quiz').classList.remove('hidden'); // クイズを出す
    document.getElementById('home-btn').classList.remove('hidden'); // 終了ボタンを出す
    document.getElementById('result-screen').classList.add('hidden'); // 結果を隠す
    
    showQuestion();
}

// showMenu 関数（終了・戻るボタン用）
function showMenu() {
    document.getElementById('menu').classList.remove('hidden'); // メニューを出す
    document.getElementById('quiz').classList.add('hidden'); // クイズを隠す
    document.getElementById('result-screen').classList.add('hidden'); // 結果を隠す
    document.getElementById('home-btn').classList.add('hidden'); // 終了ボタンを隠す
}
