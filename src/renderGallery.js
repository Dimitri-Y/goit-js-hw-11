export default function insertHtmlImg(hits) {
  textHtml = hits
    .map(
      item => `
      <a class="gallery__item" href=${item.largeImageURL}>
      <div class="photo-card">
            <img  src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
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
          </div>
          </a>            
          `
    )
    .join('\n');
  return textHtml;
}

// alt=${item.tags}
// const lightbox = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//     captionDelay: 250,
//   });
