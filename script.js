const data = [
    { q: "アイダホ州", a: "ボイシ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_Idaho.svg/250px-Flag_of_Idaho.svg.png" },
    { q: "アイオワ州", a: "デモイン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Iowa.svg/250px-Flag_of_Iowa.svg.png" },
    { q: "アラバマ州", a: "モンゴメリー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Alabama.svg/250px-Flag_of_Alabama.svg.png" },
    { q: "アラスカ州", a: "ジュノー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Alaska.svg/250px-Flag_of_Alaska.svg.png" },
    { q: "アリゾナ州", a: "フェニックス", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arizona.svg/250px-Flag_of_Arizona.svg.png" },
    { q: "アーカンソー州", a: "リトルロック", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Arkansas.svg/250px-Flag_of_Arkansas.svg.png" },
    { q: "イリノイ州", a: "スプリングフィールド", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Illinois.svg/250px-Flag_of_Illinois.svg.png" },
    { q: "インディアナ州", a: "インディアナポリス", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Flag_of_Indiana.svg/250px-Flag_of_Indiana.svg.png" },
    { q: "ウィスコンシン州", a: "マディソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_Wisconsin.svg/250px-Flag_of_Wisconsin.svg.png" },
    { q: "ウェストバージニア州", a: "チャールストン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Flag_of_West_Virginia.svg/250px-Flag_of_West_Virginia.svg.png" },
    { q: "オハイオ州", a: "コロンバス", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Ohio.svg/250px-Flag_of_Ohio.svg.png" },
    { q: "オレゴン州", a: "セイラム", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Oregon.svg/250px-Flag_of_Oregon.svg.png" },
    { q: "オクラホマ州", a: "オクラホマシティ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Oklahoma.svg/250px-Flag_of_Oklahoma.svg.png" },
    { q: "カンザス州", a: "トピカ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Kansas.svg/250px-Flag_of_Kansas.svg.png" },
    { q: "カリフォルニア州", a: "サクラメント", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/250px-Flag_of_California.svg.png" },
    { q: "ケンタッキー州", a: "フランクフォート", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Flag_of_Kentucky.svg/250px-Flag_of_Kentucky.svg.png" },
    { q: "コネチカット州", a: "ハートフォード", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_Connecticut.svg/250px-Flag_of_Connecticut.svg.png" },
    { q: "コロラド州", a: "デンバー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Flag_of_Colorado.svg/250px-Flag_of_Colorado.svg.png" },
    { q: "サウスカロライナ州", a: "コロンビア", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Flag_of_South_Carolina.svg/250px-Flag_of_South_Carolina.svg.png" },
    { q: "サウスダコタ州", a: "ピア", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_South_Dakota.svg/250px-Flag_of_South_Dakota.svg.png" },
    { q: "ジョージア州", a: "アトランタ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_the_State_of_Georgia.svg/250px-Flag_of_the_State_of_Georgia.svg.png" },
    { q: "テネシー州", a: "ナッシュビル", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Tennessee.svg/250px-Flag_of_Tennessee.svg.png" },
    { q: "テキサス州", a: "オースティン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Texas.svg/250px-Flag_of_Texas.svg.png" },
    { q: "デラウェア州", a: "ドーバー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Flag_of_Delaware.svg/250px-Flag_of_Delaware.svg.png" },
    { q: "ニューメキシコ州", a: "サンタフェ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_New_Mexico.svg/250px-Flag_of_New_Mexico.svg.png" },
    { q: "ニュージャージー州", a: "トレントン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_New_Jersey.svg/250px-Flag_of_New_Jersey.svg.png" },
    { q: "ニューハンプシャー州", a: "コンコード", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_New_Hampshire.svg/250px-Flag_of_New_Hampshire.svg.png" },
    { q: "ニューヨーク州", a: "オールバニ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_New_York.svg/250px-Flag_of_New_York.svg.png" },
    { q: "ネバダ州", a: "カーソンシティ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Nevada.svg/250px-Flag_of_Nevada.svg.png" },
    { q: "ネブラスカ州", a: "リンカーン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Flag_of_Nebraska.svg/250px-Flag_of_Nebraska.svg.png" },
    { q: "ノースダコタ州", a: "ビスマーク", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Flag_of_North_Dakota.svg/250px-Flag_of_North_Dakota.svg.png" },
    { q: "ノースカロライナ州", a: "ローリー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_North_Carolina.svg/250px-Flag_of_North_Carolina.svg.png" },
    { q: "ハワイ州", a: "ホノルル", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Hawaii.svg/250px-Flag_of_Hawaii.svg.png" },
    { q: "バーモンド州", a: "モントピリア", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Vermont.svg/250px-Flag_of_Vermont.svg.png" },
    { q: "バージニア州", a: "リッチモンド", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Virginia.svg/250px-Flag_of_Virginia.svg.png" },
    { q: "フロリダ州", a: "タラハシー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Florida.svg/250px-Flag_of_Florida.svg.png" },
    { q: "ペンシルベニア州", a: "ハリスバーグ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flag_of_Pennsylvania.svg/250px-Flag_of_Pennsylvania.svg.png" },
    { q: "マサチューセッツ州", a: "ボストン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Massachusetts.svg/250px-Flag_of_Massachusetts.svg.png" },
    { q: "ミシガン州", a: "ランシング", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Michigan.svg/250px-Flag_of_Michigan.svg.png" },
    { q: "ミネソタ州", a: "セントポール", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Minnesota.svg/250px-Flag_of_Minnesota.svg.png" },
    { q: "ミズーリ州", a: "ジェファーソンシティ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Flag_of_Missouri.svg/250px-Flag_of_Missouri.svg.png" },
    { q: "ミシシッピ州", a: "ジャクソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_Mississippi.svg/250px-Flag_of_Mississippi.svg.png" },
    { q: "メイン州", a: "オーガスタ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Maine.svg/250px-Flag_of_Maine.svg.png" },
    { q: "メリーランド州", a: "アナポリス", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Maryland.svg/250px-Flag_of_Maryland.svg.png" },
    { q: "モンタナ州", a: "ヘレナ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_Montana.svg/250px-Flag_of_Montana.svg.png" },
    { q: "ユタ州", a: "ソルトレイクシティ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Utah.svg/250px-Flag_of_Utah.svg.png" },
    { q: "ルイジアナ州", a: "バトンルージュ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flag_of_Louisiana.svg/250px-Flag_of_Louisiana.svg.png" },
    { q: "ロードアイランド州", a: "プロビデンス", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Rhode_Island.svg/250px-Flag_of_Rhode_Island.svg.png" },
    { q: "ワイオミング州", a: "シャイアン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Wyoming.svg/250px-Flag_of_Wyoming.svg.png" },
    { q: "ワシントン州", a: "オリンピア", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/250px-Flag_of_Washington.svg.png" },
];
let quizData = []; 
let shuffledData = [];
let currentIndex = 0;
let isShowingAnswer = false;

// 要素の取得
const cardElement = document.getElementById('card');
const qElement = document.getElementById('question');
const aElement = document.getElementById('answer');
const imgElement = document.getElementById('state-img');
const counterElement = document.getElementById('counter');
const menuScreen = document.getElementById('menu-screen');
const quizScreen = document.getElementById('quiz-screen');

// クイズ開始関数（グローバルに公開）
window.startQuiz = function(genre) {
    if (genre === 'flags') {
        quizData = flagData;
    }
    
    menuScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
    
    initQuiz();
};

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function initQuiz() {
    shuffledData = shuffleArray(quizData);
    currentIndex = 0;
    updateCard();
}

function updateCard() {
    isShowingAnswer = false;
    const currentData = shuffledData[currentIndex];
    counterElement.innerText = `${currentIndex + 1} / ${shuffledData.length}`;

    setTimeout(() => {
        qElement.innerText = currentData.q;
        imgElement.src = ""; 
        imgElement.src = currentData.img;
        aElement.innerText = currentData.a;
    }, 150);

    cardElement.classList.remove('is-flipped');
}

cardElement.addEventListener('click', () => {
    if (!isShowingAnswer) {
        cardElement.classList.add('is-flipped');
        isShowingAnswer = true;
    } else {
        cardElement.style.opacity = "0";
        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= shuffledData.length) {
                alert("全問クリア！");
                location.reload(); 
            } else {
                updateCard();
            }
            setTimeout(() => {
                cardElement.style.opacity = "1";
            }, 100);
        }, 300);
    }
});
