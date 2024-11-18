// Поиск
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('#mainCard');

    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();

            if (text.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
// Пагинация
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('#mainCard');
    const cardsPerPage = 3;
    let currentPage = localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage')) : 1;
    // Проверяем есть ли катрочка на странице
    function showPage(page) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        cards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        document.getElementById('page-number').textContent = page;
    }
    // Обновить кнопочки
    function updateButtons() {
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === Math.ceil(cards.length / cardsPerPage);
    }
    // Кнопочки (вперед, назад)
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updateButtons();
            localStorage.setItem('currentPage', currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage < Math.ceil(cards.length / cardsPerPage)) {
            currentPage++;
            showPage(currentPage);
            updateButtons();
            localStorage.setItem('currentPage', currentPage);
        }
    });

    showPage(currentPage);
    updateButtons();
});

// Filter 
document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.querySelector('.search__filter-buttons');
    const cards = document.querySelectorAll('#mainCard');

    filterSelect.addEventListener('change', function() {
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
document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.querySelector('.search__filter-buttons');
    const cards = document.querySelectorAll('#mainCard');

    // Загрузка сохраненной категории из localStorage
    loadSelectedCategory();

    filterSelect.addEventListener('change', function() {
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


document.getElementById('burgerIcon').addEventListener('click', function() { 
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