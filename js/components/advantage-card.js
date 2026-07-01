class AdvantageCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "";
    const description = this.getAttribute("description") || "";
    const icon = this.getAttribute("icon") || "";

    this.innerHTML = /*html*/`
      <div class="p-8 flex flex-col justify-between border border-transparent hover:border-red-700 transition-colors bg-black/20 group h-[200px]">
        <div class="flex justify-between items-start">
          <div class="text-2xl text-red-700 group-hover:scale-110 transition-transform">
            <i class="${icon}"></i>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-bold font-sans mb-1 text-white">
            ${title}
          </h3>
          <p class="text-[#bdbdbd] font-light text-xs font-sans">
            ${description}
          </p>
        </div>
      </div>
    `;
  }
}
customElements.define("advantage-card", AdvantageCard);
