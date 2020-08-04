// #1 - Create global variables
// #2 - Create main functions
// #3 - Create prepareDOMElements function
// #4 - Create prepareDOMEvents function
// #5 - Create document addEventListener 'DOMContentLoaded'

// DOMElements Global Containers
let $prevBtn;
let $nextBtn;
let $imagesDiv;
let $loadBar;
let $numbers;
let $input;
let $searchBtn;
let $alert;
let $animeTitle;
let $currentImgNumber;
let $totalImgNumber;

// Data Global Containers
let $images;
let $imagesDivX = 0;

// Timeaout & Interval ID's
let $sliderInterval;


//#region MAIN STRUCTURE

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $prevBtn = document.getElementById('prevBtn');
    $nextBtn = document.getElementById('nextBtn');
    $imagesDiv = document.querySelector('.images');
    $images = [...document.querySelectorAll('.images img')];
    $loadBar = document.querySelector('.loadBar');
    $numbers = [...document.querySelectorAll('.numbers button')];
    $input = document.getElementById('animeID');
    $searchBtn = document.getElementById('searchBtn');
    $alert = document.querySelector('p.alert');
    $animeTitle = document.querySelector('.animeTitle');
    $currentImgNumber = document.querySelector('.currentImgNumber');
    $totalImgNumber = document.querySelector('.totalImgNumber');
}

const prepareDOMEvents = () => {
    $prevBtn.addEventListener('click', goPrevImage);
    $nextBtn.addEventListener('click', goNextImage);
    // $sliderInterval = setInterval(goNextImage, 10000);
    $numbers.forEach(number => number.addEventListener('click', checkClick));
    $searchBtn.addEventListener('click', getImages);
}

//#endregion

const getImages = () => {
    // let isInputRight = false;
    // let newImages = [];

    let apiLink = 'https://api.jikan.moe/v3/anime/';
    let id = '0';
    let dataType = '/pictures';
    let imageUrl;
    let infoUrl;

    if ($input.value.length === 0) return;
    else {
        id = $input.value;
        // 2 - Sklejenie url'a
        imageUrl = apiLink + id + dataType;
        infoUrl = apiLink + id;
        // 3 - Pobranie info
        fetch(infoUrl)
            .then(res => res.json())
            .then(res => $animeTitle.innerHTML = `<a href="${res.url}" target="_blank">${res.title}</a>`)
        // 4 - Pobranie obrazów
        fetch(imageUrl)
            .then(res => res.json())
            .then(res => {
                if (res.pictures.length > 0) {
                    $alert.classList.add('hide');
                    $images = [];
                    $imagesDiv.innerText = '';
                    res.pictures.forEach(pictureObj => {
                        const {
                            large,
                            small
                        } = pictureObj;
                        // console.log(small);
                        const img = document.createElement('img');
                        img.setAttribute('src', small);
                        $images.push(img);
                    });

                    $imagesDivX = 0;
                    $imagesDiv.style.transform = `translateX(-${$imagesDivX}px)`;

                    if (document.querySelector('.galleryButtons').classList.contains('hide'))
                        document.querySelector('.galleryButtons').classList.remove('hide');
                    $totalImgNumber.innerText = $images.length;

                    $images[0].classList.toggle('activeImg');
                    $currentImgNumber.innerText = 1;
                    console.log($images[0]);
                    $images.forEach(newImage => $imagesDiv.appendChild(newImage));

                    $loadBar.style.animation = 'none';
                    setTimeout(() => {
                        $loadBar.style.animation = '';
                    }, 100);

                    clearInterval($sliderInterval);
                    $sliderInterval = setInterval(goNextImage, 10000);

                    // return 1;
                }
            })
            .catch(() => {
                $alert.classList.remove('hide');
                // return false;
            })
    }


}

const checkClick = (e) => {
    switch (e.target.className) {
        case 'num1':
            $input.value += '1';
            break;
        case 'num2':
            $input.value += '2';
            break;
        case 'num3':
            $input.value += '3';
            break;
        case 'num4':
            $input.value += '4';
            break;
        case 'num5':
            $input.value += '5';
            break;
        case 'num6':
            $input.value += '6';
            break;
        case 'num7':
            $input.value += '7';
            break;
        case 'num8':
            $input.value += '8';
            break;
        case 'num9':
            $input.value += '9';
            break;
        case 'num0':
            $input.value += '0';
            break;
        case 'numReturn':
            if ($input.value.length > 0) {
                let signs = $input.value;
                signs = signs.substring(0, signs.length - 1);
                $input.value = signs;
            }
            break;
        case 'numDelete':
            if ($input.value.length > 0) {
                $input.value = '';
            }
            break;
    }
}

const goPrevImage = () => {
    const imagesNumber = $images.length;
    if (imagesNumber > 0) {
        if (!$images[0].classList.contains('activeImg')) {
            let activeImgIndex;
            $images.forEach((element, index) => {
                if (element.classList.contains('activeImg')) return activeImgIndex = index;
            });
            $currentImgNumber.innerText = activeImgIndex;
            $images[activeImgIndex].classList.toggle('activeImg');
            $images[activeImgIndex - 1].classList.toggle('activeImg');
            if (activeImgIndex >= 2) {
                $imagesDivX -= 225 + 20; //Image width + Image margin
                $imagesDiv.style.transform = `translateX(-${$imagesDivX}px)`;
            }

            $loadBar.style.animation = 'none';
            setTimeout(() => {
                $loadBar.style.animation = '';
            }, 100);
        } else {
            $images[0].classList.toggle('activeImg');
            $currentImgNumber.innerText = imagesNumber;
            $images[imagesNumber - 1].classList.toggle('activeImg');
            $imagesDivX = ($images.length - 2) * (225 + 20);
            $imagesDiv.style.transform = `translateX(-${$imagesDivX}px)`;

            $loadBar.style.animation = 'none';
            setTimeout(() => {
                $loadBar.style.animation = '';
            }, 100);
        }

        clearInterval($sliderInterval);
        $sliderInterval = setInterval(goNextImage, 10000);
    } else {
        console.log('Nie wczytano obrazkow');
    }
}

const goNextImage = (e) => {
    const imagesNumber = $images.length;
    if (imagesNumber > 0) {
        if (!$images[imagesNumber - 1].classList.contains('activeImg')) {
            let activeImgIndex;
            $images.forEach((element, index) => {
                if (element.classList.contains('activeImg')) return activeImgIndex = index;
            });
            console.log(activeImgIndex);
            $currentImgNumber.innerText = activeImgIndex + 2;
            $images[activeImgIndex].classList.toggle('activeImg');
            $images[activeImgIndex + 1].classList.toggle('activeImg');
            if (activeImgIndex >= 1) {
                $imagesDivX += 225 + 20; //Image width + Image margin
                $imagesDiv.style.transform = `translateX(-${$imagesDivX}px)`;
            }

            $loadBar.style.animation = 'none';
            setTimeout(() => {
                $loadBar.style.animation = '';
            }, 100);

        } else {
            $images[imagesNumber - 1].classList.toggle('activeImg');
            $currentImgNumber.innerText = 1;
            $images[0].classList.toggle('activeImg');
            $imagesDivX = 0;
            $imagesDiv.style.transform = `translateX(-${$imagesDivX}px)`;

            $loadBar.style.animation = 'none';
            setTimeout(() => {
                $loadBar.style.animation = '';
            }, 100);
        }

        clearInterval($sliderInterval);
        $sliderInterval = setInterval(goNextImage, 10000);
    } else {
        console.log('Nie wczytano obrazkow');
    }
}

document.addEventListener('DOMContentLoaded', main);