// 画像取得のハイブリッド関数
function getWikiImg(fileName) {
    if (!fileName) return "";
    const name = fileName.trim().replace(/\s/g, '_');
    // Wikipediaの直接パス
    const wikiUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${name}?width=400`;
    // 予備のプロキシサーバー（画像が出ない問題を回避するためのリダイレクター）
    return wikiUrl;
}

const presidentData = [
    { q: "第1代", a: "ジョージ・ワシントン", img: "George_Washington.jpg" },
    { q: "第2代", a: "ジョン・アダムズ", img: "John_Adams_Official_Presidential_Portrait.jpg" }, // 修正済
    { q: "第3代", a: "トーマス・ジェファーソン", img: "Official_Presidential_Portrait_of_Thomas_Jefferson.jpg" }, // 修正済
    { q: "第4代", a: "ジェームズ・マディソン", img: "James_Madison.jpg" },
    { q: "第5代", a: "ジェームズ・モンロー", img: "James_Monroe_White_House_portrait_1819.jpg" },
    { q: "第6代", a: "ジョン・Q・アダムズ", img: "John_Quincy_Adams_National_Portrait_Gallery.jpg" }, // 修正済
    { q: "第7代", a: "アンドリュー・ジャクソン", img: "Andrew_jackson_head.jpg" },
    { q: "第8代", a: "マーティン・ヴァン・ビューレン", img: "Martin_Van_Buren.jpg" },
    { q: "第9代", a: "ウィリアム・H・ハリソン", img: "William_Henry_Harrison_daguerreotype_edit.jpg" },
    { q: "第10代", a: "ジョン_タイラー", img: "John_Tyler.jpg" },
    { q: "第11代", a: "ジェームズ_K_ポーク", img: "James_K._Polk_official_presidential_portrait.jpg" },
    { q: "第12代", a: "ザカリー_テイラー", img: "Zachary_Taylor.jpg" },
    { q: "第13代", a: "ミラード_フィルモア", img: "Millard_Fillmore.jpg" },
    { q: "第14代", a: "フランクリン_ピアース", img: "Franklin_Pierce.jpg" },
    { q: "第15代", a: "ジェームズ_ブキャナン", img: "James_Buchanan.jpg" },
    { q: "第16代", a: "エイブラハム_リンカーン", img: "Abraham_Lincoln_head_on_shoulders_photo_portrait.jpg" },
    { q: "第17代", a: "アンドリュー_ジョンソン", img: "Andrew_Johnson.jpg" },
    { q: "第18代", a: "ユリシーズ_S_グラント", img: "Ulysses_S_Grant_1870-1880.jpg" },
    { q: "第19代", a: "ラザフォード_B_ヘイズ", img: "RutherfordBHayes.png" },
    { q: "第20代", a: "ジェームズ・ガーフィールド", img: "James_Garfield_official_presidential_portrait.jpg" }, // 修正済
    { q: "第21代", a: "チェスター・A・アーサー", img: "Chester_Alan_Arthur.jpg" },
    { q: "第22代", a: "グロバー・クリーブランド", img: "Grover_Cleveland_-_NARA_-_518139.jpg" },
    { q: "第23代", a: "ベンジャミン・ハリソン", img: "Benjamin_Harrison.jpg" },
    { q: "第24代", a: "グロバー・クリーブランド", img: "Grover_Cleveland_-_NARA_-_518139.jpg" },
    { q: "第25代", a: "ウィリアム・マッキンリー", img: "William_McKinley_presidential_portrait.jpg" }, // 修正済
    { q: "第26代", a: "セオドア・ルーズベルト", img: "Theodore_Roosevelt_official_portrait.jpg" }, // 修正済
    { q: "第27代", a: "ウィリアム・H・タフト", img: "William_Howard_Taft.jpg" },
    { q: "第28代", a: "ウッドロウ・ウィルソン", img: "Woodrow_Wilson-Harris_&_Ewing.jpg" }, // 修正済
    { q: "第29代", a: "ウォレン・G・ハーディング", img: "Warren_G_Harding_portrait_as_President_-_Restored.jpg" }, // 修正済
    { q: "第30代", a: "カルビン・クーリッジ", img: "Calvin_Coolidge_official_presidential_portrait.jpg" }, // 修正済
    { q: "第31代", a: "ハーバート・フーヴァー", img: "Herbert_Hoover_official_presidential_portrait.jpg" }, // 修正済
    { q: "第32代", a: "F・ルーズベルト", img: "FDR_1944.jpg" }, // 修正済
    { q: "第33代", a: "ハリー_S_トルーマン", img: "Harry-truman.jpg" },
    { q: "第34代", a: "ドワイト・D・アイゼンハワー", img: "Dwight_D._Eisenhower_official_photograph.jpg" }, // 修正済
    { q: "第35代", a: "ジョン・F・ケネディ", img: "John_F._Kennedy_Official_Portrait.jpg" }, // 修正済
    { q: "第36代", a: "リンドン_B_ジョンソン", img: "Lyndon_B._Johnson.jpg" },
    { q: "第37代", a: "リチャード_ニクソン", img: "Richard_Nixon.jpg" },
    { q: "第38代", a: "ジェラルド_フォード", img: "Gerald_Ford.jpg" },
    { q: "第39代", a: "ジミー_カーター", img: "JimmyCarterPortrait.jpg" },
    { q: "第40代", a: "ロナルド_レーガン", img: "Official_Portrait_of_President_Reagan.jpg" },
    { q: "第41代", a: "ジョージ_H_W_ブッシュ", img: "George_H._W._Bush_presidential_portrait.jpg" },
    { q: "第42代", a: "ビル_クリントン", img: "Bill_Clinton.jpg" },
    { q: "第43代", a: "ジョージ・W・ブッシュ", img: "George-W-Bush.jpg" }, // 修正済
    { q: "第44代", a: "バラク_オバマ", img: "Official_portrait_of_Barack_Obama.jpg" },
    { q: "第45代", a: "ドナルド_トランプ", img: "Donald_Trump_official_portrait.jpg" },
    { q: "第46代", a: "ジョー_バイデン", img: "Joe_Biden_presidential_portrait.jpg" },
    { q: "第47代", a: "ドナルド_トランプ", img: "Donald_Trump_official_portrait.jpg" }
];

let currentGenre = '';
let shuffledData = [];
let currentIndex = 0;
let isShowingAnswer = false;
let wrongList = [];
let retryCount = 0;

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
    retryCount = 0;
    document.getElementById('check-btn').style.visibility = 'hidden';
    document.getElementById('retry-hint').style.display = 'none';
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');
    
    const item = shuffledData[currentIndex];
    const imgElement = document.getElementById('state-img');
    
    imgElement.style.opacity = "0";
    imgElement.src = getWikiImg(item.img);
    
    imgElement.onload = () => { 
        imgElement.style.opacity = "1"; 
        document.getElementById('retry-hint').style.display = 'none';
    };

    document.getElementById('front-label').innerText = (currentGenre === 'presidents') ? "この大統領の名前は？" : "この州の州都は？";
    document.getElementById('back-label').innerText = (currentGenre === 'presidents') ? "名前" : "州都";
    document.getElementById('counter').innerText = `${currentIndex + 1} / ${shuffledData.length}`;
    document.getElementById('question').innerText = item.q;
    document.getElementById('answer').innerText = item.a;
}

// 画像読み込み失敗時の自動再試行ロジック
window.handleImageError = function() {
    const imgElement = document.getElementById('state-img');
    if (retryCount < 3) {
        retryCount++;
        document.getElementById('retry-hint').style.display = 'block';
        setTimeout(() => {
            const item = shuffledData[currentIndex];
            imgElement.src = getWikiImg(item.img, retryCount);
        }, 1000); // 1秒待って再試行
    } else {
        document.getElementById('retry-hint').innerText = "画像を取得できませんでした";
    }
};

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
