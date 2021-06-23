const $score = document.querySelector('.score');
const $start = document.querySelector('.game__start');
const $gameArea = document.querySelector('.game__area');
const car = document.createElement('div')

car.classList.add('car')

$start.addEventListener('click', startGame)

document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stopRun)

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}

const setting = {
    start: false,
    score: 0,
    speed: 3,
}

function startGame(e) {
    $start.classList.add('hide')
    setting.start = true
    $gameArea.appendChild(car)
    requestAnimationFrame(playGame)
}

function playGame() {
    console.log('Play Game');
    if (setting.start) {
        requestAnimationFrame(playGame)
    }
}

function startRun(e) {
    e.preventDefault();
    keys[e.key] = true;

    console.log(keys);
}

function stopRun(e) {
    e.preventDefault();
    keys[e.key] = false;
}