// 오프라인 지원: 새 버전이 올라오면 자동으로 교체
const CACHE='ssah-11212026';
const FILES=['./','vocab','listening','reading','manifest.webmanifest','icon.svg','voice.js','common.js','privacy'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
// 네트워크 먼저, 끊기면 저장본 사용 (전철 터널 대비)
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))))});
