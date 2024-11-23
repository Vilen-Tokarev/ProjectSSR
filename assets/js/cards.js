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