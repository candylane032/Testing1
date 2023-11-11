document.addEventListener('DOMContentLoaded', function () {
    var navbarToggle = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.querySelector('.navbar-collapse');

    document.body.addEventListener('click', function (event) {
        if (navbarCollapse.classList.contains('show') && event.target !== navbarToggle && !navbarCollapse.contains(event.target)) {
            navbarCollapse.classList.remove('show');
        }

    });

    navbarToggle.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});
