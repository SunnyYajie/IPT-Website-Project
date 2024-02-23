/* ========================== Profession/Description Animation In Home Page ========================== */
var typed = new Typed(".profession",{
    strings:["" ,"<span class='red'>F</span><span class='orange'>U</span><span class='yellow'>N</span>", "<span class='red'>F</span><span class='orange'>R</span><span class='yellow'>I</span><span class='blue'>E</span><span class='violet'>N</span><span class='red'>D</span><span class='orange'>S</span><span class='yellow'>H</span><span class='green'>I</span><span class='blue'>P</span>", 
    "<span class='red'>L</span><span class='orange'>A</span><span class='yellow'>U</span><span class='green'>G</span><span class='blue'>H</span><span class='violet'>T</span><span class='red'>E</span><span class='orange'>R</span>",
    "<span class='red'>A</span><span class='orange'>D</span><span class='yellow'>V</span><span class='green'>E</span><span class='blue'>N</span><span class='violet'>T</span><span class='red'>U</span><span class='orange'>R</span><span class='yellow'>E</span>"],
    typeSpeed: 90,
    BackSpeed: 30,
    loop: true})

/* ========================== Tab Function In About Section ========================== */
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

/* ========================== Tab Function In Portfolio Section ========================== */
var tablinks2 = document.getElementsByClassName("tab-links2");
var tabcontents2 = document.getElementsByClassName("tab-contents2");

function opentab2(tabname){
    for(tablink of tablinks2){
        tablink.classList.remove("active-link2");
    }
    for(tabcontent of tabcontents2){
        tabcontent.classList.remove("active-tab2");
    }
    event.currentTarget.classList.add("active-link2");
    document.getElementById(tabname).classList.add("active-tab2");
}

/* ========================== Carousel In Achievements Tab Located In Portfolio Section ========================== */
const track = document.getElementById("slider");

const handleOnDown = (e) => 
    track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth;

    if (!isNaN(mouseDelta) && !isNaN(maxDelta)) {
        const percentage = (mouseDelta / maxDelta) * -100;
        const prevPercentage = parseFloat(track.dataset.prevPercentage) || 0;
        const nextPercentageUnconstrained = prevPercentage + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -70);

        track.dataset.percentage = nextPercentage;

        track.animate(
            { transform: `translateX(${nextPercentage}%)` },
            { duration: 1200, fill: "forwards" }
        );
    }
}

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

/* ========================== Side Menu Script From Small Screen ========================== */
var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}

/* ========================== Background Image Animation ========================== */
/*          *     .        *  .    *    *   . 
 .  *  move your mouse to over the stars   .
 *  .  .   change these values:   .  *
   .      * .        .          * .       */
const STAR_COLOR = '#fff';
const STAR_SIZE = .5;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8;

const canvas = document.querySelector( 'canvas' ),
        context = canvas.getContext( '2d' );

let scale = 1, // device pixel ratio
    width,
    height;

let stars = [];

let pointerX,
    pointerY;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

function generate() {

    for( let i = 0; i < STAR_COUNT; i++ ) {
    stars.push({
        x: 0,
        y: 0,
        z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
    });
    }

}

function placeStar( star ) {

    star.x = Math.random() * width;
    star.y = Math.random() * height;

}

function recycleStar( star ) {

    let direction = 'z';

    let vx = Math.abs( velocity.x ),
        vy = Math.abs( velocity.y );

    if( vx > 1 || vy > 1 ) {
    let axis;

    if( vx > vy ) {
        axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
    }
    else {
        axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
    }

    if( axis === 'h' ) {
        direction = velocity.x > 0 ? 'l' : 'r';
    }
    else {
        direction = velocity.y > 0 ? 't' : 'b';
    }
    }
    
    star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );

    if( direction === 'z' ) {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
    }
    else if( direction === 'l' ) {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
    }
    else if( direction === 'r' ) {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
    }
    else if( direction === 't' ) {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
    }
    else if( direction === 'b' ) {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
    }

}

function resize() {

    scale = window.devicePixelRatio || 1;

    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    stars.forEach( placeStar );

}

function step() {

    context.clearRect( 0, 0, width, height );

    update();
    render();

    requestAnimationFrame( step );

}

function update() {

    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += ( velocity.tx - velocity.x ) * 0.8;
    velocity.y += ( velocity.ty - velocity.y ) * 0.8;

    stars.forEach( ( star ) => {

    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    star.x += ( star.x - width/2 ) * velocity.z * star.z;
    star.y += ( star.y - height/2 ) * velocity.z * star.z;
    star.z += velocity.z;
    
    // recycle when out of bounds
    if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
        recycleStar( star );
    }

    } );

}

function render() {

    stars.forEach( ( star ) => {

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.5 + 0.5*Math.random();
    context.strokeStyle = STAR_COLOR;

    context.beginPath();
    context.moveTo( star.x, star.y );

    var tailX = velocity.x * 2,
        tailY = velocity.y * 2;

    // stroke() wont work on an invisible line
    if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
    if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;

    context.lineTo( star.x + tailX, star.y + tailY );

    context.stroke();

    } );

}

function movePointer( x, y ) {

    if( typeof pointerX === 'number' && typeof pointerY === 'number' ) {

    let ox = x - pointerX,
        oy = y - pointerY;

    velocity.tx = velocity.tx + ( ox / 8*scale ) * ( touchInput ? 1 : -1 );
    velocity.ty = velocity.ty + ( oy / 8*scale ) * ( touchInput ? 1 : -1 );

    }

    pointerX = x;
    pointerY = y;

}

function onMouseMove( event ) {

    touchInput = false;

    movePointer( event.clientX, event.clientY );

}

function onTouchMove( event ) {

    touchInput = true;

    movePointer( event.touches[0].clientX, event.touches[0].clientY, true );

    event.preventDefault();

}

function onMouseLeave() {

    pointerX = null;
    pointerY = null;

}

/* ========================== Scroll Animation ========================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));