document.getElementById('year').textContent = new Date().getFullYear();
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('waiting'); entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(el => { el.classList.add('waiting'); observer.observe(el); });
}
const photos = [...document.querySelectorAll('.photo')];
const dialog = document.querySelector('.lightbox');
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const source = photos[currentPhoto];
  const img = dialog.querySelector('img');
  img.src = source.dataset.photo;
  img.alt = source.querySelector('img').alt;
  dialog.querySelector('figcaption').textContent = (currentPhoto + 1) + ' / ' + photos.length + ' — ' + source.dataset.caption;
}
photos.forEach((photo, index) => photo.addEventListener('click', () => { showPhoto(index); dialog.showModal(); }));
dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
dialog.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') {e.preventDefault();showPhoto(currentPhoto - 1);} if (e.key === 'ArrowRight') {e.preventDefault();showPhoto(currentPhoto + 1);} });

