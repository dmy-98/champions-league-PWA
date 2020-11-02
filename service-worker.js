const CACHE_NAME = "premier-league-v2";

let urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/team.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/api.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/savedTeams.js",
    "/js/script.js",
    "/js/standings.js",
    "/js/team.js",
    "/manifest.json",
    "/icon/notif.png",
    "/icon/android-icon-192x192-dunplab-manifest-24926.png",
    "/icon/apple-icon-57x57-dunplab-manifest-24926.png",
    "/icon/apple-icon-60x60-dunplab-manifest-24926.png",
    "/icon/apple-icon-72x72-dunplab-manifest-24926.png",
    "/icon/apple-icon-76x76-dunplab-manifest-24926.png",
    "/icon/apple-icon-114x114-dunplab-manifest-24926.png",
    "/icon/apple-icon-120x120-dunplab-manifest-24926.png",
    "/icon/apple-icon-144x144-dunplab-manifest-24926.png",
    "/icon/apple-icon-152x152-dunplab-manifest-24926.png",
    "/icon/apple-icon-180x180-dunplab-manifest-24926.png",
    "/icon/favicon-16x16-dunplab-manifest-24926.png",
    "/icon/favicon-32x32-dunplab-manifest-24926.png",
    "/icon/favicon-96x96-dunplab-manifest-24926.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];

self.addEventListener("install", function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    const base_url = "https://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'icon/notif.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});