import { createCache } from 'react-cache';

export let cache: any;
function initCache() {
  console.log('create cache');
  cache = createCache(initCache);
}
initCache();
