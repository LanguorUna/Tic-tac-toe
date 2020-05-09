class Field {
    constructor(table) {
        this.clear();
        this.table = table;
    }

    /**
     * Очистка поля
     */
    clear() {
        this.field = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    }

    /**
     * Маркировка поля
     * @param {*} x 
     * @param {*} y 
     * @param {*} type если 0 - нолик, 1 - крестик
     */
    marker(x, y, type){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.field[x][y] === '') {
                    if(type == 1){
                        this.field[x][y] = 1;
                        return true;
                    }
                    if(type == 0){
                        this.field[x][y] = 0;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Отрисовка хода
     */
    drawStep(firstPlayer = 'user'){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.field[i][j] == 1) {
                    this.table.rows[i].cells[j].innerHTML = `<div class="field__cell">${firstPlayer == 'user' ? 'x' : 'o'}</div>`;
                }
                if (this.field[i][j] === 0) {
                    this.table.rows[i].cells[j].innerHTML = `<div class="field__cell">${firstPlayer == 'bot' ? 'x' : 'o'}</div>`;
                }
            }
        }
    }

    /**
     * Отрисовка поля
     */
    draw(){
        let rows = '';
        for (let i = 0; i < this.field.length; i++) {
            rows += `<tr class="field__row">`;
            for (let j = 0; j < this.field.length; j++) {
                rows += '<td><div class="field__cell"></div></td>';            
            }
            rows += '</tr>'
        }
        this.table.innerHTML = rows;
    }

    isWin(){
        let result = this.checkHorizontal();
        if(result){
            this.drawVinHorizontal(result.row);
            return true;
        }

        result = this.checkVertical();
        if(result){
            this.drawVinVertical(result.column);
            return true;
        }

        result = this.checkDiagonal();
        if(result){
            this.drawVinDiagonal(result)
            return true;
        }

        return false;
    }

    checkHorizontal(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
               if( (this.field[i][j] === this.field[i][j + 1]) && (this.field[i][j] !== "")){
                   if(this.field[i][j] === this.field[i][j + 2]){
                       return { row: i};
                   }
               }
               break; 
            }     
        }
        return false;
    }

    checkVertical(){
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 3; i++) {
               if( (this.field[i][j] === this.field[i + 1][j]) && (this.field[i][j] !== "")){
                   if(this.field[i][j] === this.field[i + 2][j]){
                       return { column: j};
                   }
               }
               break; 
            }     
        }
        return false;
    }

    checkDiagonal(){
        if((this.field[0][0] === this.field[1][1]) && (this.field[0][0] === this.field[2][2]) && (this.field[0][0] !== "")){
            return {x1: 0, y1: 0, x2: 1, y2: 1, x3: 2, y3: 2};
        }1

        if((this.field[0][2] === this.field[1][1]) && (this.field[0][2] === this.field[2][0]) && (this.field[0][2] !== "")){
            return {x1: 0, y1: 2, x2: 1, y2: 1, x3: 2, y3: 0};
        }

        return false;
    }

    drawVinVertical(column){
        for (let i = 0; i < 3; i++) {
            this.table.rows[i].cells[column].classList.add("field__cell__win");
        }
    }

    drawVinHorizontal(row){
        for (let j = 0; j < 3; j++) {
            this.table.rows[row].cells[j].classList.add("field__cell__win");
        }
    }

    drawVinDiagonal(diagonal){
        this.table.rows[diagonal.x1].cells[diagonal.y1].classList.add("field__cell__win");
        this.table.rows[diagonal.x2].cells[diagonal.y2].classList.add("field__cell__win");
        this.table.rows[diagonal.x3].cells[diagonal.y3].classList.add("field__cell__win");
    }

    isFieldEmpty(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(this.field[i][j] !== ''){
                    return false;
                }  
            }
        }
        return true;
    }

    isFieldFull(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(this.field[i][j] === ''){
                    return false;
                }  
            }
        }
        return true;
    }
}
class Bot{
    constructor(field){
        this.field = field;
    }

    getStep(){
        if(this.field.isFieldEmpty()){
            return this.getAngle();
        }
        let step;
        if(step = this.getWinStep(0) || this.getWinStep(1)){
            return step;
        }

        if(this.field.field[1][1] === ''){
            if(!this.isBusyAngles()){
                return this.getAngle();
            }

        }
        return this.getRandomStep();
    }

    getWinStep(flag){
        let step;
        if(step = this.getWinStepHorizontal(flag)){
            return step;
        }

        if(step = this.getWinStepVertical(flag)){
            return step;
        }

        if(step = this.getWinStepDiagonal(flag)){
            return step;
        }

        return false;
    }

    getWinStepHorizontal(flag){
        let countFlag;
        let countEmpty;

        let row;
        let column;

        for (let i = 0; i < 3; i++) {
            countFlag = countEmpty = 0;
            for (let j = 0; j < 3; j++) {
                if ((this.field.field[i][j] === flag)) {
                    countFlag++;
                }

                if ((this.field.field[i][j] === "")) {
                    countEmpty++;
                    row = i;
                    column = j;
                }
            }
            if((countFlag == 2) && (countEmpty == 1)){
                return {row: row, column: column};
            }
        }
        return false;

    }

    getWinStepVertical(flag){
        let countFlag;
        let countEmpty;

        let row;
        let column;

        for (let j = 0; j < 3; j++) {
            countFlag = countEmpty = 0;
            for (let i = 0; i < 3; i++) {
                if ((this.field.field[i][j] === flag)) {
                    countFlag++;
                }

                if ((this.field.field[i][j] === "")) {
                    countEmpty++;
                    row = i;
                    column = j;
                }
            }
            if((countFlag == 2) && (countEmpty == 1)){
                return {row: row, column: column};
            }
        }
        return false;

    }

