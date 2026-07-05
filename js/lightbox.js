window.openLightbox = function(element) {
    const img = element.querySelector('img');
    const subtitle = element.getAttribute('subtitle') || '';
    const title = element.getAttribute('title') || '';

    if (!img) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Galeri Proyek';
    caption.textContent = `${subtitle} — ${title}`;

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden'; // disable scroll
};

window.closeLightbox = function(event) {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = ''; // enable scroll
    if(event) event.stopPropagation();
};

// Tutup lightbox dengan tombol ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }
});
