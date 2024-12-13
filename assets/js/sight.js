// Loader
function load() {
  window.onload = function () {
    let preloader = document.getElementById("loader");
    let bg = document.getElementById("loading");
    preloader.classList.add("hide-loader");
    bg.classList.add("hide-loader");
    setTimeout(function () {
      preloader.classList.add("loader-hidden");
      bg.classList.add("loader-hidden");
    }, 2500);
  };
}
load();

class UserManage {
  constructor(
    apiUrl,
    itemsPerPage
  ) {
    this.apiUrl = apiUrl;
    this.currentPage = 1;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = 0;
    this.totalPages = 0;
    this.allUsers = [];
  }

  async fetchUsers() {
    try {
      const response = await fetch(this.apiUrl);
      this.allUsers = await response.json();
      this.totalItems = this.allUsers.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.displayUsers(this.currentPage);
      this.updateButtons();
    } catch (error) {
      console.error("Ошибка получения данных", error);
    }
  }

  updatePage(page) {
    this.currentPage = page;
    this.displayUsers(this.currentPage);
    document.getElementById("num").textContent = page;
    this.updateButtons();
  }

  updateButtons() {
    document.getElementById("prevPage").disabled = this.currentPage === 1;
    document.getElementById("nextPage").disabled =
      this.currentPage === this.totalPages;
  }

  displayUsers(page, filteredUsers = this.allUsers) {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

    usersToDisplay.forEach((user) => {
      const card = new UserCard(user);
      userList.appendChild(card.render());
    });

    userList.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        const userData = JSON.parse(a.dataset.user);
        const userID = userData.id;
        const url = `/cards.html?id=${userID}`;

        window.location.href = url;
      });
    });
  }

  searchUsers(query) {
    const url = new URL(this.apiUrl);
    url.searchParams.append("title", query);

    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Сетевой ответ был не ok.");
      })
      .then((tasks) => {
        this.displayResults(tasks);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при выполнении запроса.");
      });
  }

  displayResults(tasks) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    if (tasks.length === 0) {
      resultsContainer.innerHTML = "Ничего не найдено.";
      return;
    }

    tasks.forEach((task) => {
      const card = new UserCard(task);
      resultsContainer.appendChild(card.render());
    });
  }

  applyFilters(category) {
    const filteredUsers = this.allUsers.filter((user) => {
      return category === "all" || user.category === category;
    });

    this.displayUsers(this.currentPage, filteredUsers);
  }
}

class UserCard {
  constructor(user) {
    this.user = user;
  }

  render() {
    const a = document.createElement("a");
    a.href = "./cards.html";
    a.dataset.user = JSON.stringify(this.user);

    const li = document.createElement("li");
    li.classList.add("main__card1");
    const wrap = document.createElement("div");
    wrap.classList.add("main__card1_textWrap");

    a.appendChild(li);
    li.appendChild(wrap);

    const title = document.createElement("p");
    title.classList.add("main__card1_textWrap_title");
    title.textContent = this.user.title;
    wrap.appendChild(title);

    const text = document.createElement("p");
    text.textContent = this.user.text;
    text.classList.add("main__card1_textWrap_text");
    wrap.appendChild(text);

    const image = document.createElement("img");
    image.src = this.user.img;
    image.alt = this.user.title;
    image.classList.add("main__card1_img");
    li.appendChild(image);

    return a;
  }
}

const apiUrl = "https://672caf7e1600dda5a9f97a34.mockapi.io/user";
const itemsPerPage = 3;
const userManager = new UserManage(apiUrl, itemsPerPage);

userManager.fetchUsers();

document.getElementById("prevPage").addEventListener("click", () => {
  if (userManager.currentPage > 1) {
    userManager.updatePage(userManager.currentPage - 1);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  if (userManager.currentPage < userManager.totalPages) {
    userManager.updatePage(userManager.currentPage + 1);
  }
});

document.getElementById("searchButton").addEventListener("click", () => {
  const searchQuery = document.getElementById("searchInput").value;
  if (searchQuery) {
    userManager.searchUsers(searchQuery);
  } else {
    alert("Вы ничего не ввели");
  }
});

// Фильтер
document.addEventListener("DOMContentLoaded", function () {
  const filterSelect = document.querySelector(".search__filter-buttons");

  filterSelect.addEventListener("change", function () {
    const category = this.value;
    userManager.applyFilters(category);
  });
});

// Burger
document.getElementById("burgerIcon").addEventListener("click", function () {
  const menuItems = document.getElementById("menuItems");
  const burgerIcon = document.getElementById("burgerIcon");

  if (menuItems.classList.contains("open")) {
    menuItems.classList.remove("open");
    burgerIcon.classList.remove("open");
  } else {
    menuItems.classList.add("open");
    burgerIcon.classList.add("open");
  }
});
