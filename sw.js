
const CACHE_NAME = "isimemo-v2";

const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json",

    "./bride.png",
    "./groom.png",

    "./icon-192.png",
    "./icon-512.png"
];

/* =========================
   INSTALL
========================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(FILES);

            })

    );

    self.skipWaiting();

});

/* =========================
   FETCH
========================= */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(cachedResponse => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);

            })

    );

});

/* =========================
   ACTIVATE
========================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys => {

                return Promise.all(

                    keys

                        .filter(
                            key => key !== CACHE_NAME
                        )

                        .map(
                            key => caches.delete(key)
                        )
                  )

                );

            })

    );

    self.clients.claim();

});
