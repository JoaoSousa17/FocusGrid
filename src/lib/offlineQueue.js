// Queue a mutation for background sync when offline.
// Usage: queueOfflineMutation({ url, method, headers, body })
export async function queueOfflineMutation({ url, method = "POST", headers = {}, body }) {
  const db = await openDB();
  const tx = db.transaction("queue", "readwrite");
  tx.objectStore("queue").add({ url, method, headers, body, queued_at: Date.now() });
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    const reg = await navigator.serviceWorker.ready;
    await reg.sync.register("fg-offline-queue").catch(() => {});
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("fg-sync-db", 1);
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore("queue", { keyPath: "id", autoIncrement: true });
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}
