let apps = [];
let appnames = [
    'charity',
    'letsdance',
    'salesforce',
    'vsco',
    'donttouch',
    'lumos',
    'sketchpack',
    'dragqueens',
    'visual'
];
let projects;
let titles = [];
let descriptions = [];
let canvases = [];

let ratio = window.innerWidth*5/11;

let scrolling = false;
let windowScroll = false;
let scrollBuffer;
let scrollUp, scrollDown, windowPosition;
let startedScroll = false;


// Main Application
class Application {
    constructor(container) {
        this.images = [
            'images/i-charity.png',
            'images/i-letsdance.png',
            'images/i-salesforce.png',
            'images/i-vsco.png',
            'images/i-donttouch.png',
            'images/i-lumos.png',
            'images/i-sketchpack.png',
            'images/i-dragqueens.png',
            'images/i-visual.png'
        ];
        this.speed = 50;
        this.s = 50;
        this.container = document.getElementById(container);
        this.width = window.innerWidth*7/10;
        this.height = ratio;

        this.renderer = new PIXI.autoDetectRenderer(this.width, this.height, {
            transparent: true,
            antialias: true,
        });
        this.renderer.autoResize = true;
        this.active = false;
    }
    init(num) {
        this.count = num;
        this.imageURL = this.images[this.count];
        this.dispURL = 'images/ripple.png';
        this.container.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();

        this.texture = PIXI.Texture.fromImage(this.imageURL);
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.scale.set(window.innerWidth/3200, ratio/1400);
        this.sprite.anchor.set(0.01, 0.01);

        this.displacementSprite = PIXI.Sprite.fromImage(this.dispURL);
        this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);

        this.displacementSprite.scale.x = 0.5;
        this.displacementSprite.scale.y = 0.5;

        this.stage.addChild(this.sprite);
        this.stage.addChild(this.displacementSprite);
        this.stage.filters = null;
        this.visible = true;
        //this.animate();
    }
    animate() {
        if (this.visible) {
            requestAnimationFrame(() => this.animate());
            this.renderer.render(this.stage);
            /*
            if (this.active) {
                this.speed += 1;
                this.stage.filters = [this.displacementFilter];

                this.displacementSprite.x = this.speed;
                this.displacementSprite.y = this.speed;
            }
            */
        }
    }
}

let setup = function() {
    let app;
    for (let i=0; i<appnames.length; i++) {
        app = new Application(appnames[i]);
        app.init(i);
        app.container.children[2].classList.add('masking');
        apps.push(app);
    }
    projects = $('.project');
    descriptions = $('.project-description');
    titles = $('.project-animbox');
    let holder;
    for (let i=0; i<projects.length; i++) {
        holder = projects[i].children;
        canvases.push(holder[2]);
    }
    scrollBuffer = window.innerHeight/10;
};

let startScroll = function() {
    if ((current > 0)&& (current!==null)) {
        let i = current-1;
        apps[i].active = false;
        apps[i].stage.filters = null;
        canvases[i].classList.remove('expand');
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
        //scroll(i);
        apps[i].active = true;
        canvases[i].classList.add('expand');
        projects[i].classList.add('tall');
        titles[i].classList.add('animate');
        descriptions[i].classList.add('animate');
        startedScroll = false;
    }
};

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
/*
function scroll(num) {
    let hash = '#' + projects[num].id;
    //let offset = $(hash).offset().top; //+ window.innerWidth/6*(num-1);

    console.log( 'scroll called ');
    //console.log( 'edited' + offset);

    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 100, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
        //automaticScroll = -6;
        startedScroll = false;
        //finishedScroll = true;
        //console.log('done scrolling');
    });
}
*/

$( '#men' ).click(function() {
    $('html, body').animate({
        scrollTop: $("html").offset().top
    }, 1500);
});

$( '#ux' ).click(function() {
    $('html, body').animate({
        scrollTop: $("#charity").offset().top
    }, 1500);
});

$( '#xr' ).click(function() {
    $('html, body').animate({
        scrollTop: $("#donttouch").offset().top
    }, 1500);
});

$( '#fun' ).click(function() {
    $('html, body').animate({
        scrollTop: $("#sketchpack").offset().top
    }, 1500);
});

setup();