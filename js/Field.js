class Field {
    /**
     * 
     * @param {*} table 
     */
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

    /**
     * Проверка была ли победа за этот ход
     */
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

    /**
     * Проверка заполнена ли строка одинаковыми символами
     */
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

    /**
     * Проверка заполнен ли столбец одинаковыми символами
     */
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

    /**
     * Проверка заполнена ли диагональ одинаковыми символами
     */
    checkDiagonal(){
        if((this.field[0][0] === this.field[1][1]) && (this.field[0][0] === this.field[2][2]) && (this.field[0][0] !== "")){
            return {x1: 0, y1: 0, x2: 1, y2: 1, x3: 2, y3: 2};
        }1

        if((this.field[0][2] === this.field[1][1]) && (this.field[0][2] === this.field[2][0]) && (this.field[0][2] !== "")){
            return {x1: 0, y1: 2, x2: 1, y2: 1, x3: 2, y3: 0};
        }

        return false;
    }

    /**
     * Отрисовка столбца в случае победы
     * @param {*} column 
     */
    drawVinVertical(column){
        for (let i = 0; i < 3; i++) {
            this.table.rows[i].cells[column].classList.add("field__cell__win");
        }
    }

    /**
     * Отрисовка строки в случае победы
     * @param {*} row 
     */
    drawVinHorizontal(row){
        for (let j = 0; j < 3; j++) {
            this.table.rows[row].cells[j].classList.add("field__cell__win");
        }
    }

    /**
     * Отрисовка диагонали в случае победы
     * @param {*} diagonal 
     */
    drawVinDiagonal(diagonal){
        this.table.rows[diagonal.x1].cells[diagonal.y1].classList.add("field__cell__win");
        this.table.rows[diagonal.x2].cells[diagonal.y2].classList.add("field__cell__win");
        this.table.rows[diagonal.x3].cells[diagonal.y3].classList.add("field__cell__win");
    }

    /**
     * Проверка свляется ли поле пустым 
     */
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

    /**
     * Проверка свляется ли поле заполненным 
     */
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