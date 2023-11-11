const toTop = document.querySelector(".to-top");
        let lastScrollPosition = 0;

        window.addEventListener("scroll", () => {
           const currentScrollPosition = window.pageYOffset;

          if (currentScrollPosition > lastScrollPosition) {
                // Scrolling down, hide the toTop icon
                toTop.classList.remove("active");
          } else {
                // Scrolling up, show the toTop icon
                toTop.classList.add("active");
           }

        lastScrollPosition = currentScrollPosition;
    });