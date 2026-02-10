// --- 1. 50州データ ---
const flagData = [
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
    { q: "ロードアイランド州", a: "プロビデンス", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Rhode_Island.svg/250px-Rhode_Island.svg.png" },
    { q: "ワイオミング州", a: "シャイアン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Wyoming.svg/250px-Flag_of_Wyoming.svg.png" },
    { q: "ワシントン州", a: "オリンピア", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/250px-Flag_of_Washington.svg.png" }
];

// --- 2. 大統領データ ---
const presidentData = [
    { q: "第1代大統領", a: "ジョージ・ワシントン", img: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_William_Einstman_Portrait_of_George_Washington.jpg" },
    { q: "第2代大統領", a: "ジョン・アダムズ", img: "https://upload.wikimedia.org/wikipedia/commons/7/70/John_Adams%2C_official_Presidential_portrait.jpg" },
    { q: "第3代大統領", a: "トーマス・ジェファーソン", img: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Thomas_Jefferson_by_Rembrandt_Peale_1800.jpg" },
    { q: "第4代大統領", a: "ジェームズ・マディソン", img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/James_Madison.jpg" },
    { q: "第5代大統領", a: "ジェームズ・モンロー", img: "https://upload.wikimedia.org/wikipedia/commons/d/d4/James_Monroe_White_House_portrait_1819.jpg" },
    { q: "第6代大統領", a: "ジョン・Q・アダムズ", img: "https://upload.wikimedia.org/wikipedia/commons/4/4f/John_Quincy_Adams_by_George_Healy%2C_1858.jpg" },
    { q: "第7代大統領", a: "アンドリュー・ジャクソン", img: "https://upload.wikimedia.org/wikipedia/commons/4/43/Andrew_jackson_head.jpg" },
    { q: "第8代大統領", a: "マーティン・ヴァン・ビューレン", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Martin_Van_Buren_White_House_portrait_1858.jpg" },
    { q: "第9代大統領", a: "ウィリアム・H・ハリソン", img: "https://upload.wikimedia.org/wikipedia/commons/c/c5/William_Henry_Harrison_daguerreotype_edit.jpg" },
    { q: "第10代大統領", a: "ジョン・タイラー", img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/John_Tyler.jpg" },
    { q: "第11代大統領", a: "ジェームズ・K・ポーク", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/James_K._Polk_official_portrait.jpg" },
    { q: "第12代大統領", a: "ザカリー・テイラー", img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Zachary_Taylor_restored_and_cropped.jpg" },
    { q: "第13代大統領", a: "ミラード・フィルモア", img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Millard_Fillmore.jpg" },
    { q: "第14代大統領", a: "フランクリン・ピアース", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Franklin_Pierce_by_George_Healy%2C_1853.jpg" },
    { q: "第15代大統領", a: "ジェームズ・ブキャナン", img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/James_Buchanan.jpg" },
    { q: "第16代大統領", a: "エイブラハム・リンカーン", img: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg" },
    { q: "第17代大統領", a: "アンドリュー・ジョンソン", img: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Andrew_Johnson_photo_portrait_c1860-1865.jpg" },
    { q: "第18代大統領", a: "ユリシーズ・S・グラント", img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Ulysses_S._Grant_1870-1880.jpg" },
    { q: "第19代大統領", a: "ラザフォード・B・ヘイズ", img: "https://upload.wikimedia.org/wikipedia/commons/5/50/RutherfordBHayes.png" },
    { q: "第20代大統領", a: "ジェームズ・A・ガーフィールド", img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/James_Abram_Garfield%2C_photo_portrait%2C_1881.jpg" },
    { q: "第21代大統領", a: "チェスター・A・アーサー", img: "https://upload.wikimedia.org/wikipedia/commons/7/79/Chester_Alan_Arthur.jpg" },
    { q: "第22代大統領", a: "グロバー・クリーブランド", img: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Grover_Cleveland_-_NARA_-_518139_%28cropped%29.jpg" },
    { q: "第23代大統領", a: "ベンジャミン・ハリソン", img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Benjamin_Harrison_by_Pach_Bros%2C_1888.jpg" },
    { q: "第24代大統領", a: "グロバー・クリーブランド", img: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Grover_Cleveland_-_NARA_-_518139_%28cropped%29.jpg" },
    { q: "第25代大統領", a: "ウィリアム・マッキンリー", img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Mckinley.jpg" },
    { q: "第26代大統領", a: "セオドア・ルーズベルト", img: "https://upload.wikimedia.org/wikipedia/commons/1/1c/President_Thodore_Roosevelt%2C_1904.jpg" },
    { q: "第27代大統領", a: "ウィリアム・H・タフト", img: "https://upload.wikimedia.org/wikipedia/commons/b/be/William_Howard_Taft_1909.jpg" },
    { q: "第28代大統領", a: "ウッドロウ・ウィルソン", img: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Woodrow_Wilson-Harris_%26_Ewing.jpg" },
    { q: "第29代大統領", a: "ウォレン・G・ハーディング", img: "https://upload.wikimedia.org/wikipedia/commons/8/87/Warren_G_Harding_portrait_as_Senator_June_1920.jpg" },
    { q: "第30代大統領", a: "カルビン・クーリッジ", img: "https://upload.wikimedia.org/wikipedia/commons/3/37/Calvin_Coolidge%2C_White_House_color_photo_portrait.jpg" },
    { q: "第31代大統領", a: "ハーバート・フーヴァー", img: "https://upload.wikimedia.org/wikipedia/commons/b/ba/HerbertHoover.jpg" },
    { q: "第32代大統領", a: "フランクリン・D・ルーズベルト", img: "https://upload.wikimedia.org/wikipedia/commons/4/42/FDR_1944_Color_Portrait.jpg" },
    { q: "第33代大統領", a: "ハリー・S・トルーマン", img: "https://upload.wikimedia.org/wikipedia/commons/0/06/Harry-truman.jpg" },
    { q: "第34代大統領", a: "ドワイト・D・アイゼンハワー", img: "https://upload.wikimedia.org/wikipedia/commons/6/63/Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_1959.jpg" },
    { q: "第35代大統領", a: "ジョン・F・ケネディ", img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg" },
    { q: "第36代大統領", a: "リンドン・B・ジョンソン", img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Lyndon_B._Johnson_official_portrait.jpg" },
    { q: "第37代大統領", a: "リチャード・ニクソン", img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Richard_Nixon.jpg" },
    { q: "第38代大統領", a: "ジェラルド・フォード", img: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Gerald_Ford_official_portrait_1974.jpg" },
    { q: "第39代大統領", a: "ジミー・カーター", img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/JimmyCarterPortrait2.jpg" },
    { q: "第40代大統領", a: "ロナルド・レーガン", img: "https://upload.wikimedia.org/wikipedia/commons/1/16/Official_Portrait_of_President_Reagan_1981.jpg" },
    { q: "第41代大統領", a: "ジョージ・H・W・ブッシュ", img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/George_H._W._Bush_official_presidential_portrait.jpg" },
    { q: "第42代大統領", a: "ビル・クリントン", img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Bill_Clinton.jpg" },
    { q: "第43代大統領", a: "ジョージ・W・ブッシュ", img: "https://upload.wikimedia.org/wikipedia/commons/d/d4/George-W-Bush.jpg" },
    { q: "第44代大統領", a: "バラク・オバマ", img: "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg" },
    { q: "第45代大統領", a: "ドナルド・トランプ", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg" },
    { q: "第46代大統領", a: "ジョー・バイデン", img: "https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg" },
    { q: "第47代大統領", a: "ドナルド・トランプ", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg" }
];
// --- 3. 変数管理 ---
let quizData = [];
let shuffledData = [];
let currentIndex = 0;
let isShowingAnswer = false;
let wrongList = [];

const card = document.getElementById('card');
const checkBtn = document.getElementById('check-btn');

// --- 4. 画面切り替え ---
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'flex';
    }
}

// --- 5. クイズ開始 ---
window.startQuiz = function(genre) {
    // ジャンルを保存（問題文の切り替え用）
    window.currentGenre = genre; 

    if (genre === 'presidents') {
        quizData = presidentData;
    } else {
        quizData = flagData;
    }

    shuffledData = [...quizData].sort(() => Math.random() - 0.5);
    currentIndex = 0;
    wrongList = [];
    
    switchScreen('quiz-screen');
    updateCard();
};

// --- 6. カード更新 ---
function updateCard() {
    isShowingAnswer = false;
    checkBtn.style.visibility = 'hidden';
    const data = shuffledData[currentIndex];
    
    // ジャンルによってラベルと問題文を切り替える
    const labelFront = document.querySelector('.card-front .label');
    const labelBack = document.querySelector('.card-back .label');
    
    if (window.currentGenre === 'presidents') {
        labelFront.innerText = "この大統領の名前は？";
        labelBack.innerText = "名前";
    } else {
        labelFront.innerText = "この州の州都は？";
        labelBack.innerText = "州都";
    }

    document.getElementById('counter').innerText = `${currentIndex + 1} / ${shuffledData.length}`;
    document.getElementById('question').innerText = data.q;
    document.getElementById('state-img').src = data.img;
    document.getElementById('answer').innerText = data.a;
    
    card.classList.remove('is-flipped');
}

// --- 7. クリック処理 ---
window.handleCardClick = function() {
    if (!isShowingAnswer) {
        card.classList.add('is-flipped');
        isShowingAnswer = true;
        checkBtn.style.visibility = 'visible';
    } else {
        nextQuestion();
    }
};

// --- 8. 間違いチェック ---
window.markWrong = function(event) {
    event.stopPropagation();
    const item = shuffledData[currentIndex];
    wrongList.push({ q: item.q, a: item.a });
    nextQuestion();
};

// --- 9. 次へ ---
function nextQuestion() {
    currentIndex++;
    if (currentIndex < shuffledData.length) {
        updateCard();
    } else {
        showResult();
    }
}

// --- 10. 結果表示 ---
function showResult() {
    switchScreen('result-screen');
    document.getElementById('result-stats').innerText = `${shuffledData.length}問中 ${shuffledData.length - wrongList.length}問 正解！`;
    
    const listHtml = wrongList.length > 0 
        ? wrongList.map(item => `
            <div style="margin-bottom: 10px; border-bottom: 1px dashed #ccc; padding-bottom: 5px;">
                <span style="color: #d32f2f; font-weight: bold;">${item.q}</span><br>
                <span style="color: #555; font-size: 0.9em;">正解：${item.a}</span>
            </div>`).join("")
        : "全問正解！素晴らしい！";
        
    document.getElementById('wrong-list').innerHTML = listHtml;
}

// --- 11. ホームへ戻る ---
window.goHome = function() {
    switchScreen('menu-screen');
};
