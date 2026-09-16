(function () {
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Schliessen">&times;</button>' +
    '<img class="lightbox-image" alt="">' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector(".lightbox-image");
  const lightboxCaption = overlay.querySelector(".lightbox-caption");

  function openLightbox(img) {
    const caption = img.closest("figure")?.querySelector("figcaption")?.textContent || img.alt || "";
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "";
    lightboxCaption.textContent = caption;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
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

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target === lightboxImg) {
      closeLightbox();
    }
  });
  overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
