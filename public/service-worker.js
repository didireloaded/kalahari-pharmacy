const CACHE="kalahari-public-contact-v1";
const PUBLIC_PAGES=["/contact","/visit"];
const PUBLIC_FILES=["/manifest.webmanifest","/kalahari-icon.svg"];
const FALLBACK='<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kalahari Pharmacy contact (offline)</title><body style="font:16px/1.6 system-ui,sans-serif;background:#e9f2f7;color:#172534;padding:2rem"><h1>Kalahari Pharmacy</h1><p>You are offline. The saved contact information below may be out of date. Please confirm details when you reconnect.</p><p>Gustav Voigts Centre, Independence Avenue, Windhoek, Namibia.</p><p><a href="tel:+26461252448">Call +264 61 252 448</a></p><p>Opening hours have not been confirmed on this site.</p></body></html>';
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(async cache=>{
    await Promise.allSettled([...PUBLIC_PAGES,...PUBLIC_FILES].map(path=>cache.add(path)));
  }).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("kalahari-public-contact-")&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  if(req.mode==="navigate"&&PUBLIC_PAGES.includes(url.pathname)){
    event.respondWith(fetch(req).then(res=>{
      if(res.ok){const copy=res.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));}
      return res;
    }).catch(async()=>await caches.match(req)||new Response(FALLBACK,{headers:{"Content-Type":"text/html; charset=utf-8"}})));
    return;
  }
  if(req.destination==="script"||req.destination==="style"||req.destination==="font"||req.destination==="image"){
    event.respondWith(fetch(req).then(res=>{
      if(res.ok&&url.pathname.startsWith("/assets/")){const copy=res.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)));}
      return res;
    }).catch(async()=>await caches.match(req)||Response.error()));
  }
});
