/* Service worker: app instalável, abre offline com a última versão e recebe notificações */
const CACHE = 'mat-academy-v2';
const SHELL = ['/', '/index.html', '/vendor/supabase.js', '/manifest.webmanifest', '/icons/icon-192.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  // rede primeiro (sempre a versão nova); se estiver sem internet, usa a cópia guardada
  e.respondWith(fetch(e.request).then((r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then((x) => x.put(e.request, c)); } return r; })
    .catch(() => caches.match(e.request).then((m) => m || caches.match('/index.html'))));
});
self.addEventListener('push', (e) => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { titulo: 'Matemática Academy', texto: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.titulo || 'Matemática Academy', {
    body: d.texto || '', icon: '/icons/icon-192.png', badge: '/icons/icon-192.png', data: { link: d.link || '#/' }, tag: d.tag || undefined
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = '/' + (e.notification.data && e.notification.data.link ? e.notification.data.link : '');
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ws) => {
    for (const w of ws) { if ('focus' in w) { w.navigate(url).catch(() => {}); return w.focus(); } }
    return self.clients.openWindow(url);
  }));
});
