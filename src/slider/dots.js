export function createDots({
  container,
  pageCount,
  currentIndex,
  onClick,
}) {
  container.innerHTML = "";
  const dots = [];

  for (let i = 0; i < pageCount; i++) {
    const dot = document.createElement("span");
    dot.classList.add("slider-dot");
    if (i === Math.floor(currentIndex)) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => onClick(i));
    container.appendChild(dot);
    dots.push(dot);
  }

  return dots;
}

export function updateDots(dots, currentPage) {
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentPage);
  });
}
