document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');

    // Para a animação ao passar o mouse
    carousel.addEventListener('mouseenter', function () {
        carousel.style.animationPlayState = 'paused';
    });

    // Retoma a animação ao remover o mouse
    carousel.addEventListener('mouseleave', function () {
        carousel.style.animationPlayState = 'running';
    });
});

