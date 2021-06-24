export function getGameTemplate() {
    return `
        <div class="game">
            <div class="game__start">
                <div id="select"></div>
            </div>
            <div class="game__area hide"></div>
        </div>
    `
}

// <div class="game__start" data-start="start">Нажми, чтобы начать игру!</div>