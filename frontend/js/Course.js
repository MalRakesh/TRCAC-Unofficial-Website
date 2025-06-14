document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('.cards-container');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');

  let scrollAmount = 0;

  const scrollStep = cardsContainer.children[0].offsetWidth + 20; // card width + margin

  leftArrow.addEventListener('click', () => {
    if (scrollAmount > 0) {
      scrollAmount -= scrollStep;
      cardsContainer.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  });

  rightArrow.addEventListener('click', () => {
    if (scrollAmount < cardsContainer.scrollWidth - cardsContainer.clientWidth) {
      scrollAmount += scrollStep;
      cardsContainer.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  });
});
