export function updateSlider(
  slider,
  slideWidth,
  gap,
  currentIndex
) {
  const offset = currentIndex * (slideWidth + gap);
  slider.style.transform = `translateX(-${offset}px)`;
}
