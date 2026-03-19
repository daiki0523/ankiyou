// 🌟 バージョンを v2 に変更（これでスマホが「新しいのが出た！」と気づきます）
const CACHE_NAME = 'anki-app-cache-v2';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './data.js',
    './manifest.json'
];

// インストール時にファイルを保存
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
    // すぐに新しいバージョンを適用する
    self.skipWaiting(); 
});

// 古いバージョンの記憶（ドアのアイコンなど）を完全に消去する機能
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 🌟 通信できる時は「常に最新版」を取得し、圏外の時だけ「保存データ」を使う
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});
