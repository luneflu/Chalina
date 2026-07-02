class AppNavigation extends HTMLElement {
    connectedCallback() {
        this.innerHTML = /*html*/`
      <nav id="navbar" class="w-full fixed z-90 flex items-center justify-center border-b border-white/20 bg-transparent h-[87px] transition-all duration-300">
          <div class="w-full max-w-[1440px] flex items-center justify-between px-4 md:px-12">
              <div class="flex items-center gap-1.5">
                  <a href="#beranda" class="flex items-center">
                      <img src="images/logo-cla.png" alt="PT Cahaya Lintang Abadi Logo"
                          class="h-8 md:h-10 w-auto object-contain" />
                      <span class="brand-text text-white text-sm font-semibold ml-2">CAHAYA LINTANG
                          ABADI</span>
                  </a>
              </div>

              <div class="flex items-center gap-8 hidden lg:flex">
                  <a href="#beranda"
                      class="font-sans font-semibold text-xs text-[#f8f8f8] border-b border-[#b71c1c] pb-1">Beranda</a>
                  <a href="#tentang"
                      class="font-sans font-semibold text-xs text-[#bdbdbd] pb-1 hover:text-white transition-colors">Tentang</a>
                  <a href="#visi-misi"
                      class="font-sans font-semibold text-xs text-[#bdbdbd] pb-1 hover:text-white transition-colors">Visi
                      & Misi</a>
                  <a href="#layanan"
                      class="font-sans font-semibold text-xs text-[#bdbdbd] pb-1 hover:text-white transition-colors">Layanan</a>
                  <a href="#galeri"
                      class="font-sans font-semibold text-xs text-[#bdbdbd] pb-1 hover:text-white transition-colors">Galeri</a>
                  <a href="#pengalaman"
                      class="font-sans font-semibold text-xs text-[#bdbdbd] pb-1 hover:text-white transition-colors">Pengalaman</a>
                  <a href="#keunggulan"
                      class="font-sans font-semibold text-xs text-[#bdbdbd] pb-1 hover:text-white transition-colors">Keunggulan</a>
                  <a href="#kontak"
                      class="font-sans font-semibold text-xs text-[#bdbdbd] pb-1 hover:text-white transition-colors">Kontak</a>
              </div>

              <div class="hidden lg:block">
                  <a href="#kontak"
                      class="flex items-center justify-center border border-[#b71c1c] p-[1px] h-[41px] w-[147px] hover:bg-[#b71c1c] transition-colors group">
                      <span class="font-sans font-bold text-xs text-[#f8f8f8]">Hubungi Kami</span>
                  </a>
              </div>

              <!-- Mobile Menu Button -->
              <button id="mobile-menu-btn" class="lg:hidden text-white focus:outline-none p-2">
                  <i class="fa-solid fa-bars text-2xl"></i>
              </button>
          </div>

          <!-- Mobile Dropdown Menu -->
          <div id="mobile-menu"
              class="hidden absolute top-[87px] left-0 w-full bg-black border-b border-white/20 flex-col items-center py-6 gap-6 lg:hidden">
              <a href="#beranda" class="font-sans font-semibold text-sm text-[#f8f8f8]">Beranda</a>
              <a href="#tentang" class="font-sans font-semibold text-sm text-[#bdbdbd]">Tentang</a>
              <a href="#visi-misi" class="font-sans font-semibold text-sm text-[#bdbdbd]">Visi & Misi</a>
              <a href="#layanan" class="font-sans font-semibold text-sm text-[#bdbdbd]">Layanan</a>
              <a href="#galeri" class="font-sans font-semibold text-sm text-[#bdbdbd]">Galeri</a>
              <a href="#pengalaman" class="font-sans font-semibold text-sm text-[#bdbdbd]">Pengalaman</a>
              <a href="#keunggulan" class="font-sans font-semibold text-sm text-[#bdbdbd]">Keunggulan</a>
              <a href="#kontak" class="font-sans font-semibold text-sm text-[#bdbdbd]">Kontak</a>
              <a href="#kontak"
                  class="flex items-center justify-center border border-[#b71c1c] p-[1px] h-[41px] w-[147px] bg-[#b71c1c] text-white font-bold text-xs mt-4">Hubungi
                  Kami</a>
          </div>
      </nav>
    `;

        const navbar = this.querySelector('#navbar');
        const btn = this.querySelector('#mobile-menu-btn');
        const menu = this.querySelector('#mobile-menu');
        const icon = btn.querySelector('i');

        this._updateNavbar = () => {
            const isScrolled = window.scrollY > 20;
            const isMenuOpen = !menu.classList.contains('hidden');

            if (isScrolled || isMenuOpen) {
                navbar.classList.remove('bg-transparent');
                navbar.classList.add('bg-neutral-900');
            } else {
                navbar.classList.add('bg-transparent');
                navbar.classList.remove('bg-neutral-900');
            }
        };

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
            if (menu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
            this._updateNavbar();
        });

        const closeMenu = () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            this._updateNavbar();
        };

        const mobileNavLinks = menu.querySelectorAll('a[href^="#"]');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        const desktopLinks = this.querySelectorAll('.lg\\:flex a[href^="#"]');

        this._updateScrollspy = () => {
            const sections = document.querySelectorAll('main[id], section[id]');
            let currentSectionId = '';
            const scrollPosition = window.scrollY + 120;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (window.scrollY < 50) {
                currentSectionId = 'beranda';
            }

            if (currentSectionId) {
                desktopLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentSectionId}`) {
                        link.classList.remove('text-[#bdbdbd]');
                        link.classList.add('text-[#f8f8f8]', 'border-b', 'border-[#b71c1c]');
                    } else {
                        link.classList.remove('text-[#f8f8f8]', 'border-b', 'border-[#b71c1c]');
                        link.classList.add('text-[#bdbdbd]');
                    }
                });

                mobileNavLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentSectionId}`) {
                        link.classList.remove('text-[#bdbdbd]');
                        link.classList.add('text-[#f8f8f8]');
                    } else {
                        link.classList.remove('text-[#f8f8f8]');
                        link.classList.add('text-[#bdbdbd]');
                    }
                });
            }
        };

        this._onScroll = () => {
            this._updateNavbar();
            this._updateScrollspy();
        };

        window.addEventListener('scroll', this._onScroll);
        this._onScroll();
        setTimeout(() => this._onScroll(), 100);
    }

    disconnectedCallback() {
        if (this._onScroll) {
            window.removeEventListener('scroll', this._onScroll);
        }
    }
}

customElements.define('app-navigation', AppNavigation);
