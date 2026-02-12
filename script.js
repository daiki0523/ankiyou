// --- 1. 画像取得の設定（最もシンプルで確実な方法に変更） ---
function getWikiImg(fileName) {
    if (!fileName) return "";
    // スペースをアンダースコアに置換するだけで、余計なエンコードはしないのがWikipediaのコツです
    const name = fileName.trim().replace(/\s/g, '_');
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + name + "?width=400";
}

// --- 2. データ定義（ファイル名をさらに精査しました） ---
const flagData = [
    { q: "アイダホ州", a: "ボイシ", img: "Flag_of_Idaho.svg" },
    { q: "アイオワ州", a: "デモイン", img: "Flag_of_Iowa.svg" },
    { q: "アラバマ州", a: "モンゴメリー", img: "Flag_of_Alabama.svg" },
    { q: "アラスカ州", a: "ジュノー", img: "Flag_of_Alaska.svg" },
    { q: "アリゾナ州", a: "フェニックス", img: "Flag_of_Arizona.svg" },
    { q: "アーカンソー州", a: "リトルロック", img: "Flag_of_Arkansas.svg" },
    { q: "イリノイ州", a: "スプリングフィールド", img: "Flag_of_Illinois.svg" },
    { q: "インディアナ州", a: "インディアナポリス", img: "Flag_of_Indiana.svg" },
    { q: "ウィスコンシン州", a: "マディソン", img: "Flag_of_Wisconsin.svg" },
    { q: "ウェストバージニア州", a: "チャールストン", img: "Flag_of_West_Virginia.svg" },
    { q: "オハイオ州", a: "コロンバス", img: "Flag_of_Ohio.svg" },
    { q: "オレゴン州", a: "セイラム", img: "Flag_of_Oregon.svg" },
    { q: "オクラホマ州", a: "オクラホマシティ", img: "Flag_of_Oklahoma.svg" },
    { q: "カンザス州", a: "トピカ", img: "Flag_of_Kansas.svg" },
    { q: "カリフォルニア州", a: "サクラメント", img: "Flag_of_California.svg" },
    { q: "ケンタッキー州", a: "フランクフォート", img: "Flag_of_Kentucky.svg" },
    { q: "コネチカット州", a: "ハートフォード", img: "Flag_of_Connecticut.svg" },
    { q: "コロラド州", a: "デンバー", img: "Flag_of_Colorado.svg" },
    { q: "サウスカロライナ州", a: "コロンビア", img: "Flag_of_South_Carolina.svg" },
    { q: "サウスダコタ州", a: "ピア", img: "Flag_of_South_Dakota.svg" },
    { q: "ジョージア州", a: "アトランタ", img: "Flag_of_Georgia.svg" },
    { q: "テネシー州", a: "ナッシュビル", img: "Flag_of_Tennessee.svg" },
    { q: "テキサス州", a: "オースティン", img: "Flag_of_Texas.svg" },
    { q: "デラウェア州", a: "ドーバー", img: "Flag_of_Delaware.svg" },
    { q: "ニューメキシコ州", a: "サンタフェ", img: "Flag_of_New_Mexico.svg" },
    { q: "ニュージャージー州", a: "トレントン", img: "Flag_of_New_Jersey.svg" },
    { q: "ニューハンプシャー州", a: "コンコード", img: "Flag_of_New_Hampshire.svg" },
    { q: "ニューヨーク州", a: "オールバニ", img: "Flag_of_New_York.svg" },
    { q: "ネバダ州", a: "カーソンシティ", img: "Flag_of_Nevada.svg" },
    { q: "ネブラスカ州", a: "リンカーン", img: "Flag_of_Nebraska.svg" },
    { q: "ノースダコタ州", a: "ビスマーク", img: "Flag_of_North_Dakota.svg" },
    { q: "ノースカロライナ州", a: "ローリー", img: "Flag_of_North_Carolina.svg" },
    { q: "ハワイ州", a: "ホノルル", img: "Flag_of_Hawaii.svg" },
    { q: "バーモント州", a: "モントピリア", img: "Flag_of_Vermont.svg" },
    { q: "バージニア州", a: "リッチモンド", img: "Flag_of_Virginia.svg" },
    { q: "フロリダ州", a: "タラハシー", img: "Flag_of_Florida.svg" },
    { q: "ペンシルベニア州", a: "ハリスバーグ", img: "Flag_of_Pennsylvania.svg" },
    { q: "マサチューセッツ州", a: "ボストン", img: "Flag_of_Massachusetts.svg" },
    { q: "ミシガン州", a: "ランシング", img: "Flag_of_Michigan.svg" },
    { q: "ミネソタ州", a: "セントポール", img: "Flag_of_Minnesota.svg" },
    { q: "ミズーリ州", a: "ジェファーソンシティ", img: "Flag_of_Missouri.svg" },
    { q: "ミシシッピ州", a: "ジャクソン", img: "Flag_of_Mississippi.svg" },
    { q: "メイン州", a: "オーガスタ", img: "Flag_of_Maine.svg" },
    { q: "メリーランド州", a: "アナポリス", img: "Flag_of_Maryland.svg" },
    { q: "モンタナ州", a: "ヘレナ", img: "Flag_of_Montana.svg" },
    { q: "ユタ州", a: "ソルトレイクシティ", img: "Flag_of_Utah.svg" },
    { q: "ルイジアナ州", a: "バトンルージュ", img: "Flag_of_Louisiana.svg" },
    { q: "ロードアイランド州", a: "プロビデンス", img: "Flag_of_Rhode_Island.svg" },
    { q: "ワイオミング州", a: "シャイアン", img: "Flag_of_Wyoming.svg" },
    { q: "ワシントン州", a: "オリンピア", img: "Flag_of_Washington.svg" }
];

