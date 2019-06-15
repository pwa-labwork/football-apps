const CACHE_NAME = "footballApps";
var urlsToCache = [
  "/",
  "/index.html",
  "/component/navigation.html",
  "/pages/klasemen.html",
  "/pages/team.html",
  "/pages/detail.html",
  "/pages/about.html",
  "/pages/contact-us.html",
  "/assets/css/materialize.min.css",
  "/assets/image/icon.png",
  "/assets/image/icon-72x72.png",
  "/assets/image/icon-96x96.png",
  "/assets/image/icon-128x128.png",
  "/assets/image/icon-144x144.png",
  "/assets/image/icon-152x152.png",
  "/assets/image/icon-192x192.png",
  "/assets/image/icon-384x384.png",
  "/assets/image/icon-512x512.png",
  "/assets/js/materialize.min.js",
  "/assets/js/component.js",
  "/assets/js/idb.js",
  "/manifest.json"
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

// Add Push Playload
self.addEventListener('push', function(event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: '/assets/image/icon-72x72.png',
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