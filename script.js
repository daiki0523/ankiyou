// Wikipedia画像取得用の安定URL関数
function getWikiImg(fileName) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${fileName}?width=500`;
}

const flagData = [
    { q: "アイダホ州", a: "ボイシ", img: getWikiImg("Flag_of_Idaho.svg") },
    { q: "アイオワ州", a: "デモイン", img: getWikiImg("Flag_of_Iowa.svg") },
    { q: "アラバマ州", a: "モンゴメリー", img: getWikiImg("Flag_of_Alabama.svg") },
    { q: "アラスカ州", a: "ジュノー", img: getWikiImg("Flag_of_Alaska.svg") },
    { q: "アリゾナ州", a: "フェニックス", img: getWikiImg("Flag_of_Arizona.svg") },
    { q: "アーカンソー州", a: "リトルロック", img: getWikiImg("Flag_of_Arkansas.svg") },
    { q: "イリノイ州", a: "スプリングフィールド", img: getWikiImg("Flag_of_Illinois.svg") },
    { q: "インディアナ州", a: "インディアナポリス", img: getWikiImg("Flag_of_Indiana.svg") },
    { q: "ウィスコンシン州", a: "マディソン", img: getWikiImg("Flag_of_Wisconsin.svg") },
    { q: "ウェストバージニア州", a: "チャールストン", img: getWikiImg("Flag_of_West_Virginia.svg") },
    { q: "オハイオ州", a: "コロンバス", img: getWikiImg("Flag_of_Ohio.svg") },
    { q: "オレゴン州", a: "セイラム", img: getWikiImg("Flag_of_Oregon.svg") },
    { q: "オクラホマ州", a: "オクラホマシティ", img: getWikiImg("Flag_of_Oklahoma.svg") },
    { q: "カンザス州", a: "トピカ", img: getWikiImg("Flag_of_Kansas.svg") },
    { q: "カリフォルニア州", a: "サクラメント", img: getWikiImg("Flag_of_California.svg") },
    { q: "ケンタッキー州", a: "フランクフォート", img: getWikiImg("Flag_of_Kentucky.svg") },
    { q: "コネチカット州", a: "ハートフォード", img: getWikiImg("Flag_of_Connecticut.svg") },
    { q: "コロラド州", a: "デンバー", img: getWikiImg("Flag_of_Colorado.svg") },
    { q: "サウスカロライナ州", a: "コロンビア", img: getWikiImg("Flag_of_South_Carolina.svg") },
    { q: "サウスダコタ州", a: "ピア", img: getWikiImg("Flag_of_South_Dakota.svg") },
    { q: "ジョージア州", a: "アトランタ", img: getWikiImg("Flag_of_the_State_of_Georgia.svg") },
    { q: "テネシー州", a: "ナッシュビル", img: getWikiImg("Flag_of_Tennessee.svg") },
    { q: "テキサス州", a: "オースティン", img: getWikiImg("Flag_of_Texas.svg") },
    { q: "デラウェア州", a: "ドーバー", img: getWikiImg("Flag_of_Delaware.svg") },
    { q: "ニューメキシコ州", a: "サンタフェ", img: getWikiImg("Flag_of_New_Mexico.svg") },
    { q: "ニュージャージー州", a: "トレントン", img: getWikiImg("Flag_of_New_Jersey.svg") },
    { q: "ニューハンプシャー州", a: "コンコード", img: getWikiImg("Flag_of_New_Hampshire.svg") },
    { q: "ニューヨーク州", a: "オールバニ", img: getWikiImg("Flag_of_New_York.svg") },
    { q: "ネバダ州", a: "カーソンシティ", img: getWikiImg("Flag_of_Nevada.svg") },
    { q: "ネブラスカ州", a: "リンカーン", img: getWikiImg("Flag_of_Nebraska.svg") },
    { q: "ノースダコタ州", a: "ビスマーク", img: getWikiImg("Flag_of_North_Dakota.svg") },
    { q: "ノースカロライナ州", a: "ローリー", img: getWikiImg("Flag_of_North_Carolina.svg") },
    { q: "ハワイ州", a: "ホノルル", img: getWikiImg("Flag_of_Hawaii.svg") },
    { q: "バーモント州", a: "モントピリア", img: getWikiImg("Flag_of_Vermont.svg") },
    { q: "バージニア州", a: "リッチモンド", img: getWikiImg("Flag_of_Virginia.svg") },
    { q: "フロリダ州", a: "タラハシー", img: getWikiImg("Flag_of_Florida.svg") },
    { q: "ペンシルベニア州", a: "ハリスバーグ", img: getWikiImg("Flag_of_Pennsylvania.svg") },
    { q: "マサチューセッツ州", a: "ボストン", img: getWikiImg("Flag_of_Massachusetts.svg") },
    { q: "ミシガン州", a: "ランシング", img: getWikiImg("Flag_of_Michigan.svg") },
    { q: "ミネソタ州", a: "セントポール", img: getWikiImg("Flag_of_Minnesota.svg") },
    { q: "ミズーリ州", a: "ジェファーソンシティ", img: getWikiImg("Flag_of_Missouri.svg") },
    { q: "ミシシッピ州", a: "ジャクソン", img: getWikiImg("Flag_of_Mississippi.svg") },
    { q: "メイン州", a: "オーガスタ", img: getWikiImg("Flag_of_Maine.svg") },
    { q: "メリーランド州", a: "アナポリス", img: getWikiImg("Flag_of_Maryland.svg") },
    { q: "モンタナ州", a: "ヘレナ", img: getWikiImg("Flag_of_Montana.svg") },
    { q: "ユタ州", a: "ソルトレイクシティ", img: getWikiImg("Flag_of_Utah.svg") },
    { q: "ルイジアナ州", a: "バトンルージュ", img: getWikiImg("Flag_of_Louisiana.svg") },
    { q: "ロードアイランド州", a: "プロビデンス", img: getWikiImg("Flag_of_Rhode_Island.svg") },
    { q: "ワイオミング州", a: "シャイアン", img: getWikiImg("Flag_of_Wyoming.svg") },
    { q: "ワシントン州", a: "オリンピア", img: getWikiImg("Flag_of_Washington.svg") }
];

const presidentData = [
    { q: "第1代", a: "ジョージ・ワシントン", img: getWikiImg("George_Washington.jpg") },
    { q: "第2代", a: "ジョン・アダムズ", img: getWikiImg("John_Adams_Official_Presidential_Portrait.jpg") },
    { q: "第3代", a: "トーマス・ジェファーソン", img: getWikiImg("Thomas_Jefferson.jpg") },
    { q: "第4代", a: "ジェームズ・マディソン", img: getWikiImg("James_Madison.jpg") },
    { q: "第5代", a: "ジェームズ・モンロー", img: getWikiImg("James_Monroe.jpg") },
    { q: "第6代", a: "ジョン・クィンシー・アダムズ", img: getWikiImg("John_Quincy_Adams.jpg") },
    { q: "第7代", a: "アンドリュー・ジャクソン", img: getWikiImg("Andrew_jackson_head.jpg") },
    { q: "第8代", a: "マーティン・ヴァン・ビューレン", img: getWikiImg("Martin_Van_Buren.jpg") },
    { q: "第9代", a: "ウィリアム・ヘンリー・ハリソン", img: getWikiImg("William_Henry_Harrison.jpg") },
    { q: "第10代", a: "ジョン・タイラー", img: getWikiImg("John_Tyler.jpg") },
    { q: "第11代", a: "ジェームズ・K・ポーク", img: getWikiImg("James_K._Polk.jpg") },
    { q: "第12代", a: "ザカリー・テイラー", img: getWikiImg("Zachary_Taylor.jpg") },
    { q: "第13代", a: "ミラード・フィルモア", img: getWikiImg("Millard_Fillmore.jpg") },
    { q: "第14代", a: "フランクリン・ピアース", img: getWikiImg("Franklin_Pierce.jpg") },
    { q: "第15代", a: "ジェームズ・ブキャナン", img: getWikiImg("James_Buchanan.jpg") },
    { q: "第16代", a: "エイブラハム・リンカーン", img: getWikiImg("Abraham_Lincoln.jpg") },
    { q: "第17代", a: "アンドリュー・ジョンソン", img: getWikiImg("Andrew_Johnson.jpg") },
    { q: "第18代", a: "ユリシーズ・S・グラント", img: getWikiImg("Ulysses_S._Grant.jpg") },
    { q: "第19代", a: "ラザフォード・B・ヘイズ", img: getWikiImg("Rutherford_B._Hayes.png") },
    { q: "第20代", a: "ジェームズ・A・ガーフィールド", img: getWikiImg("James_Abram_Garfield.jpg") },
    { q: "第21代", a: "チェスター・A・アーサー", img: getWikiImg("Chester_Alan_Arthur.jpg") },
    { q: "第22代", a: "グロバー・クリーブランド", img: getWikiImg("Grover_Cleveland.jpg") },
    { q: "第23代", a: "ベンジャミン・ハリソン", img: getWikiImg("Benjamin_Harrison.jpg") },
    { q: "第24代", a: "グロバー・クリーブランド", img: getWikiImg("Grover_Cleveland.jpg") },
    { q: "第25代", a: "ウィリアム・マッキンリー", img: getWikiImg("William_McKinley.jpg") },
    { q: "第26代", a: "セオドア・ルーズベルト", img: getWikiImg("Theodore_Roosevelt.jpg") },
    { q: "第27代", a: "ウィリアム・ハワード・タフト", img: getWikiImg("William_Howard_Taft.jpg") },
    { q: "第28代", a: "ウッドロウ・ウィルソン", img: getWikiImg("Woodrow_Wilson.jpg") },
    { q: "第29代", a: "ウォレン・G・ハーディング", img: getWikiImg("Warren_G._Harding.jpg") },
    { q: "第30代", a: "カルビン・クーリッジ", img: getWikiImg("Calvin_Coolidge.jpg") },
    { q: "第31代", a: "ハーバート・フーヴァー", img: getWikiImg("Herbert_Hoover.jpg") },
    { q: "第32代", a: "フランクリン・D・ルーズベルト", img: getWikiImg("FDR_1944.jpg") },
    { q: "第33代", a: "ハリー・S・トルーマン", img: getWikiImg("Harry-truman.jpg") },
    { q: "第34代", a: "ドワイト・D・アイゼンハワー", img: getWikiImg("Dwight_D._Eisenhower.jpg") },
    { q: "第35代", a: "ジョン・F・ケネディ", img: getWikiImg("John_F._Kennedy.jpg") },
    { q: "第36代", a: "リンドン・B・ジョンソン", img: getWikiImg("Lyndon_B._Johnson.jpg") },
    { q: "第37代", a: "リチャード・ニクソン", img: getWikiImg("Richard_Nixon.jpg") },
    { q: "第38代", a: "ジェラルド・フォード", img: getWikiImg("Gerald_Ford.jpg") },
    { q: "第39代", a: "ジミー・カーター", img: getWikiImg("JimmyCarterPortrait.jpg") },
    { q: "第40代", a: "ロナルド・レーガン", img: getWikiImg("Official_Portrait_of_President_Reagan.jpg") },
    { q: "第41代", a: "ジョージ・H・W・ブッシュ", img: getWikiImg("George_H._W._Bush.jpg") },
    { q: "第42代", a: "ビル・クリントン", img: getWikiImg("Bill_Clinton.jpg") },
    { q: "第43代", a: "ジョージ・W・ブッシュ", img: getWikiImg("George-W-Bush.jpg") },
    { q: "第44代", a: "バラク・オバマ", img: getWikiImg("President_Barack_Obama.jpg") },
    { q: "第45代", a: "ドナルド・トランプ", img: getWikiImg("Donald_Trump_official_portrait.jpg") },
    { q: "第46代", a: "ジョー・バイデン", img: getWikiImg("Joe_Biden_presidential_portrait.jpg") },
    { q: "第47代", a: "ドナルド・トランプ", img: getWikiImg("Donald_Trump_official_portrait.jpg") }
];

let currentGenre = '';
let shuffledData = [];
let currentIndex = 0;
let isShowingAnswer = false;
let wrongList = [];

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

window.startQuiz = function(genre) {
    currentGenre = genre;
    const data = (genre === 'presidents') ? presidentData : flagData;
    shuffledData = [...data].sort(() => Math.random() - 0.5);
    currentIndex = 0;
    wrongList = [];
    switchScreen('quiz-screen');
    updateCard();
};

function updateCard() {
    isShowingAnswer = false;
    document.getElementById('check-btn').style.visibility = 'hidden';
    document.getElementById('card').classList.remove('is-flipped');
    
    const item = shuffledData[currentIndex];
    const fLabel = document.getElementById('front-label');
    const bLabel = document.getElementById('back-label');

    // 問題文の切り替え
    if (currentGenre === 'presidents') {
        fLabel.innerText = "この大統領の名前は？";
        bLabel.innerText = "正解の名前";
    } else {
        fLabel.innerText = "この州の州都は？";
        bLabel.innerText = "正解の州都";
    }

    document.getElementById('counter').innerText = `${currentIndex + 1} / ${shuffledData.length}`;
    document.getElementById('state-img').src = item.img;
    document.getElementById('question').innerText = item.q;
    document.getElementById('answer').innerText = item.a;
}

window.handleCardClick = function() {
    if (!isShowingAnswer) {
        document.getElementById('card').classList.add('is-flipped');
        isShowingAnswer = true;
        document.getElementById('check-btn').style.visibility = 'visible';
    } else {
        nextQuestion();
    }
};

window.markWrong = function(e) {
    e.stopPropagation();
    wrongList.push(shuffledData[currentIndex]);
    nextQuestion();
};

function nextQuestion() {
    currentIndex++;
    if (currentIndex < shuffledData.length) {
        updateCard();
    } else {
        showResult();
    }
}

function showResult() {
    switchScreen('result-screen');
    const score = shuffledData.length - wrongList.length;
    document.getElementById('result-stats').innerText = `${shuffledData.length}問中 ${score}問 正解！`;
    const list = document.getElementById('wrong-list');
    if (wrongList.length === 0) {
        list.innerHTML = "全問正解！素晴らしい！";
    } else {
        list.innerHTML = wrongList.map(item => `
            <div style="border-bottom:1px solid #eee; padding:10px 0;">
                <b style="color:#d32f2f;">${item.q}</b> → ${item.a}
            </div>
        `).join('');
    }
}

window.goHome = function() {
    switchScreen('menu-screen');
};
