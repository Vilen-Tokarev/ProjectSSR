window.onload = function () {
    let preloader = document.getElementById('loader');
    let bg = document.getElementById("loading")
    preloader.classList.add('hide-loader');
    bg.classList.add('hide-loader');
    setTimeout(function () {
        preloader.classList.add('loader-hidden');
        bg.classList.add('loader-hidden');
    }, 2500);
}

const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
const card = document.getElementById('userDetails');
if (selectedUser) {

    const li = document.createElement('li');
    li.classList.add("main__card");
    const wrap = document.createElement('div');
    wrap.classList.add("main__card1_textWrap");
    li.appendChild(wrap);

    let title = document.createElement('p');
    title.classList.add("main__card1_textWrap_title");
    title.textContent = selectedUser.title;
    wrap.appendChild(title);

    let text = document.createElement('p');
    text.textContent = selectedUser.textCard;
    text.classList.add("main__card1_textWrap_text");
    wrap.appendChild(text);

    let imgWrap = document.createElement('div');
    imgWrap.classList.add("main__imgWrap");
    li.appendChild(imgWrap)

    let image = document.createElement('img');
    image.src = selectedUser.img;
    image.alt = selectedUser.title;
    image.classList.add("main__card1_img");
    imgWrap.appendChild(image);

    let image2 = document.createElement('img');
    image2.src = selectedUser.img2;
    image2.alt = selectedUser.title;
    image2.classList.add("main__card1_img2");
    imgWrap.appendChild(image2);

    let mapWrap = document.createElement('div');
    mapWrap.classList.add("main__mapWrap");
    li.appendChild(mapWrap)

    let map = document.createElement('iframe')
    map.src = selectedUser.map
    map.width = "800"
    map.height = "450"
    map.style = "border:0;border-radius: 10px;"
    map.allowFullscreen = ""
    map.loading = "lazy"
    map.referrerPolicy = "no-referrer-when-downgrade"
    mapWrap.appendChild(map)


    card.appendChild(li);
} else {
    document.getElementById('userDetails').textContent = 'No user data found.';
}

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
document.getElementById("open-modal-btn").addEventListener("click", function () {
    document.getElementById("modal").classList.add("open")
})

document.getElementById("close-modal-btn").addEventListener("click", function () {
    document.getElementById("modal").classList.remove("open")
})

// Отзывы
document.getElementById("send-modal-btn").addEventListener("click", function () {
    const rareInput = document.querySelector(".modal__box_input_rare");
    const loginInput = document.querySelector(".modal__box_input_login");
    const textInput = document.querySelector(".modal__box_input_text");

    let info = {
        rare: rareInput.value,
        login: loginInput.value,
        text: textInput.value,
        sight: selectedUser.title
    };

    if (rareInput.value > 10 || !rareInput.value || !loginInput.value || !textInput.value) {
        alert("Пожалуйста заполните все троки или проверьте оценку");
        return;
    }
    if (isNaN(rareInput.value)) {
        alert("Значение оценки должно быть числом");
        return;
    }

    let pop = JSON.parse(localStorage.getItem('reviewsText')) || [];

    pop.push(info);

    let infoString = JSON.stringify(pop);

    localStorage.setItem('reviewsText', infoString);

    rareInput.value = '';
    loginInput.value = '';
    textInput.value = '';

    document.getElementById("modal").classList.remove("open");

    reviews();
});

function reviews() {
    const rewWrap = document.getElementById('rewWrap');
    rewWrap.innerHTML = ''; 

    const reviewsText = JSON.parse(localStorage.getItem('reviewsText')) || [];

    reviewsText.forEach(review => {
        let box = document.createElement('div');
        box.classList.add('reviews_box');

        let wrapBox = document.createElement('div');
        wrapBox.classList.add('reviews_wrapBox');
        let wrapBox2 = document.createElement('div');
        wrapBox2.classList.add('reviews_wrapBox2');

        let login = document.createElement('p');
        login.textContent = review.login;
        login.classList.add('reviews_login'); 

        let rare = document.createElement('p');
        rare.textContent =  'Оценка: ' + review.rare + '/10';
        rare.classList.add('reviews_rare');
        
        let sight = document.createElement('p');
        sight.textContent = review.sight;
        sight.classList.add('reviews_sight'); 

        let text = document.createElement('p');
        text.textContent = 'Отзыв: ' + review.text;
        text.classList.add('reviews_text'); 

        wrapBox.appendChild(login);
        wrapBox.appendChild(sight);
        wrapBox2.appendChild(rare);
        wrapBox2.appendChild(text);

        box.appendChild(wrapBox);
        box.appendChild(wrapBox2);
        
        rewWrap.appendChild(box);
    });
}

document.addEventListener('DOMContentLoaded', reviews);

