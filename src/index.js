import './css/styles.css';
import Notiflix from 'notiflix';
import NewApiImages from './httpRequest';
import insertHtmlImg from './renderGallery.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { throttle, debounce } from 'lodash';

const form = document.querySelector('form#search-form');
const input = document.querySelector('input');
const ulGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('button.load-more');
const newApiImage = new NewApiImages();

// function fetchRequest() {
//   httpRequest(input.value, per_page, page)
//     .then(galleryItems => {
//       page += 1;
//       if (page > 1) {
//         loadMoreBtn.style.display = 'block';
//       }
//       if (galleryItems.totalHits <= 0) {
//         Notiflix.Notify.failure(
//           `Sorry, there are no images matching your search query. Please try again.`
//         );
//         loadMoreBtn.style.display = 'none';
//       }
//       const textHtml = insertHtmlImg(galleryItems);
//       ulGallery.insertAdjacentHTML('beforeend', textHtml);
//     })
//     .catch(error => {
//       if ((error.name = '404 Not found')) {
//         ulGallery.innerHTML = '';
//         Notiflix.Notify.failure('404 Not found');
//       } else {
//         console.log(error);
//       }
//     });
// }

let lightbox = new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  captionsData: 'alt',
});

function fetchRequest() {
  newApiImage.searchQuery = input.value;
  newApiImage.resetPage();
  newApiImage
    .fetchImages()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0 || newApiImage.searchQuery === '') {
        ulGallery.innerHTML = '';
        loadMoreBtn.style.display = 'none';
        throw new Error();
      } else {
        Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
        return hits;
      }
    })
    .then(hits => {
      ulGallery.innerHTML = '';
      const textHtml = insertHtmlImg(hits);
      ulGallery.insertAdjacentHTML('beforeend', textHtml);
      lightbox.refresh();
      if (hits.length < newApiImage.per_page) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'block';
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

const formSend = event => {
  event.preventDefault();
  if (input.value.trim() === '') {
    ulGallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
  } else {
    ulGallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    fetchRequest();
  }
  event.currentTarget.reset();
};
function onLoadMore() {
  onLoadMore.disabled = true;
  onLoadMore.textContent = 'Loading...';
  newApiImage
    .fetchImages()
    .then(({ hits, totalHits }) => {
      if (
        hits.length === 0 ||
        hits.length < newApiImage.per_page ||
        totalHits <= lightbox.elements.length + newApiImage.per_page
      ) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtn.style.display = 'none';
      }
      return hits;
    })
    .then(hits => {
      const textHtml = insertHtmlImg(hits);
      ulGallery.insertAdjacentHTML('beforeend', textHtml);
      smoothScroll();
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    });
}
const loadMoreBtnHandle = event => {
  onLoadMore();
};

function smoothScroll() {
  const { height: cardHeight } =
    ulGallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

form.addEventListener('submit', formSend);
loadMoreBtn.addEventListener('click', loadMoreBtnHandle);
// ulGallery.addEventListener('click', onClickOpenLightbox);
// window.addEventListener(
//   'scroll',
//   debounce(() => {
//     const documentRect = document.documentElement.getBoundingClientRect();
//     if (documentRect.bottom < document.documentElement.clientHeight + 150) {
//       onLoadMore();
//     }
//   }),
//   200
// );
