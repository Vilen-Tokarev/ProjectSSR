const apiUrl = 'https://672caf7e1600dda5a9f97a34.mockapi.io/user';
let currentPage = 1;
const itemsPerPage = 3; // Количество элементов на странице
let totalItems = 0; // Общее количество элементов
let totalPages = 0;
allUsers = [];

window.onload = function () {
    let preloader = document.getElementById('loader');
    let bg = document.getElementById("loading")
    preloader.classList.add('hide-loader');
    bg.classList.add('hide-loader');
    setInterval(function () {
        preloader.classList.add('loader-hidden');
        bg.classList.add('loader-hidden');
    }, 2500);
}

async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        allUsers = await response.json();
        totalItems = allUsers.length;
        totalPages = Math.ceil(totalItems / itemsPerPage);
        displayUsers(currentPage);
        updateButtons();
    } catch (error) {
        console.error('Ошибка получения данных', error);
    }
}

function displayUsers(page, filteredUsers = allUsers) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const userToDisplay = filteredUsers.slice(startIndex, endIndex);

    userToDisplay.forEach(user => {

        const a = document.createElement('a');
        a.href = './cards.html';
        a.dataset.user = JSON.stringify(user);

        const li = document.createElement('li');
        li.classList.add("main__card1")
        const wrap = document.createElement('div');
        wrap.classList.add("main__card1_textWrap");

        a.appendChild(li);
        li.appendChild(wrap);

        let title = document.createElement('p');
        title.classList.add("main__card1_textWrap_title");
        title.textContent = user.title;
        wrap.appendChild(title);
        
        let textCard = document.createElement('p');

        let text = document.createElement('p');
        text.textContent = user.text;
        text.classList.add("main__card1_textWrap_text");
        wrap.appendChild(text);

        let image2 = document.createElement('img');
        image2.src = user.img2;
        image2.alt = user.title;
        image2.classList.add("main__card1_img");

        let image = document.createElement('img');
        image.src = user.img;
        image.alt = user.title;
        image.classList.add("main__card1_img");
        li.appendChild(image);

        userList.appendChild(a);
    });

    userList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', function (event) {
            event.preventDefault();
            localStorage.setItem('selectedUser', a.dataset.user);
            window.location.href = a.href;
        })
    })
}

function updatePage(page) {
    currentPage = page;
    displayUsers(currentPage);
    document.getElementById('num').textContent = page;
    updateButtons();
}

function updateButtons() {
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        updatePage(currentPage - 1);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < totalPages) {
        updatePage(currentPage + 1);
    }
});


fetchUsers();



// Поиск

document.getElementById('searchButton').addEventListener('click', () => {
    const searchQuery = document.getElementById('searchInput').value;
    if (searchQuery) {
        searchUsers(searchQuery)
    } else {
        alert('Вы ничего не ввели')
    }
});

function searchUsers(query) {
    const url = new URL('https://672caf7e1600dda5a9f97a34.mockapi.io/user');
    url.searchParams.append('title', query); // Добавляем параметр для поиска по полю title

    fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Сетевой ответ был не ok.');
        })
        .then(tasks => {
            displayResults(tasks);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при выполнении запроса.');
        });
}

function displayResults(tasks) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (tasks.length === 0) {
        resultsContainer.innerHTML = 'Ничего не найдено.';
        return;
    }

    tasks.forEach(task => {
        const a = document.createElement('a');
        a.href = './cards.html';

        const li = document.createElement('li');
        li.classList.add("main__card1")
        const wrap = document.createElement('div');
        wrap.classList.add("main__card1_textWrap");

        a.appendChild(li);
        li.appendChild(wrap);

        const title = document.createElement('p');
        title.textContent = task.title;
        title.classList.add('main__card1_textWrap_title')
        wrap.appendChild(title);

        const text = document.createElement('p');
        text.textContent = task.text;
        text.classList.add('main__card1_textWrap_text');
        wrap.appendChild(text);

        
        const image = document.createElement('img');
        image.src = task.img;
        image.alt = task.title;
        image.classList.add("main__card1_img");
        li.appendChild(image);

        resultsContainer.appendChild(a);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const filterSelect = document.querySelector('.search__filter-buttons');

    filterSelect.addEventListener('change', function () {
        const category = this.value;
        applyFilters(category);
    });

    function applyFilters(category) {
        const filteredUsers = allUsers.filter(user => {
            return category === 'all' || user.category === category;
        });

        displayUsers(currentPage, filteredUsers);
    }
});


document.getElementById('burgerIcon').addEventListener('click', function () {
    const menuItems = document.getElementById('menuItems');
    const burgerIcon = document.getElementById('burgerIcon');

    if (menuItems.classList.contains('open')) {
        menuItems.classList.remove('open');
        burgerIcon.classList.remove('open');
    } else {
        menuItems.classList.add('open');
        burgerIcon.classList.add('open');
    }
});
