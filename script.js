// 画像URL生成関数（安定性を極限まで高めた新ロジック）
function getWikiImg(fileName) {
    if (!fileName) return "";
    const name = fileName.trim().replace(/\s/g, '_');
    // Wikipediaの「Special:FilePath」は、最新のブラウザで最も安定して画像を表示できるルートです。
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${name}?width=400`;
}

const presidentData = [
    { q: "第1代", a: "ジョージ・ワシントン", img: "George_Washington.jpg" },
    { q: "第2代", a: "ジョン・アダムズ", img: "John_Adams_Official_Presidential_Portrait.jpg" }, // 修正：フルネーム
    { q: "第3代", a: "トーマス・ジェファーソン", img: "Official_Presidential_Portrait_of_Thomas_Jefferson.jpg" }, // 修正：Official版
    { q: "第4代", a: "ジェームズ・マディソン", img: "James_Madison.jpg" },
    { q: "第5代", a: "ジェームズ・モンロー", img: "James_Monroe_White_House_portrait_1819.jpg" },
    { q: "第6代", a: "ジョン・Q・アダムズ", img: "John_Quincy_Adams_National_Portrait_Gallery.jpg" }, // 修正：Q入り
    { q: "第7代", a: "アンドリュー・ジャクソン", img: "Andrew_jackson_head.jpg" },
    { q: "第8代", a: "マーティン・ヴァン・ビューレン", img: "Martin_Van_Buren.jpg" },
    { q: "第9代", a: "ウィリアム・H・ハリソン", img: "William_Henry_Harrison_daguerreotype_edit.jpg" },
    { q: "第10代", a: "ジョン・タイラー", img: "John_Tyler.jpg" },
    { q: "第11代", a: "ジェームズ・K・ポーク", img: "James_K._Polk_official_presidential_portrait.jpg" }, // 修正：ドット位置
    { q: "第12代", a: "ザカリー・テイラー", img: "Zachary_Taylor.jpg" },
    { q: "第13代", a: "ミラード・フィルモア", img: "Millard_Fillmore.jpg" },
    { q: "第14代", a: "フランクリン・ピアース", img: "Franklin_Pierce.jpg" },
    { q: "第15代", a: "ジェームズ・ブキャナン", img: "James_Buchanan.jpg" },
    { q: "第16代", a: "エイブラハム・リンカーン", img: "Abraham_Lincoln_head_on_shoulders_photo_portrait.jpg" },
    { q: "第17代", a: "アンドリュー・ジョンソン", img: "Andrew_Johnson.jpg" },
    { q: "第18代", a: "ユリシーズ・S・グラント", img: "Ulysses_S_Grant_1870-1880.jpg" }, // 修正：18代
    { q: "第19代", a: "ラザフォード・B・ヘイズ", img: "RutherfordBHayes.png" },
    { q: "第20代", a: "ジェームズ・ガーフィールド", img: "James_Garfield_official_presidential_portrait.jpg" }, // 修正：20代
    { q: "第21代", a: "チェスター・A・アーサー", img: "Chester_Alan_Arthur.jpg" },
    { q: "第22代", a: "グロバー・クリーブランド", img: "Grover_Cleveland_-_NARA_-_518139.jpg" },
    { q: "第23代", a: "ベンジャミン・ハリソン", img: "Benjamin_Harrison.jpg" },
    { q: "第24代", a: "グロバー・クリーブランド", img: "Grover_Cleveland_-_NARA_-_518139.jpg" },
    { q: "第25代", a: "ウィリアム・マッキンリー", img: "William_McKinley_presidential_portrait.jpg" }, // 修正：25代
    { q: "第26代", a: "セオドア・ルーズベルト", img: "Theodore_Roosevelt_official_portrait.jpg" }, // 修正：26代
    { q: "第27代", a: "ウィリアム・H・タフト", img: "William_Howard_Taft.jpg" },
    { q: "第28代", a: "ウッドロウ・ウィルソン", img: "Woodrow_Wilson-Harris_&_Ewing.jpg" }, // 修正：28代
    { q: "第29代", a: "ウォレン・G・ハーディング", img: "Warren_G_Harding_portrait_as_President_-_Restored.jpg" }, // 修正：29代
    { q: "第30代", a: "カルビン・クーリッジ", img: "Calvin_Coolidge_official_presidential_portrait.jpg" }, // 修正：30代
    { q: "第31代", a: "ハーバート・フーヴァー", img: "Herbert_Hoover_official_presidential_portrait.jpg" }, // 修正：31代
    { q: "第32代", a: "F・ルーズベルト", img: "FDR_1944.jpg" }, // 修正：32代（最も安定したファイル名）
    { q: "第33代", a: "ハリー・S・トルーマン", img: "Harry-truman.jpg" },
    { q: "第34代", a: "ドワイト・D・アイゼンハワー", img: "Dwight_D._Eisenhower_official_photograph.jpg" }, // 修正：34代
    { q: "第35代", a: "ジョン・F・ケネディ", img: "John_F._Kennedy_Official_Portrait.jpg" }, // 修正：35代
    { q: "第36代", a: "リンドン・B・ジョンソン", img: "Lyndon_B._Johnson.jpg" },
    { q: "第37代", a: "リチャード・ニクソン", img: "Richard_Nixon.jpg" },
    { q: "第38代", a: "ジェラルド・フォード", img: "Gerald_Ford.jpg" },
    { q: "第39代", a: "ジミー・カーター", img: "JimmyCarterPortrait.jpg" },
    { q: "第40代", a: "ロナルド・レーガン", img: "Official_Portrait_of_President_Reagan.jpg" },
    { q: "第41代", a: "ジョージ・H・W・ブッシュ", img: "George_H._W._Bush_presidential_portrait.jpg" },
    { q: "第42代", a: "ビル・クリントン", img: "Bill_Clinton.jpg" },
    { q: "第43代", a: "ジョージ・W・ブッシュ", img: "George-W-Bush.jpg" }, // 修正：43代（ハイフン版）
    { q: "第44代", a: "バラク・オバマ", img: "Official_portrait_of_Barack_Obama.jpg" },
    { q: "第45代", a: "ドナルド・トランプ", img: "Donald_Trump_official_portrait.jpg" },
    { q: "第46代", a: "ジョー・バイデン", img: "Joe_Biden_presidential_portrait.jpg" },
    { q: "第47代", a: "ドナルド・トランプ", img: "Donald_Trump_official_portrait.jpg" }
];

// ... (以下、startQuizなどのプログラムロジックは以前のままで動作します)
