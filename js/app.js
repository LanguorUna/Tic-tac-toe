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
                if (this.field[x][y] == '') {
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
    drawStep(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.field[i][j] == 1) {
                    this.table.rows[i].cells[j].innerHTML = '<div class="field__cell">X</div>';
                }
                if (this.field[i][j] === 0) {
                    this.table.rows[i].cells[j].innerHTML = '<div class="field__cell">O</div>';
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
        table.innerHTML = rows;
    }

    isWin(){
        if(this.checkHorizontal()){
            return true;
        }
        if(this.checkVertical()){
            return true;
        }
        if(this.checkDiagonal()){
            return true;
        }

        return false;
    }

    checkHorizontal(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
               if( (this.field[i][j] == this.field[i][j + 1]) && (this.field[i][j] != "")){
                   if(this.field[i][j] == this.field[i][j + 2]){
                       return true;
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
               if( (this.field[i][j] == this.field[i + 1][j]) && (this.field[i][j] != "")){
                   if(this.field[i][j] == this.field[i + 2][j]){
                       return true;
                   }
               }
               break; 
            }     
        }
        return false;
    }

    checkDiagonal(){
        if((this.field[0][0] == this.field[1][1]) && (this.field[0][0] == this.field[2][2]) && (this.field[0][0] != "")){
            return true;
        }

        if((this.field[0][2] == this.field[1][1]) && (this.field[0][2] == this.field[2][0]) && (this.field[0][2] != "")){
            return true;
        }

        return false;
    }
}

class Game{
    constructor(table,score) {
        this.field = new Field(table);
        this.table = table;
        this.score = score;

        this.scorePlayer = 0;
        this.scoreBot = 0;
        
        this.currentPlayer = 'user';
        
    }

    prepareFields() {
       /* if (this.timer) {
            clearTimeout(this.timer);
        }*/
        this.field.clear();

        this.field.draw();

        this.table.addEventListener("click", this.stepPlayer.bind(this));

    }
    prepareStepPlayer() {

    }

    stepPlayer(event) {
        if (this.currentPlayer == 'user') {
            let fieldCell = event.target
            let cell = fieldCell.parentElement;
            if (cell.tagName.toLowerCase() != 'td')
                return;
            let i = cell.parentNode.rowIndex;
            let j = cell.cellIndex;

            if (this.field.marker(i,j,1)) {
                this.field.drawStep();
            }
        }

        if(this.field.isWin()){
            this.win();
        }
    }

    win(){
        if(this.currentPlayer == 'user'){
            ++this.scorePlayer;
            this.score.innerHTML = this.scorePlayer + " - " + this.scoreBot;
        }
    }
}

const table = document.querySelector('.field');
const score = document.querySelector('.score');
const game = new Game(table,score);
game.prepareFields();