import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const prevBtn = document.querySelector(
    ".slider-btn.prev"
  );
  const nextBtn = document.querySelector(
    ".slider-btn.next"
  );
  const sliderWrapper = document.querySelector(
    ".slider-wrapper"
  );
  const dotsContainer =
    document.getElementById("slider-dots");

  const slides = Array.from(slider.children);
  const slideCount = slides.length;
  const gap = 20;

  let slidesToShow = getSlidesToShow();
  let slideWidth = 0;
  let currentIndex = 0;
  let dots = [];

  function getSlidesToShow() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  function updateSlider() {
    const offset = currentIndex * (slideWidth + gap);
    slider.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function updateSliderWidth() {
    const prevSlidesToShow = slidesToShow;
    slidesToShow = getSlidesToShow();

    const wrapperWidth = sliderWrapper.offsetWidth;
    slideWidth =
      (wrapperWidth - gap * (slidesToShow - 1)) /
      slidesToShow;

    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });

    currentIndex =
      Math.floor(currentIndex / prevSlidesToShow) *
      slidesToShow;
    if (currentIndex > slideCount - slidesToShow) {
      currentIndex = Math.max(0, slideCount - slidesToShow);
    }

    updateSlider();
    createDots();
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    const pageCount = Math.ceil(slideCount / slidesToShow);
    dots = [];

    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement("span");
      dot.classList.add("slider-dot");
      if (i === Math.floor(currentIndex / slidesToShow)) {
        dot.classList.add("active");
      }
      dot.addEventListener("click", () => {
        currentIndex = i * slidesToShow;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  }

  function updateDots() {
    dots.forEach((dot, idx) => {
      dot.classList.toggle(
        "active",
        idx === Math.floor(currentIndex / slidesToShow)
      );
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex -= slidesToShow;
    if (currentIndex < 0) {
      currentIndex = Math.max(0, slideCount - slidesToShow);
    }
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex += slidesToShow;
    if (currentIndex > slideCount - slidesToShow) {
      currentIndex = 0;
    }
    updateSlider();
  });

  updateSliderWidth();
  window.addEventListener("resize", updateSliderWidth);
});
