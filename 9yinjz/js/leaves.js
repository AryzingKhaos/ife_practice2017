/* Define the number of leaves to be used in the animation */
var NUMBER_OF_LEAVES = 11;
var core = '';

userAgent();
init();

/* Called when the "Falling Leaves" page is completely loaded.*/
function init() {
    /* Get a reference to the element that will contain the leaves */
    var container = document.getElementById('leafContainer');
    /* Fill the empty container with new leaves */
    for (var i = 1; i < NUMBER_OF_LEAVES; i++) {
        container.appendChild(createALeaf());
    }
}


/* Receives the lowest and highest values of a range and
    returns a random integer that falls within that range.*/
function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low));
}

/* Receives the lowest and highest values of a range and
   returns a random float that falls within that range.*/
function randomFloat(low, high) {
    return low + Math.random() * (high - low);
}


/* Receives a number and returns its CSS pixel value.*/
function pixelValue(value) {
    return value + 'px';
}
function remValue(value){
    return value+'rem';
}

/*Returns a duration value for the falling animation.*/

function durationValue(value) {
    return value + 's';
}

/* Uses an img element to create each leaf. "Leaves.css" implements two spin
    animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
    function determines which of these spin animations should be applied to each leaf.*/
function createALeaf() {
    /* Start by creating a wrapper div, and an empty img element */
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');
    // console.log(core)
    /* Randomly choose a leaf image and assign it to the newly created element */
    // image.src = 'http://9yinsy.woniu.com/static/web201605/images/flower/flower-' + randomInteger(1, NUMBER_OF_LEAVES) + '.png';
    image.src = './images/flower' + randomInteger(1, NUMBER_OF_LEAVES) + '.png';

    leafDiv.style.top = "-150px";

    /* Position the leaf at a random location along the screen */
    leafDiv.style.left = remValue(randomFloat(-5, 5));

    /* Randomly choose a spin animation */
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    // var spinAnimationName = 'linemove';

    /* Set the -webkit-animation-name property with these values */
    if (core == 0) {
        leafDiv.style.webkitAnimationName = 'fade, drop';
        image.style.webkitAnimationName = spinAnimationName;
    }else{
        leafDiv.style.animationName = 'fade, drop';
        image.style.animationName = spinAnimationName;
    }
    // speed
    /* Figure out a random duration for the fade and drop animations */
    var fadeAndDropDuration = durationValue(randomFloat(4, 8));
    // 间距
    /* Figure out another random duration for the spin animation */
    var spinDuration = durationValue(randomFloat(0.5, 2));
    /* Set the -webkit-animation-duration property with these values */
    if (core == 0) {
        // console.log('web')
        leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
    }else{
        // console.log('ff')
        leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
    }
    // value
    var leafDelay = durationValue(randomFloat(0, 4));
    // ff
    if (core == 0) {
        leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
        image.style.webkitAnimationDuration = spinDuration;
    }else{
        leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
        image.style.animationDuration = spinDuration;
    }
    // add the <img> to the <div>
    leafDiv.appendChild(image);

    /* Return this img element so it can be added to the document */
    return leafDiv;
}

/* Calls the init function when the "Falling Leaves" page is full loaded */
// window.addEventListener('load', init, false);
// support webkit
// 显示浏览器版本
function userAgent(){
    var agent = navigator.userAgent.toLowerCase();
    if(agent.indexOf(' applewebkit/') > -1){
        core = 0;
        // console.log(agent)
    }else{
        core = 1;
        // console.log(agent)
    }
}
