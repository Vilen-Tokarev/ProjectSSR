const apiUrl = 'https://672caf7e1600dda5a9f97a34.mockapi.io/user';
let currentPage = 1;
const itemsPerPage = 3; // Количество элементов на странице
let totalItems = 0; // Общее количество элементов
let totalPages = 0;


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

function displayUsers(page) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const userToDisplay = allUsers.slice(startIndex, endIndex);

    userToDisplay.forEach(user => {

        const a = document.createElement('a');
        a.href = './da.html'
        a.dataset.user = JSON.stringify(user);

        const li = document.createElement('li');
        const wrap = document.createElement('div');
        a.appendChild(li);
        li.appendChild(wrap);

        let title = document.createElement('p');
        title.classList.add("title");
        title.textContent = user.title;
        wrap.appendChild(title);

        let text = document.createElement('p');
        text.textContent = user.text;
        text.classList.add("text");
        wrap.appendChild(text);

        let image = document.createElement('img');
        image.src = user.img;
        image.alt = user.title;
        li.appendChild(image);

        userList.appendChild(a);
    });


    userList.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', function(event) {
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

function updateButtons(){
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
    url.searchParams.append('title', query);

    fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'aplication/json' },
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Сетевой ответ был не ok.');
        })
        .then(tasks => {
            displayResult(tasks);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при выполнении запроса.');
        });
}



// document.addEventListener('DOMContentLoaded', function() {
//     const searchInput = document.getElementById('searchInput');
//     const cards = document.querySelectorAll('#mainCard');

//     searchInput.addEventListener('input', function() {
//         const filter = searchInput.value.toLowerCase();

//         cards.forEach(card => {
//             const text = card.textContent.toLowerCase();

//             if (text.includes(filter)) {
//                 card.style.display = '';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     });
// });


// Filter 
document.addEventListener('DOMContentLoaded', function () {
    const filterSelect = document.querySelector('.search__filter-buttons');
    const cards = document.querySelectorAll('#mainCard');

    filterSelect.addEventListener('change', function () {
        const category = this.options[this.selectedIndex].getAttribute('data-category');
        // Перебираем карточки и оставляем те которые нужны
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const filterSelect = document.querySelector('.search__filter-buttons');
    const cards = document.querySelectorAll('#mainCard');

    // Загрузка сохраненной категории из localStorage
    loadSelectedCategory();

    filterSelect.addEventListener('change', function () {
        const category = this.options[this.selectedIndex].getAttribute('data-category');

        // Сохраняем выбранную категорию в localStorage
        saveSelectedCategory(category);

        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    function saveSelectedCategory(category) {
        localStorage.setItem('selectedCategory', category);
    }
    // Функция загрузки из local storage
    function loadSelectedCategory() {
        const savedCategory = localStorage.getItem('selectedCategory');
        if (savedCategory) {
            filterSelect.querySelector(`option[data-category="${savedCategory}"]`).selected = true;
            filterSelect.dispatchEvent(new Event('change'));
        }
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