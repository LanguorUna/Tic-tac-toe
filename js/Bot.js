class Bot{
    /**
     * 
     * @param {*} field 
     */
    constructor(field){
        this.field = field;
    }

    /**
     * Возвращает ячейку 
     */
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

    /**
     * Возвращает наиболее выгодную ячейку
     * @param {*} flag - если флаг равен 0, 
     * ищем два раза повторяющихся нолика и свободную ячейку для хода,
     * если флаг равен 1, 
     * ищем два раза повторяющихся крестика и свободную ячейку для хода,
     */
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

    /**
     * Возвращает наиболее выгодную ячейку в строке
     * @param {*} flag - если 1 - крестик, если 0 - нолик
     * ищем два раза повторяющихся символа и свободную ячейку для хода 
     */
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

    /**
     * Возвращает наиболее выгодную ячейку в столбце
     * @param {*} flag - если 1 - крестик, если 0 - нолик
     * ищем два раза повторяющихся символа и свободную ячейку для хода 
     */
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

    /**
     * Возвращает наиболее выгодную ячейку по диагонали
     * @param {*} flag - если 1 - крестик, если 0 - нолик
     * ищем два раза повторяющихся символа и свободную ячейку для хода 
     */
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

    /**
     * Возвращает угловую ячейку для хода 
     */
    getAngle(){
        const angles = [[0,0],[0,2],[2,0],[2,2]];
        let index;
        
        do{
            index = Math.trunc(Math.random()*10) % 4;
        } while(this.field.field[angles[index][0]][angles[index][1]] !== "")

        return { row: angles[index][0], column: angles[index][1] };
    }
    /**
     * Проверка заняты ли все углы
     */
    isBusyAngles(){
        return (this.field.field[0][0] !== "") && (this.field.field[0][2] !== "") && (this.field.field[2][0] !== "") && (this.field.field[2][2] !== "");
    }

    /**
     * Возвращает рандомный ход
     */
    getRandomStep(){
        let row, column;
        do{
            row = Math.trunc(Math.random()*10) % 3;
            column = Math.trunc(Math.random()*10) % 3;
        }while(this.field.field[row][column]!== "");

        return {row: row, column: column};
    }

}