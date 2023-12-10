const toTop = document.querySelector(".to-top");
let lastScrollPosition = 0;

window.addEventListener("scroll", () => {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition > lastScrollPosition) {

            toTop.classList.remove("active");
      } else {
            toTop.classList.add("active");
      }

      lastScrollPosition = currentScrollPosition;
});