export function setupSwipe(
  wrapper,
  onSwipeLeft,
  onSwipeRight
) {
  let startX = 0;
  let isSwiping = false;

  wrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  });

  wrapper.addEventListener("touchend", (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      diff < 0 ? onSwipeLeft() : onSwipeRight();
    }

    isSwiping = false;
  });
}
