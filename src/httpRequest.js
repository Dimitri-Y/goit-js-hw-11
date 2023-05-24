import Notiflix from 'notiflix';
import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const key = '36658158-346947d8111be045c507b32da';

export default class NewApiImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }
  async fetchImages() {
    const paramSearch = new URLSearchParams({
      key: key,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    });
    const response = await axios.get(`${URL}?${paramSearch}`);
    this.incrementPage();
    return response.data;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
// export default async function httpRequest(name, limit, page) {
//   const params = new URLSearchParams({
//     per_page: limit,
//     _page: page,
//   });
//   const response = await fetch(
//     `https://pixabay.com/api/?key=36658158-346947d8111be045c507b32da&q=${name}&image_type=photo&orientation=horizontal&safesearch=true?fields=webformatURL,largeImageURL,tags,likes,views,comments,
//     downloads&posts?${params}`
//   );
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return await response.json();
// }
// https://pixabay.com/api/?key=36658158-346947d8111be045c507b32da&q=yellow+flowers&image_type=photo
// https://pixabay.com/api//${name}?fields=name,capital,population,flags,languages
