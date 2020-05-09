/**
 * Запуск игры
 * @param {*} event 
 */
function start(event){
    game.prepare();
}

const table = document.querySelector('.field');
const score = document.querySelector('.game__score');
const history = document.querySelector('.game__history');
const gameStep = document.querySelector('.game__step');
const game = new Game(table,score,history,gameStep);
start();

window.onload = () => {
    const button = document.querySelector('.restart');
    button.addEventListener("click", start);
}