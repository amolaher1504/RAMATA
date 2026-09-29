// ================================
// Mobile Menu
// ================================
document.addEventListener('DOMContentLoaded', function () {

    const toggle = document.querySelector('.mobile-menu');
    const links = document.querySelector('.nav-links');

    if (toggle && links) {

        toggle.addEventListener('click', function () {
            links.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(function (link) {

            link.addEventListener('click', function () {
                links.classList.remove('active');
            });

        });
    }


    // ================================
    // Specializations Carousel
    // ================================

    const carousel = document.querySelector('.spec-carousel .spec-grid');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (carousel && prevBtn && nextBtn) {

        // Next button
        nextBtn.addEventListener('click', function () {

            carousel.scrollBy({
                left: carousel.clientWidth,
                behavior: 'smooth'
            });

        });


        // Previous button
        prevBtn.addEventListener('click', function () {

            carousel.scrollBy({
                left: -carousel.clientWidth,
                behavior: 'smooth'
            });

        });

    }


    // ================================
    // Drone Images Carousel - Point 8
    // ================================

    const droneCarousel = document.querySelector('.drone-carousel-track');
    const dronePrev = document.querySelector('.drone-prev');
    const droneNext = document.querySelector('.drone-next');
    const droneContainer = document.querySelector('.drone-carousel');

    if (droneCarousel && dronePrev && droneNext) {

        // Next button
        droneNext.addEventListener('click', function () {

            droneCarousel.scrollBy({
                left: droneCarousel.clientWidth,
                behavior: 'smooth'
            });

        });


        // Previous button
        dronePrev.addEventListener('click', function () {

            droneCarousel.scrollBy({
                left: -droneCarousel.clientWidth,
                behavior: 'smooth'
            });

        });


        // ================================
        // Automatic Drone Carousel
        // ================================

        let autoSlide;

        function startAutoSlide() {

            clearInterval(autoSlide);

            autoSlide = setInterval(function () {

                // If carousel reached the end,
                // go back to the first image
                if (
                    droneCarousel.scrollLeft +
                    droneCarousel.clientWidth >=
                    droneCarousel.scrollWidth - 5
                ) {

                    droneCarousel.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });

                } else {

                    droneCarousel.scrollBy({
                        left: droneCarousel.clientWidth,
                        behavior: 'smooth'
                    });

                }

            }, 3000);
        }


        function stopAutoSlide() {
            clearInterval(autoSlide);
        }


        // Start automatic sliding
        startAutoSlide();


        // Pause when mouse is over carousel
        if (droneContainer) {

            droneContainer.addEventListener('mouseenter', stopAutoSlide);

            droneContainer.addEventListener('mouseleave', startAutoSlide);


            // Pause when touching/swiping on mobile
            droneContainer.addEventListener('touchstart', stopAutoSlide);

            droneContainer.addEventListener('touchend', function () {

                setTimeout(function () {
                    startAutoSlide();
                }, 1500);

            });

        }

    }

});