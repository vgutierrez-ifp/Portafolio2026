document.addEventListener("DOMContentLoaded", () => {
    // Interacción de Botón "Volver Arriba"
    const backToTopBtns = document.querySelectorAll('.back-to-top');
    backToTopBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Lógica de carruseles en la página de detalles (los manuales)
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const images = container.querySelectorAll('.carousel img');
        const counter = container.querySelector('.carousel-counter');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        let currentIndex = 0;

        if (images.length > 0 && prevBtn && nextBtn) {
            updateCounter();

            nextBtn.addEventListener('click', () => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
                updateCounter();
            });

            prevBtn.addEventListener('click', () => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                images[currentIndex].classList.add('active');
                updateCounter();
            });
        }

        function updateCounter() {
            if (counter) {
                counter.textContent = `${currentIndex + 1}/${images.length}`;
            }
        }
    });

    // Galería manual de IAAPA: una imagen visible y navegación con flechas.
    const projectGalleries = document.querySelectorAll('.project-gallery');
    
    projectGalleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.project-gallery-images img');
        const prevButton = gallery.querySelector('.gallery-prev');
        const nextButton = gallery.querySelector('.gallery-next');
        if (images.length === 0 || !prevButton || !nextButton) return;

        let currentImage = 0;
        let isAnimating = false;

        function showImage(index, direction) {
            if (isAnimating) return;

            const nextImageIndex = (index + images.length) % images.length;
            if (nextImageIndex === currentImage) return;

            isAnimating = true;
            const current = images[currentImage];
            const next = images[nextImageIndex];
            const enterClass = direction === 'previous' ? 'from-left' : 'from-right';
            const exitClass = direction === 'previous' ? 'to-right' : 'to-left';

            next.classList.add('is-entering', enterClass);
            void next.offsetWidth;
            next.classList.add('active');
            next.classList.remove(enterClass);
            current.classList.add(exitClass);

            window.setTimeout(() => {
                current.classList.remove('active', exitClass);
                current.classList.add('is-reset');
                void current.offsetWidth;
                current.classList.remove('is-reset');
                next.classList.remove('is-entering');
                currentImage = nextImageIndex;
                isAnimating = false;
            }, 650);
        }

        prevButton.addEventListener('click', () => showImage(currentImage - 1, 'previous'));
        nextButton.addEventListener('click', () => showImage(currentImage + 1, 'next'));
        // Avance automático pausado para poder apreciar cada imagen.
        setInterval(() => showImage(currentImage + 1, 'next'), 6000);
    });

    // Alterna las dos versiones del logo PMV en el primer cuadro.
    document.querySelectorAll('.logo-switcher').forEach(slideshow => {
        const images = slideshow.querySelectorAll('img');
        if (images.length < 2) return;

        let currentImage = 0;
        setInterval(() => {
            images[currentImage].classList.remove('active');
            currentImage = (currentImage + 1) % images.length;
            images[currentImage].classList.add('active');
        }, 5000);
    });
});
