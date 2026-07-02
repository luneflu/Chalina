class GalleryImage extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const src = this.getAttribute('src');
    const imgHtml = src ? `<img src="${src}" alt="${title}" class="absolute inset-0 w-full h-full object-cover z-0">` : '';

    this.innerHTML = /*html*/`
      <div class="relative w-full h-[347px] border border-white/20 group overflow-hidden">
          ${imgHtml}
          <div class="absolute inset-0 gallery-overlay opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 z-10">
              <div>
                  ${subtitle ? `<p class="text-[#bdbdbd] font-mono text-xs mb-1 uppercase tracking-wider">${subtitle}</p>` : ''}
                  <p class="text-white font-bold">${title}</p>
              </div>
          </div>
      </div>
    `;
  }
}
customElements.define('gallery-image', GalleryImage);