    getWinStepDiagonal(flag){
        let countFlag;
        let countEmpty;

        let row;
        let column;

        countFlag = countEmpty = 0;
        for (let i = 0; i < 3; i++) {
            if ((this.field.field[i][i] === flag)) {
                countFlag++;
            }

            if ((this.field.field[i][i] === "")) {
                countEmpty++;
                row = i;
                column = i;
            }
            if((countFlag == 2) && (countEmpty == 1)){
                return {row: row, column: column};
            }
        }

        countFlag = countEmpty = 0;
        for (let i = 0; i < 3; i++) {
            if ((this.field.field[i][2 - i] === flag)) {
                countFlag++;
            }

            if ((this.field.field[i][2 - i] === "")) {
                countEmpty++;
                row = i;
                column = 2 - i;
            }
            if((countFlag == 2) && (countEmpty == 1)){
                return {row: row, column: column};
            }
        }

        return false;
    }

    getAngle(){
        const angles = [[0,0],[0,2],[2,0],[2,2]];
        let index;
        
        do{
            index = Math.trunc(Math.random()*10) % 4;
        } while(this.field.field[angles[index][0]][angles[index][1]] !== "")

        return { row: angles[index][0], column: angles[index][1] };
    }

    isBusyAngles(){
        return (this.field.field[0][0] !== "") && (this.field.field[0][2] !== "") && (this.field.field[2][0] !== "") && (this.field.field[2][2] !== "");
    }

    getRandomStep(){
        let row, column;
        do{
            row = Math.trunc(Math.random()*10) % 3;
            column = Math.trunc(Math.random()*10) % 3;
        }while(this.field.field[row][column]!== "");

        return {row: row, column: column};
    }

}
class Game{
    constructor(table,score,history,gameStep) {
        this.field = new Field(table);
        this.numberGame = 0;
        this.table = table;
        this.score = score;
        this.history = history;
        this.gameStep = gameStep;

        this.bot = new Bot(this.field);

        this.scorePlayer = 0;
        this.scoreBot = 0;
        
        this.currentPlayer = 'user';

        this.firstPlayer = 'user';

        this.table.addEventListener("click", this.stepPlayer.bind(this));

    }

    prepareFields() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.field.clear();

        this.field.draw();

        this.currentPlayer = this.firstPlayer;
        if( this.currentPlayer == "bot"){
            this.prepareStepBot();
        } else this.prepareStepPlayer();

    }

    prepareStepPlayer() {
        this.gameStep.innerHTML = "Ваш ход!";
        this.currentPlayer = 'user';
    }

    prepareStepBot() {
        this.gameStep.innerHTML = "Ждите...";
        this.currentPlayer = 'bot';
        this.timer = setTimeout(this.stepBot.bind(this), 2000)
    }

    stepPlayer(event) {
        if (this.currentPlayer == 'user') {
            let fieldCell = event.target
            let cell = fieldCell.parentElement;
            if (cell.tagName.toLowerCase() != 'td')
                return false;
            let i = cell.parentNode.rowIndex;
            let j = cell.cellIndex;

            if (this.field.marker(i,j,1)) {
                this.field.drawStep(this.firstPlayer);
                
                if(this.stop()){
                    return;
                }
                this.prepareStepBot();
            }
        }
    }

    stepBot(){
        if (this.currentPlayer == 'bot') {
            const step = this.bot.getStep();

            if(step){
                if (this.field.marker(step.row,step.column,0)) {
                    this.field.drawStep(this.firstPlayer);
                }
    
                if(this.stop()){
                    return;
                }
    
                this. prepareStepPlayer();
            }
        }
    }

    win(){
        if(this.currentPlayer == 'user'){
            ++this.scorePlayer;
            this.score.innerHTML = this.scorePlayer + " - " + this.scoreBot;
            this.currentPlayer = 'none';
            this.firstPlayer = 'user';
            this.addHistory('user');
        }
        if(this.currentPlayer == 'bot'){
            ++this.scoreBot;
            this.score.innerHTML = this.scorePlayer + " - " + this.scoreBot;
            this.currentPlayer = 'none';
            this.firstPlayer = 'bot';
            this.addHistory('bot');
        }
    }

    addHistory(result){
        let div = document.createElement('div');
        if(result == "user"){
            div.className = "game__result game__result__win";
            div.innerHTML =  this.numberGame + ". Победа! Счет: " + this.scorePlayer + "-" + this.scoreBot;
            this.gameStep.innerHTML = "Победа!";
        }
        if(result == "bot"){
            div.className = "game__result";
            div.innerHTML =  this.numberGame + ". Поражение. Счет: " + this.scorePlayer + "-" + this.scoreBot;
            this.gameStep.innerHTML = "Поражение";
        }
        if(result == "draw"){
            div.className = "game__result";
            div.innerHTML =  this.numberGame + ". Ничья. Счет: " + this.scorePlayer + "-" + this.scoreBot;
            this.gameStep.innerHTML = "Ничья";
        }
        
        this.history.append(div);
    }

    stop(){
        if(this.field.isWin()){
            ++this.numberGame;
            this.win();
            return true;

        } else if(this.field.isFieldFull()){
            ++this.numberGame;
            this.currentPlayer = 'none';
            this.addHistory('draw');
            return true;
        }

        return false;
    }
}

function start(event){
    game.prepareFields();
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