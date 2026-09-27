// Mobile menu toggle
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
});
