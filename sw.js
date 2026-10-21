const CACHE_NAME='manga-note-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==location.origin)return;event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok&&req.mode==='navigate'){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put('./',copy));}return res;}).catch(()=>caches.match('./'))));});
