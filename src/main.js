import "./style.css";
import { getSlidesToShow, GAP } from "./slider/config.js";
import { updateSlider } from "./slider/slider.js";
import { createDots, updateDots } from "./slider/dots.js";
import { setupSwipe } from "./slider/swipe.js";

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

  let slidesToShow = getSlidesToShow();
  let slideWidth = 0;
  let currentIndex = 0;
  let dots = [];

  function handleDotsUpdate() {
    const currentPage = Math.floor(
      currentIndex / slidesToShow
    );
    updateDots(dots, currentPage);
  }

  function updateAll() {
    updateSlider(slider, slideWidth, GAP, currentIndex);
    handleDotsUpdate();
  }

  function updateSliderWidth() {
    const wrapperWidth = sliderWrapper.offsetWidth;
    slidesToShow = getSlidesToShow();
    slideWidth =
      (wrapperWidth - GAP * (slidesToShow - 1)) /
      slidesToShow;

    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });

    if (currentIndex > slideCount - slidesToShow) {
      currentIndex = Math.max(0, slideCount - slidesToShow);
    }

    updateAll();

    const pageCount = Math.ceil(slideCount / slidesToShow);
    dots = createDots({
      container: dotsContainer,
      pageCount,
      currentIndex: Math.floor(currentIndex / slidesToShow),
      onClick: (pageIdx) => {
        currentIndex = pageIdx * slidesToShow;
        updateAll();
      },
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex -= slidesToShow;
    if (currentIndex < 0) {
      currentIndex = Math.max(0, slideCount - slidesToShow);
    }
    updateAll();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex += slidesToShow;
    if (currentIndex > slideCount - slidesToShow) {
      currentIndex = 0;
    }
    updateAll();
  });

  setupSwipe(
    sliderWrapper,
    () => nextBtn.click(),
    () => prevBtn.click()
  );

  updateSliderWidth();
  window.addEventListener("resize", updateSliderWidth);
});
