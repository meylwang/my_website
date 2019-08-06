let scrolling = false;
let windowScroll = false;
let scrollBuffer;
let scrollUp, scrollDown, windowPosition;
let startedScroll = false;
let images, projects, titles, descriptions;

let setup = function() {
    scrollBuffer = window.innerHeight/10;
    images = $('.project-img');
    projects = $('.project');
    titles = $('.project-animbox');
    descriptions = $('.project-description');
};

let startScroll = function() {
    $('body')[0].classList.remove('nosnap');
    if ((current > 0)&& (current!==null)) {
        let i = current-1;
        images[i].classList.remove('expand');
        projects[i].classList.remove('tall');
        titles[i].classList.remove('animate');
        descriptions[i].classList.remove('animate');
    }
};

let stopScroll = function() {
    setCurrent();
    windowScroll = false;
    //console.log(footer);
    //console.log(screen);
    if ((current > 0) && !(footer && !screen[6])) {
        let i = current-1;
        images[i].classList.add('expand');
        projects[i].classList.add('tall');
        titles[i].classList.add('animate');
        descriptions[i].classList.add('animate');
        startedScroll = false;
    }
};

setup();

window.addEventListener('scroll', function ( event ) {
    if (!windowScroll) {
        scrollUp = document.body.getBoundingClientRect().top + scrollBuffer;
        scrollDown = document.body.getBoundingClientRect().top - scrollBuffer;
        //console.log('scroll up '+scrollUp);
        //console.log('scroll down'+scrollDown);
        windowScroll = true;
    }
    if (!startedScroll) {
        windowPosition = document.body.getBoundingClientRect().top;
    }
    if ((windowPosition > scrollUp)||(windowPosition < scrollDown)) {
        if (!startedScroll) {
            startedScroll = true;
            startScroll();
        }

        // Clear our timeout throughout the scroll
        window.clearTimeout( scrolling );

        // Set a timeout to run after scrolling ends
        scrolling = setTimeout(function() {
            stopScroll();


        }, 500);
    }


}, false);


$( '#men' ).click(
    function() {
        $('body')[0].classList.add('nosnap');
        $('html, body').animate(
            {
                scrollTop: $("html").offset().top
            }, 1500);
});

$( '#ux' ).click(function() {
    $('body')[0].classList.add('nosnap');
    $('html, body').animate({
        scrollTop: $("#charity").offset().top
    }, 1500);
});

$( '#xr' ).click(function() {
    $('body')[0].classList.add('nosnap');
    $('html, body').animate({
        scrollTop: $("#donttouch").offset().top
    }, 1500);
});

$( '#fun' ).click(function() {
    $('body')[0].classList.add('nosnap');
    $('html, body').animate({
        scrollTop: $("#sketchpack").offset().top
    }, 1500);
});
