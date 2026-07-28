// Service Worker: notificações Web Push + cache offline + Background Sync

const CACHE_NAME = "focusgrid-v3";
const ASSET_EXTS = [".js", ".css", ".woff2", ".woff", ".ttf", ".png", ".svg", ".ico", ".webp"];
const SYNC_QUEUE = "fg-offline-queue";

// ---------- Install: pre-cache shell ----------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(["/", "/index.html", "/logo.png", "/icon-192.png", "/icon-512.png"]).catch(() => {})
    ).then(() => self.skipWaiting())
  );
});

// ---------- Activate: purge old caches ----------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ---------- Fetch: cache strategies ----------
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin or CDN assets GET requests
  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin && !url.hostname.includes("supabase")) return;

  const isAsset = ASSET_EXTS.some((ext) => url.pathname.endsWith(ext));
  const isHtml = url.pathname === "/" || url.pathname.endsWith(".html");
  const isAPI = url.hostname.includes("supabase") || url.pathname.startsWith("/rest/") || url.pathname.startsWith("/auth/");

  if (isAPI) {
    // Network-first for API: use cache only when offline
    event.respondWith(
      fetch(request).catch(async () => {
        const cached = await caches.match(request);
        return cached ?? new Response(JSON.stringify({ error: "offline" }), {
          status: 503,
          headers: { "Content-Type": "application/json" }
        });
      })
    );
    return;
  }

  if (isAsset) {
    // Cache-first for static assets
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  if (isHtml) {
    // Network-first for HTML; fall back to cached shell
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return res;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }
});

// ---------- Background Sync ----------
self.addEventListener("sync", (event) => {
  if (event.tag === SYNC_QUEUE) {
    event.waitUntil(flushOfflineQueue());
  }
});

async function flushOfflineQueue() {
  const db = await openQueueDB();
  const tx = db.transaction("queue", "readwrite");
  const store = tx.objectStore("queue");
  const items = await storeGetAll(store);
  for (const item of items) {
    try {
      const res = await fetch(item.url, {
        method: item.method,
        headers: item.headers,
        body: item.body,
      });
      if (res.ok) await storeDel(store, item.id);
    } catch {
      // stay in queue, will retry on next sync
    }
  }
  await tx.done?.catch(() => {});
}

function openQueueDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("fg-sync-db", 1);
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore("queue", { keyPath: "id", autoIncrement: true });
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

function storeGetAll(store) {
  return new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

function storeDel(store, id) {
  return new Promise((resolve, reject) => {
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

// ---------- Push notifications ----------
self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data?.json() ?? {};
  } catch {
    payload = { title: "FocusGrid", body: event.data?.text() ?? "" };
  }

  const { title = "FocusGrid", body = "", tag, data = {} } = payload;
  const isPomodoro = data.kind === "pomodoro";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data,
      actions: isPomodoro
        ? [{ action: "pause", title: "Pausar" }, { action: "skip", title: "Saltar fase" }]
        : [],
      requireInteraction: isPomodoro,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const action = event.action;
  const targetPath = "/focus" + (action ? `?pomodoro_action=${action}` : "");

  event.waitUntil(
    (async () => {
      const clientsList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      const existing = clientsList.find((c) => c.url.includes(self.location.origin));

      if (existing) {
        if (action) existing.postMessage({ type: "pomodoro_action", action });
        existing.navigate(self.location.origin + "/focus");
        return existing.focus();
      }
      return self.clients.openWindow(self.location.origin + targetPath);
    })()
  );
});
