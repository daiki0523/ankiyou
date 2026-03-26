// 🌟 バージョンを v6 に変更
const CACHE_NAME = 'anki-v32';
const urlsToCache = [
    './index.html',
    './style.css',
    './script.js',
    './data.js',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) return caches.delete(name);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    // 常に最新版をネットから取りに行き、圏外の時だけ保存データを使う
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
