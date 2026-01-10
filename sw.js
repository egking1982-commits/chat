const CACHE_NAME = 'moltaqa-2026-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  // أضف أي صور ثابتة هنا إذا كانت لديك
];

// تثبيت الخدمة وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل الخدمة وتنظيف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// استراتيجية الاستجابة: البحث في الكاش أولاً ثم الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
