import Notiflix from 'notiflix';

export default async function httpRequest(name, limit, page) {
  const params = new URLSearchParams({
    per_page: limit,
    _page: page,
  });
  const response = await fetch(
    `https://pixabay.com/api/?key=36658158-346947d8111be045c507b32da&q=${name}&image_type=photo&orientation=horizontal&safesearch=true?fields=webformatURL,largeImageURL,tags,likes,views,comments, 
    downloads&posts?${params}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}
// https://pixabay.com/api/?key=36658158-346947d8111be045c507b32da&q=yellow+flowers&image_type=photo
// https://pixabay.com/api//${name}?fields=name,capital,population,flags,languages
