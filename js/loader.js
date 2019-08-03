let timer;
let shouldLoad;

function loadingHandler() {
    let toParse = document.referrer;
    if (toParse.includes('melindawang') || performance.navigation.type===1) {
        shouldLoad = false;
        removeLoader();
    } else {
        shouldLoad = true;
        loadingAnim();
    }
}

function loadingAnim() {
    console.log('loading anim called');
    let loaderLetters;
    let counter;
    let loaderAnim = [
        {name: 'H', time: 200, delete: 0},
        {name: 'i', time: 500, delete: 0},
        {name: '!', time: 200, delete: 0},
        {name: ' ', time: 400, delete: 0},
        {name: 'm', time: 150, delete: 1},
        {name: 'M', time: 200, delete: 0},
        {name: 'y', time: 100, delete: 0},
        {name: ' ', time: 400, delete: 0},
        {name: 'n', time: 200, delete: 0},
        {name: 'a', time: 100, delete: 0},
        {name: 'm', time: 100, delete: 0},
        {name: 'e', time: 300, delete: 0},
        {name: ' ', time: 200, delete: 0},
        {name: 'i', time: 200, delete: 0},
        {name: 's', time: 200, delete: 0},
        {name: ' ', time: 400, delete: 0},
        {name: 'M', time: 100, delete: 0},
        {name: 'e', time: 100, delete: 0},
        {name: 'l', time: 100, delete: 0},
        {name: 'i', time: 100, delete: 0},
        {name: 'n', time: 100, delete: 0},
        {name: 'd', time: 100, delete: 0},
        {name: 'a', time: 400, delete: 0},
        {name: ' ', time: 200, delete: 0},
        {name: 'W', time: 200, delete: 0},
        {name: 'a', time: 100, delete: 0},
        {name: 'n', time: 100, delete: 0},
        {name: 'g', time: 200, delete: 0},
        {name: '.', time: 200, delete: 0},
        {name: '.', time: 200, delete: 0},
        {name: '.', time: 300, delete: 0},
    ];

    function loaderTimer() {
        console.log('loader timer called');
        loaderLetters = document.getElementsByClassName('loader-letter');
        counter=0;
        timer = setTimeout(loaderTimerHelper(), 600);
    }

    function loaderTimerHelper() {
        console.log('loader timer helper called');
        if (loaderLetters[counter] == null) {
            timer = setTimeout(removeLoader(), 9000);
            return;
        }

        if (loaderAnim[counter].delete !== 2) {
            loaderLetters[counter].style.display = "block";
            if (loaderAnim[counter].delete !== 1) {
                counter++;
            } else {
                loaderAnim[counter].delete = 2;
            }
        } else {
            loaderLetters[counter].style.display = "none";
            counter ++;
        }

        timer = null;
        timer = setTimeout(loaderTimerHelper, loaderAnim[counter-1].time);
    }

    loaderTimer();
}


function removeLoader() {
    let loader = document.getElementById('loader');
    loader.classList.add('fade');
    timer = null;
    timer = setTimeout(showPage, 2000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    let body = document.getElementsByTagName('BODY');
    body[0].style.overflowy = "scroll";
}

//loadingHandler();