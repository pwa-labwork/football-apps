importScripts('/workbox-sw.js');

const CACHE_NAME = "footballApps";
var urlsToCache = [
  {url: "/", revision: "1"},
  {url: "/index.html", revision: "1"},
  {url: "/component/navigation.html", revision: "1"},
  {url: "/pages/klasemen.html", revision: "1"},
  {url: "/pages/team.html", revision: "1"},
  {url: "/pages/detail.html", revision: "1"},
  {url: "/pages/about.html", revision: "1"},
  {url: "/pages/contact-us.html", revision: "1"},
  {url: "/assets/css/materialize.min.css", revision: "1"},
  {url: "/assets/image/icon.png", revision: "1"},
  {url: "/assets/image/icon-72x72.png", revision: "1"},
  {url: "/assets/image/icon-96x96.png", revision: "1"},
  {url: "/assets/image/icon-128x128.png", revision: "1"},
  {url: "/assets/image/icon-144x144.png", revision: "1"},
  {url: "/assets/image/icon-152x152.png", revision: "1"},
  {url: "/assets/image/icon-192x192.png", revision: "1"},
  {url: "/assets/image/icon-384x384.png", revision: "1"},
  {url: "/assets/image/icon-512x512.png", revision: "1"},
  {url: "/assets/js/materialize.min.js", revision: "1"},
  {url: "/assets/js/component.js", revision: "1"},
  {url: "/assets/js/idb.js", revision: "1"},
  {url: "/manifest.json", revision: "1"},
  {url: "/workbox-sw.js", revision: "1"}
];

workbox.precaching.precacheAndRoute(urlsToCache);

// self.addEventListener('install', function(event){
// 	event.waitUntil(
// 		caches.open(CACHE_NAME)
// 		.then(function(cache) {
// 			return cache.addAll(urlsToCache);
// 		})
// 	);
// })

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

// INI UNTUK MELOAD SELURUH ISI DIRECTORY UTAMA (/)
workbox.routing.registerRoute(
	new RegExp('/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: CACHE_NAME
	})
);

// INI UNTUK MELOAD END POINT API
workbox.routing.registerRoute(
	new RegExp('https:\/\/www.thesportsdb.com\/api\/v1\/json\/1\/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: CACHE_NAME
	})
);

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