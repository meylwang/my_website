let current;
let screen = [false, false, false, false, false, false, false, false];
let hero = true;
let footer = false;
let menu = document.querySelectorAll('.menu-item');

let activate = function (num) {
    for (let i=0; i<menu.length; i++) {
        menu[i].classList.remove('highlighted')
    }
    menu[num].classList.add('highlighted')
};

let manageMenu = function() {
    if (screen[0]&&!screen[1]) {
        activate(0);
        hero = true;
        animate();
    } else if ((screen[0]&&screen[1]) || (screen[2]&&screen[3])) {
        hero = false;
        activate(1);
    } else if (screen[4]&&screen[5]) {
        activate(2);
    } else if (screen[6]&&screen[7]) {
        activate(3);
    }
};

let setCurrent = function() {
    if (screen[0]&&!screen[1]) {
        current = 0;
    }
    if (screen[7]&&!screen[5]) {
        current = 8;
    }
    for (let i=0; i<screen.length-2; i++) {
        if (!screen[i]) continue;
        if (screen[i] && screen[i+1] && !screen[i+2]) {
            current = i+1;
        }
        if (screen[i] && screen[i+1] && screen[i+2]) {
            current = i+2;
        }
    }
};

let doSomething = function (num) {
    screen[num] = true;
    apps[num].visible = true;
    apps[num].animate();
    manageMenu();
};

let exiting = function (num) {
    screen[num] = false;
    apps[num].visible = false;
    manageMenu();
};

let activeFooter = function () {
    fscene.add(fpivot);
    footer = true;
    footerAnimate();
};

let inactiveFooter = function () {
    fscene.remove(fpivot);
    footer = false;
};

inView('#charity')
    .on('enter', el => {
        doSomething(0);
    })
    .on('exit', el => {
        exiting(0);
    });

inView('#letsdance')
    .on('enter', el => {
        doSomething(1);
    })
    .on('exit', el => {
        exiting(1);
    });

inView('#salesforce')
    .on('enter', el => {
        doSomething(2);
    })
    .on('exit', el => {
        exiting(2);
    });

inView('#vsco')
    .on('enter', el => {
        doSomething(3);
    })
    .on('exit', el => {
        exiting(3);
    });

inView('#donttouch')
    .on('enter', el => {
        doSomething(4);
    })
    .on('exit', el => {
        exiting(4);
    });

inView('#lumos')
    .on('enter', el => {
        doSomething(5);

    })
    .on('exit', el => {
        exiting(5);

    });

inView('#sketchpack')
    .on('enter', el => {
        doSomething(6);
    })
    .on('exit', el => {
        exiting(6);
    });

inView('#visual')
    .on('enter', el => {
        doSomething(7);
    })
    .on('exit', el => {
        exiting(7);
    });

inView('#footer')
    .on('enter', el => {
        activeFooter();
    })
    .on('exit', el => {
        inactiveFooter();
    });