var cacheName = 'v11.4.5';
var cacheFiles = [
    './manifest.json',
    './sw.js',
    './index.html',
    './icon.png',
    './scripts.js',
    './css/nv.d3.min.css',
    './css/style.css',
    './js/pptxjs.js',
    './js/nv.d3.min.js',
    './js/jszip.min.js',
    './js/jquery-1.11.3.min.js',
    './js/filereader.js',
    './js/divs2slides.min.js',
    './js/d3.min.js',
	'../office.cfg',
];
// 监听 install 事件，安装完成后，进行文件缓存
self.addEventListener('install', function (e) {
    console.log('Service Worker Status: install');
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        // 把要缓存的 cacheFiles 列表传入
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});
// 监听 fetch 事件，安装完成后，进行文件缓存
self.addEventListener('fetch', function (e) {
    console.log('Service Worker Status: fetch');
    var cacheMatchPromise = caches.match(e.request).then(function (cache) {
            // 如果有cache则直接返回，否则通过fetch请求
            return cache || fetch(e.request);
        }).catch(function (err) {
            console.log(err);
            return fetch(e.request);
        })
    e.respondWith(cacheMatchPromise);
});
// 监听 activate 事件，清除缓存
self.addEventListener('activate', function (e) {
    console.log('Service Worker Status:  activate');
    var cachePromise = caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        }));
    })
    e.waitUntil(cachePromise);
    return self.clients.claim();
});