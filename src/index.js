import './css/styles.css';
import Notiflix from 'notiflix';
import httpRequest from './httpRequest';
import insertHtmlImg from './renderGallery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { throttle, debounce } from 'lodash';

const form = document.querySelector('form#search-form');
const input = document.querySelector('input');
const ulGallery = document.querySelector('ul.gallery');
const loadMoreBtn = document.querySelector('button.load-more');

let page = 1;
let per_page = 40;
let isAlertVisible = false;
const totalPages = 1000 / per_page;

function fetchRequest() {
  httpRequest(input.value, per_page, page)
    .then(galleryItems => {
      page += 1;
      if (page > 1) {
        loadMoreBtn.style.display = 'block';
      }
      if (galleryItems.totalHits < page * per_page) {
        Notiflix.Notify.failure(
          `We're sorry, but you've reached the end of search results.${galleryItems.totalHits}`
        );
        loadMoreBtn.style.display = 'none';
      }
      const textHtml = insertHtmlImg(galleryItems);
      ulGallery.insertAdjacentHTML('beforeend', textHtml);
    })
    .catch(error => {
      if ((error.name = '404 Not found')) {
        ulGallery.innerHTML = '';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        console.log(error);
      }
    });
}

const formSend = event => {
  event.preventDefault();
  if (input.value.trim() === '') {
    page = 1;
    ulGallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
  } else {
    ulGallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    page = 1;
    fetchRequest();
  }
  event.currentTarget.reset();
};

const loadMoreBtnHandle = event => {
  if (page > totalPages) {
    return toggleAlertPopup();
  } else {
    fetchRequest();
  }
};
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});

form.addEventListener('submit', formSend);
loadMoreBtn.addEventListener('click', loadMoreBtnHandle);

window.addEventListener(
  'scroll',
  debounce(() => {
    const documentRect = document.documentElement.getBoundingClientRect();
    if (documentRect.bottom < document.documentElement.clientHeight + 150) {
      if (page > totalPages) {
        console.log(page);
        return toggleAlertPopup();
      }
      fetchRequest();
    }
  }),
  200
);
