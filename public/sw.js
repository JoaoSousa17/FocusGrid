// Service Worker: notificações Web Push + ações do Pomodoro.
// Não faz cache de assets (isso fica para uma camada de Workbox no futuro);
// o único trabalho aqui é mostrar notificações e reagir a cliques nelas.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

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
      actions: isPomodoro ?
      [
      { action: "pause", title: "Pausar" },
      { action: "skip", title: "Saltar fase" }] :

      [],
      requireInteraction: isPomodoro
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const action = event.action; // "" quando se clica no corpo da notificação
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
