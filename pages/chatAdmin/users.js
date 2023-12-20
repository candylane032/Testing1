const searchBar = document.querySelector(".users .search input"),
    searchBtn = document.querySelector(".users .search button"),
    usersList = document.querySelector(".users .users-list");

searchBtn.onclick = () => {
    searchBar.classList.toggle("active");
    searchBar.focus();
    searchBtn.classList.toggle("active");
    searchBar.value = "";
};

let searchTimer;

searchBar.onkeyup = () => {
    clearTimeout(searchTimer);
    let searchTerm = searchBar.value.trim();

    if (searchTerm !== "") {
        searchBar.classList.add("active");
        searchTimer = setTimeout(() => {
            performSearch(searchTerm);
        }, 300);
    } else {
        searchBar.classList.remove("active");
    }
};

function performSearch(searchTerm) {
    fetch("../chatAdmin/search.php", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: "searchTerm=" + searchTerm,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((data) => {
            usersList.innerHTML = data;
        })
        .catch((error) => {
            console.error("Error during search:", error);
        });
}

setInterval(() => {
    fetch("../chatAdmin/users.php")
        .then((response) => response.text())
        .then((data) => {
            if (!searchBar.classList.contains("active")) {
                usersList.innerHTML = data;
            }
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        });
}, 500);
