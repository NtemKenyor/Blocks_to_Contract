document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentIndex = 0;

    nextButton.addEventListener('click', function () {
        if (currentIndex < carousel.children.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carousel.children.length - 1;
        }
        updateCarousel();
    });

    function updateCarousel() {
        const itemWidth = carousel.children[0].offsetWidth;
        const newPosition = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${newPosition}px)`;
    }
});
