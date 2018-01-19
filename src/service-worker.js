// TODO: add urls for assets
const CACHE_NAME = 'cache-v1';  
const urlsToCache = [  
  '/',
  '/styles.bundle.js',
//   '/js/main.bundle.js',
//   '/img/**/*.img',
];

self.addEventListener('install', event => {  
  caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(urlsToCache);
    });
});