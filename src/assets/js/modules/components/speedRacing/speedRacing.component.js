import { $ } from "../../core/Dom";
import { GameComponent } from "../../core/GameComponent";
import { getRand } from "../../core/utils";
import { getGameTemplate } from "./speedRacing.template";

export class SpeedRacing extends GameComponent {
    constructor($el) {
        super($el, {
            name: 'speedRacing',
            listeners: ['click'],
            docListeners: ['keydown', 'keyup'],
        })
        
        this.$el = $($el);
        this.$car = null;
        this.gameArea = null;
    }

    render() {
        this.$el.html(getGameTemplate());
    }

    onClick(e) {
        if (e.target.dataset.start) {
            e.target.classList.add('hide');

            this.$car = $.create('div', 'car');
            this.gameArea = this.$el.appendTo(this.$car, '.game__area');

            this.gameArea.classList.remove('hide');

            startGame.call(this);
        }
    }

    onKeydown(e) {
        e.preventDefault();
        keyDown(e.key);
    }

    onKeyup(e) {
        e.preventDefault();
        keyUp(e.key);
    }
}

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}

const gameData = {
    start: false,
    score: 0,
    speed: 4,
    traffic: 2.5,
}

const MAX_CARS_NUM = 7;

const keyDown = pressedKey => {
    if(keys.hasOwnProperty(pressedKey)) {
        keys[pressedKey] = true;
    }
}

const keyUp = pressedKey => {
    if(keys.hasOwnProperty(pressedKey)) {
        keys[pressedKey] = false;
    }
}

function startGame() {
    gameData.start = true;
    gameData.x = this.$car.$el.offsetLeft;
    gameData.y = this.$car.$el.offsetTop;

    createRoadLines.call(this);
    createEnemies.call(this);
    
    playGame.call(this);
}

function playGame() {
    if (gameData.start) {
        moveRoad.call(this);
        moveEnemy.call(this);

        if (keys.ArrowLeft && gameData.x > 0) {
            gameData.x -= gameData.speed;
        } 

        if (keys.ArrowUp && gameData.y > 0) {
            gameData.y -= gameData.speed;
        }

        if (keys.ArrowDown && gameData.y < (this.gameArea.offsetHeight - this.$car.$el.offsetHeight - 10)) {
            gameData.y += gameData.speed;
        }

        if (keys.ArrowRight && gameData.x < (this.gameArea.offsetWidth - this.$car.$el.offsetWidth)) {
            gameData.x += gameData.speed;
        }

        this.$car.css('left', gameData.x + 'px')
        this.$car.css('top', gameData.y + 'px')

        requestAnimationFrame(playGame.bind(this))
    }
}

const roadLines = [];
const enemyCars = [];

function getQuantityLineElements(lineHeight) {
    return this.gameArea.clientHeight / lineHeight + 1;
}

function createRoadLines() {
    const linesNum = getQuantityLineElements.call(this, 100);
    for (let i = 0; i < linesNum; i++) {
        const line = $.create('div', 'line');

        line.y = i * 100;
        line.css('top', line.y + 'px');
        this.$el.appendTo(line, '.game__area');

        roadLines.push(line);
    }
}

function createEnemies() {
    const enemyNum = getQuantityLineElements.call(this, (100 * gameData.traffic));
    
    for (let i = 0; i < enemyNum; i++) {
        const enemy = $.create('div', 'enemy');

        enemy.y = -100 * gameData.traffic * (i + 1);
        enemy.css('top', enemy.y + 'px');
        enemy.css('left', getRand(10, this.gameArea.offsetWidth - 50) + 'px');
        enemy.css('background', `transparent 
            url("assets/images/enemy${getRand(1, MAX_CARS_NUM)}.png") 
            center / cover no-repeat`);
        this.$el.appendTo(enemy, '.game__area');

        enemyCars.push(enemy);
    }
}

function moveRoad() {
    roadLines.forEach(line => {
        line.y += gameData.speed;

        if(line.y > this.gameArea.clientHeight) {
            line.y = -100;
        }

        line.css('top', line.y + 'px');
    })
}

function moveEnemy() {
    enemyCars.forEach(car => {
        car.y += gameData.speed / 2;

        if(car.y > this.gameArea.clientHeight) {
            car.y = -200 * gameData.traffic;
            car.css('left', getRand(50, this.gameArea.offsetWidth - 50) + 'px');
        }

        car.css('top', car.y + 'px');
    })
}