const presidentData = [
    { q: "第1代", a: "ジョージ・ワシントン", img: "George_Washington.jpg" },
    { q: "第2代", a: "ジョン・アダムズ", img: "John_Adams_Official_Presidential_Portrait.jpg" },
    { q: "第3代", a: "トーマス・ジェファーソン", img: "Official_Presidential_Portrait_of_Thomas_Jefferson.jpg" },
    { q: "第4代", a: "ジェームズ・マディソン", img: "James_Madison.jpg" },
    { q: "第5代", a: "ジェームズ・モンロー", img: "James_Monroe_White_House_portrait_1819.jpg" },
    { q: "第6代", a: "ジョン・クィンシー・アダムズ", img: "John_Quincy_Adams_National_Portrait_Gallery.jpg" },
    { q: "第7代", a: "アンドリュー・ジャクソン", img: "Andrew_jackson_head.jpg" },
    { q: "第8代", a: "マーティン・ヴァン・ビューレン", img: "Martin_Van_Buren.jpg" },
    { q: "第9代", a: "ウィリアム・H・ハリソン", img: "William_Henry_Harrison_daguerreotype_edit.jpg" },
    { q: "第10代", a: "ジョン・タイラー", img: "John_Tyler.jpg" },
    { q: "第11代", a: "ジェームズ・K・ポーク", img: "James_K._Polk_official_presidential_portrait.jpg" },
    { q: "第12代", a: "ザカリー・テイラー", img: "Zachary_Taylor.jpg" },
    { q: "第13代", a: "ミラード・フィルモア", img: "Millard_Fillmore.jpg" },
    { q: "第14代", a: "フランクリン・ピアース", img: "Franklin_Pierce.jpg" },
    { q: "第15代", a: "ジェームズ・ブキャナン", img: "James_Buchanan.jpg" },
    { q: "第16代", a: "エイブラハム・リンカーン", img: "Abraham_Lincoln_head_on_shoulders_photo_portrait.jpg" },
    { q: "第17代", a: "アンドリュー・ジョンソン", img: "Andrew_Johnson.jpg" },
    { q: "第18代", a: "ユリシーズ・S・グラント", img: "Ulysses_S_Grant_1870-1880.jpg" },
    { q: "第19代", a: "ラザフォード・B・ヘイズ", img: "RutherfordBHayes.png" },
    { q: "第20代", a: "ジェームズ・ガーフィールド", img: "James_Garfield_official_presidential_portrait.jpg" },
    { q: "第21代", a: "チェスター・A・アーサー", img: "Chester_Alan_Arthur.jpg" },
    { q: "第22代", a: "グロバー・クリーブランド", img: "Grover_Cleveland_-_NARA_-_518139.jpg" },
    { q: "第23代", a: "ベンジャミン・ハリソン", img: "Benjamin_Harrison.jpg" },
    { q: "第24代", a: "グロバー・クリーブランド", img: "Grover_Cleveland_-_NARA_-_518139.jpg" },
    { q: "第25代", a: "ウィリアム・マッキンリー", img: "William_McKinley_presidential_portrait.jpg" },
    { q: "第26代", a: "セオドア・ルーズベルト", img: "Theodore_Roosevelt_official_portrait.jpg" },
    { q: "第27代", a: "ウィリアム・ハワード・タフト", img: "William_Howard_Taft.jpg" },
    { q: "第28代", a: "ウッドロウ・ウィルソン", img: "Woodrow_Wilson-Harris_&_Ewing.jpg" },
    { q: "第29代", a: "Warren_G_Harding_portrait_as_President_-_Restored.jpg", a: "ウォレン・G・ハーディング", img: "Warren_G_Harding_portrait_as_President_-_Restored.jpg" },
    { q: "第30代", a: "カルビン・クーリッジ", img: "Calvin_Coolidge_official_presidential_portrait.jpg" },
    { q: "第31代", a: "ハーバート・フーヴァー", img: "Herbert_Hoover_official_presidential_portrait.jpg" },
    { q: "第32代", a: "フランクリン・D・ルーズベルト", img: "FDR_1944.jpg" },
    { q: "第33代", a: "ハリー・S・トルーマン", img: "Harry-truman.jpg" },
    { q: "第34代", a: "ドワイト・D・アイゼンハワー", img: "Dwight_D._Eisenhower_official_photograph.jpg" },
    { q: "第35代", a: "ジョン・F・ケネディ", img: "John_F._Kennedy_Official_Portrait.jpg" },
    { q: "第36代", a: "リンドン・B・ジョンソン", img: "Lyndon_B._Johnson.jpg" },
    { q: "第37代", a: "リチャード・ニクソン", img: "Richard_Nixon.jpg" },
    { q: "第38代", a: "ジェラルド・フォード", img: "Gerald_Ford.jpg" },
    { q: "第39代", a: "ジミー・カーター", img: "JimmyCarterPortrait.jpg" },
    { q: "第40代", a: "ロナルド・レーガン", img: "Official_Portrait_of_President_Reagan.jpg" },
    { q: "第41代", a: "ジョージ・H・W・ブッシュ", img: "George_H._W._Bush_presidential_portrait.jpg" },
    { q: "第42代", a: "ビル・クリントン", img: "Bill_Clinton.jpg" },
    { q: "第43代", a: "ジョージ・W・ブッシュ", img: "George-W-Bush.jpg" },
    { q: "第44代", a: "バラク・オバマ", img: "Official_portrait_of_Barack_Obama.jpg" },
    { q: "第45代", a: "ドナルド・トランプ", img: "Donald_Trump_official_portrait.jpg" },
    { q: "第46代", a: "ジョー・バイデン", img: "Joe_Biden_presidential_portrait.jpg" },
    { q: "第47代", a: "ドナルド・トランプ", img: "Donald_Trump_official_portrait.jpg" }
];

// --- 3. アプリのメインロジック ---
let currentGenre = '';
let shuffledData = [];
let currentIndex = 0;
let isShowingAnswer = false;
let wrongList = [];

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
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
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');
    
    const item = shuffledData[currentIndex];
    const imgElement = document.getElementById('state-img');
    
    // 画像URLを設定
    imgElement.src = getWikiImg(item.img);
    
    document.getElementById('front-label').innerText = (currentGenre === 'presidents') ? "この大統領の名前は？" : "この州の州都は？";
    document.getElementById('back-label').innerText = (currentGenre === 'presidents') ? "名前" : "州都";
    document.getElementById('counter').innerText = (currentIndex + 1) + " / " + shuffledData.length;
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
    document.getElementById('result-stats').innerText = shuffledData.length + "問中 " + score + "問 正解！";
    const list = document.getElementById('wrong-list');
    list.innerHTML = (wrongList.length === 0) ? "パーフェクト！" : 
        wrongList.map(item => '<div style="padding:10px; border-bottom:1px solid #ddd;"><b>' + item.q + '</b> → ' + item.a + '</div>').join('');
}

window.goHome = function() { switchScreen('menu-screen'); };
