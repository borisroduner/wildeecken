(function () {
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Schliessen">&times;</button>' +
    '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Vorheriges Bild">&#10094;</button>' +
    '<img class="lightbox-image" alt="">' +
    '<button class="lightbox-nav lightbox-next" type="button" aria-label="Nächstes Bild">&#10095;</button>' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector(".lightbox-image");
  const lightboxCaption = overlay.querySelector(".lightbox-caption");
  const prevBtn = overlay.querySelector(".lightbox-prev");
  const nextBtn = overlay.querySelector(".lightbox-next");

  let galleryImages = [];
  let currentIndex = -1;

  function captionFor(img) {
    return img.closest("figure")?.querySelector("figcaption")?.textContent || img.alt || "";
  }

  function render() {
    const img = galleryImages[currentIndex];
    if (!img) return;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "";
    lightboxCaption.textContent = captionFor(img);
    const hasMultiple = galleryImages.length > 1;
    prevBtn.hidden = !hasMultiple;
    nextBtn.hidden = !hasMultiple;
  }

  function openLightbox(img) {
    const gallery = img.closest(".gallery");
    galleryImages = gallery ? Array.from(gallery.querySelectorAll("img")) : [img];
    currentIndex = galleryImages.indexOf(img);
    render();
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function step(delta) {
    if (galleryImages.length === 0) return;
    currentIndex = (currentIndex + delta + galleryImages.length) % galleryImages.length;
    render();
  }

  function closeLightbox() {
    overlay.classList.remove("is-open");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gallery img").forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    step(-1);
  });
  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    step(1);
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target === lightboxImg) {
      closeLightbox();
    }
  });
  overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      step(-1);
    } else if (event.key === "ArrowRight") {
      step(1);
    }
  });
})();
