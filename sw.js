const CACHE_NAME = 'moltaqa-v1';
const ASSETS = [
  './',
  './index.html', // تأكد أن ملف الكود الأساسي اسمه index.html
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// استراتيجية التشغيل: الإنترنت أولاً ثم التخزين المؤقت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
