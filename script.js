// Wikipediaの安定した画像URLを取得
function getWikiImg(fileName) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${fileName}?width=400`;
}

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
    { q: "ジョージア州", a: "アトランタ", img: "Flag_of_the_State_of_Georgia.svg" },
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

// Wikipediaから直接画像を取得するための関数
function getWikiImg(fileName) {
    // スペースをアンダースコアに変換し、URLエンコードを確実にする
    const cleanFileName = encodeURIComponent(fileName.replace(/ /g, '_'));
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${cleanFileName}?width=400`;
}

const presidentData = [
    { q: "第1代", a: "ジョージ・ワシントン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/250px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg" },
    { q: "第2代", a: "ジョン・アダムズ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Gilbert_Stuart%2C_John_Adams%2C_c._1800-1815%2C_NGA_42933.jpg/250px-Gilbert_Stuart%2C_John_Adams%2C_c._1800-1815%2C_NGA_42933.jpg" },
    { q: "第3代", a: "トーマス・ジェファーソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29.jpg/250px-Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29.jpg" },
    { q: "第4代", a: "ジェームズ・マディソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/James_Madison_by_Gilbert_Stuart_1804.jpeg/250px-James_Madison_by_Gilbert_Stuart_1804.jpeg" },
    { q: "第5代", a: "ジェームズ・モンロー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/James_Monroe_White_House_portrait_1819.jpg/250px-James_Monroe_White_House_portrait_1819.jpg" },
    { q: "第6代", a: "ジョン・クィンシー・アダムズ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/JQA_Photo_Crop_%28cropped%29.jpg/250px-JQA_Photo_Crop_%28cropped%29.jpg" },
    { q: "第7代", a: "アンドリュー・ジャクソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Andrew_jackson_head_%28cropped%29.jpg/250px-Andrew_jackson_head_%28cropped%29.jpg" },
    { q: "第8代", a: "マーティン・ヴァン・ビューレン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Martin_Van_Buren_by_Mathew_Brady_c1855-58.jpg/250px-Martin_Van_Buren_by_Mathew_Brady_c1855-58.jpg" },
    { q: "第9代", a: "ウィリアム・ヘンリー・ハリソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/William_Henry_Harrison_crop.jpg/250px-William_Henry_Harrison_crop.jpg" },
    { q: "第10代", a: "ジョン・タイラー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Tyler_Daguerreotype_%28restoration%29_%28cropped%29.jpg/250px-Tyler_Daguerreotype_%28restoration%29_%28cropped%29.jpg" },
    { q: "第11代", a: "ジェームズ・K・ポーク", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/James_Polk_restored_%28cropped%29_%282%29.jpg/250px-James_Polk_restored_%28cropped%29_%282%29.jpg" },
    { q: "第12代", a: "ザカリー_テイラー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Zachary_Taylor_restored_and_cropped_%283.5x4.5_cropped%29.jpg/250px-Zachary_Taylor_restored_and_cropped_%283.5x4.5_cropped%29.jpg" },
    { q: "第13代", a: "ミラード・フィルモア", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Millard_Fillmore_Better_Crop.jpg/250px-Millard_Fillmore_Better_Crop.jpg" },
    { q: "第14代", a: "フランクリン・ピアース", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mathew_Brady_-_Franklin_Pierce_-_alternate_crop_%28cropped%29%282%29.jpg/250px-Mathew_Brady_-_Franklin_Pierce_-_alternate_crop_%28cropped%29%282%29.jpg" },
    { q: "第15代", a: "ジェームズ・ブキャナン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/James_Buchanan.jpg/250px-James_Buchanan.jpg" },
    { q: "第16代", a: "エイブラハム・リンカーン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Abraham_Lincoln_1863_Portrait_%283x4_cropped%29.jpg/250px-Abraham_Lincoln_1863_Portrait_%283x4_cropped%29.jpg" },
    { q: "第17代", a: "アンドリュー・ジョンソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Andrew_Johnson_photo_portrait_head_and_shoulders%2C_c1870-1880-Edit1.jpg/250px-Andrew_Johnson_photo_portrait_head_and_shoulders%2C_c1870-1880-Edit1.jpg" },
    { q: "第18代", a: "ユリシーズ・S・グラント", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ulysses_S._Grant_1870-1880.jpg/250px-Ulysses_S._Grant_1870-1880.jpg" },
    { q: "第19代", a: "ラザフォード・B・ヘイズ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/President_Rutherford_Hayes_1870_-_1880_Restored.jpg/250px-President_Rutherford_Hayes_1870_-_1880_Restored.jpg" },
    { q: "第20代", a: "ジェームズ・ガーフィールド", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/James_Abram_Garfield%2C_photo_portrait_seated.jpg/250px-James_Abram_Garfield%2C_photo_portrait_seated.jpg" },
    { q: "第21代", a: "チェスター・A・アーサー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Chester_A._Arthur_by_Abraham_Bogardus_-_black_%26_white.jpg/250px-Chester_A._Arthur_by_Abraham_Bogardus_-_black_%26_white.jpg" },
    { q: "第22代", a: "グロバー・クリーブランド", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Grover_Cleveland_-_NARA_-_518139_%28cropped%29.jpg/250px-Grover_Cleveland_-_NARA_-_518139_%28cropped%29.jpg" },
    { q: "第23代", a: "ベンジャミン・ハリソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pach_Brothers_-_Benjamin_Harrison_%28cropped%29_%28cropped%29.jpg/250px-Pach_Brothers_-_Benjamin_Harrison_%28cropped%29_%28cropped%29.jpg" },
    { q: "第24代", a: "グロバー・クリーブランド", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Grover_Cleveland_-_NARA_-_518139_%28cropped%29.jpg/250px-Grover_Cleveland_-_NARA_-_518139_%28cropped%29.jpg" },
    { q: "第25代", a: "ウィリアム・マッキンリー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mckinley.jpg/250px-Mckinley.jpg" },
    { q: "第26代", a: "セオドア・ルーズベルト", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Theodore_Roosevelt_by_the_Pach_Bros_%28cropped_3x4%29.jpg/250px-Theodore_Roosevelt_by_the_Pach_Bros_%28cropped_3x4%29.jpg" },
    { q: "第27代", a: "ウィリアム・ハワード・タフト", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cabinet_card_of_William_Howard_Taft_by_Pach_Brothers_-_Cropped_to_image.jpg/250px-Cabinet_card_of_William_Howard_Taft_by_Pach_Brothers_-_Cropped_to_image.jpg" },
    { q: "第28代", a: "ウッドロウ・ウィルソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/President_Woodrow_Wilson_Harris_%26_Ewing_%283x4_cropped_b%29.jpg/250px-President_Woodrow_Wilson_Harris_%26_Ewing_%283x4_cropped_b%29.jpg" },
    { q: "第29代", a: "ウォレン・G・ハーディング", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Warren_G_Harding-Harris_%26_Ewing.jpg/250px-Warren_G_Harding-Harris_%26_Ewing.jpg" },
    { q: "第30代", a: "カルビン・クーリッジ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/President_Calvin_Coolidge%2C_1924_portrait_photograph_%283x4_cropped%29.jpeg/250px-President_Calvin_Coolidge%2C_1924_portrait_photograph_%283x4_cropped%29.jpeg" },
    { q: "第31代", a: "ハーバート・フーヴァー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/President_Hoover_portrait.jpg/250px-President_Hoover_portrait.jpg" },
    { q: "第32代", a: "フランクリン・D・ルーズベルト", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/FDR-1944-Campaign-Portrait_%28retouched%2C_cropped%29_%281%29.jpg/250px-FDR-1944-Campaign-Portrait_%28retouched%2C_cropped%29_%281%29.jpg" },
    { q: "第33代", a: "ハリー・S・トルーマン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/TRUMAN_58-766-06_%28cropped%29.jpg/250px-TRUMAN_58-766-06_%28cropped%29.jpg" },
    { q: "第34代", a: "ドワイト・D・アイゼンハワー", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959_%28cropped%29%283%29.jpg/250px-Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959_%28cropped%29%283%29.jpg" },
    { q: "第35代", a: "ジョン・F・ケネディ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg/250px-John_F._Kennedy%2C_White_House_color_photo_portrait.jpg" },
    { q: "第36代", a: "リンドン・B・ジョンソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/37_Lyndon_Johnson_3x4.jpg/250px-37_Lyndon_Johnson_3x4.jpg" },
    { q: "第37代", a: "リチャード・ニクソン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Richard_Nixon_presidential_portrait_%281%29.jpg/250px-Richard_Nixon_presidential_portrait_%281%29.jpg" },
    { q: "第38代", a: "ジェラルド・フォード", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gerald_Ford_presidential_portrait_%28cropped%29.jpg/250px-Gerald_Ford_presidential_portrait_%28cropped%29.jpg" },
    { q: "第39代", a: "ジミー・カーター", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/JimmyCarterPortrait2.jpg/250px-JimmyCarterPortrait2.jpg" },
    { q: "第40代", a: "ロナルド・レーガン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Portrait_of_President_Reagan_1981.jpg/250px-Official_Portrait_of_President_Reagan_1981.jpg" },
    { q: "第41代", a: "ジョージ・H・W・ブッシュ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/George_H._W._Bush_presidential_portrait_%28cropped%29.jpg/250px-George_H._W._Bush_presidential_portrait_%28cropped%29.jpg" },
    { q: "第42代", a: "ビル・クリントン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bill_Clinton.jpg/250px-Bill_Clinton.jpg" },
    { q: "第43代", a: "ジョージ・W・ブッシュ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/George-W-Bush.jpeg/250px-George-W-Bush.jpeg" },
    { q: "第44代", a: "バラク・オバマ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/250px-President_Barack_Obama.jpg" },
    { q: "第45代", a: "ドナルド・トランプ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/250px-Donald_Trump_official_portrait.jpg" },
    { q: "第46代", a: "ジョー・バイデン", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/250px-Joe_Biden_presidential_portrait.jpg" },
    { q: "第47代", a: "ドナルド・トランプ", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg/250px-Official_Presidential_Portrait_of_President_Donald_J._Trump_%282025%29.jpg" }
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
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');
    
    const item = shuffledData[currentIndex];
    const imgElement = document.getElementById('state-img');
    
    imgElement.style.opacity = "0";
    imgElement.src = getWikiImg(item.img);
    imgElement.onload = () => { 
        imgElement.style.opacity = "1"; 
    };

    document.getElementById('front-label').innerText = (currentGenre === 'presidents') ? "この大統領の名前は？" : "この州の州都は？";
    document.getElementById('back-label').innerText = (currentGenre === 'presidents') ? "名前" : "州都";
    document.getElementById('counter').innerText = `${currentIndex + 1} / ${shuffledData.length}`;
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
    list.innerHTML = (wrongList.length === 0) ? "パーフェクト！" : 
        wrongList.map(item => `<div style="padding:10px; border-bottom:1px solid #ddd;"><b>${item.q}</b> → ${item.a}</div>`).join('');
}

window.goHome = function() { switchScreen('menu-screen'); };
