const inputFields = document.querySelectorAll('.container input');
const bottomNavigation = document.querySelector('.bottom-navigation');
const isMobile = window.innerWidth <= 767; // Adjust the breakpoint as needed

if (isMobile) {
    inputFields.forEach(input => {
        input.addEventListener('focus', () => {
            bottomNavigation.style.display = 'none'; // Hide the bottom navigation
        });

        input.addEventListener('blur', () => {
            bottomNavigation.style.display = 'block'; // Show the bottom navigation
        });
    });
}
