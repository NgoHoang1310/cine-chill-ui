import { useStore } from "../store/index";

function getImageUrl(url, size = 3, type) {
  const store = useStore();
  const config = store.shared;

  // if (!config) return null;
  // if (type === 'backdrop') {
  return 'http://image.tmdb.org/t/p/w780' + url;
  // } else {
  //   return config.images.base_url + config.images.poster_sizes[size] + url;
  // }
}

export default getImageUrl;
