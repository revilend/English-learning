/* ==========================================================================
   English Zero-to-Hero — Service Worker
   Strategiya: TARMOQ BIRINCHI (network-first). Ya'ni sayt har doim yangi
   fayllarni oladi (eski kesh ko'rinmaydi), internet bo'lmasa — oxirgi
   ishlagan nusxa keshdan beriladi. Shu bilan sayt "ilova" sifatida
   o'rnatiladi va oflayn ham ochiladi.
   ========================================================================== */
var CACHE = 'ezh-v1';

self.addEventListener('install', function () {
  self.skipWaiting(); /* yangi versiya darhol kuchga kiradi */
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  /* faqat o'z saytimiz fayllari (Google AI, shriftlar va h.k. — to'g'ridan-to'g'ri) */
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.status === 200 && res.type === 'basic') {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        return hit || caches.match('./index.html');
      });
    })
  );
});
