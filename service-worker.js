const cacheName = 'cache-v1';
const precacheResources = [

    '/index.html',
    'styles/main.css',
    '/images/touch/netelek-logo-orange.png',
    '/images/coverphoto.png'

];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(precacheResources);
        }).catch(err => {
            console.log('😥 Service worker installation failed: ', err);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});