


const inputFields = document.querySelectorAll('.container input');
const bottomNavigation = document.querySelector('.bottom-navigation');
const isMobile = window.innerWidth <= 767;

if (isMobile) {
    inputFields.forEach(input => {
        input.addEventListener('focus', () => {
            bottomNavigation.style.display = 'none'; 
        });

        input.addEventListener('blur', () => {
            bottomNavigation.style.display = 'block'; 
        });
    });
}



