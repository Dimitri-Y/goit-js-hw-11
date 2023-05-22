export default function insertHtmlImg(galleryItems) {
  textHtml = galleryItems.hits
    .map(
      item => `
      <li class="photo-card">
      <div gallery__item>
            <a class="gallery__link" href=${item.largeImageURL}>
            <img class="gallery__image" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes:</b> ${item.likes}
              </p>
              <p class="info-item">
                <b>Views:</b> ${item.views}
              </p>
              <p class="info-item">
                <b>Comments:</b> ${item.comments}
              </p>
              <p class="info-item">
                <b>Downloads:</b> ${item.downloads}
              </p>
            </div>
            </a>            
          </div>
          </li>`
    )
    .join('\n');
  return textHtml;
}

// alt=${item.tags}
// const lightbox = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
