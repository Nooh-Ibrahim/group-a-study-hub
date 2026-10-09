// اللينك القديم اتقفل: بيمسح اللي اتحفظ منه بس، ويشيل نفسه، ويحوّل الصفحات المفتوحة للينك الجديد.
// (التقدّم في localStorage مابيتلمسش، وهو أصلاً بيوصل للينك الجديد لأنه نفس الموقع.)
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) {
      const c = await caches.open(k);
      for (const req of await c.keys()) if (req.url.includes("/group-a-study-hub/")) await c.delete(req);
      if (!(await c.keys()).length) await caches.delete(k);
    }
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: "window" })) {
      client.navigate(client.url.replace("/group-a-study-hub/", "/mustadrak-study/"));
    }
  })());
});
