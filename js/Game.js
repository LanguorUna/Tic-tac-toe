class Game{
    /**
     * 
     * @param {*} table 
     * @param {*} score 
     * @param {*} history 
     * @param {*} gameStep 
     */
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

    /**
     * Подготовка игры
     */
    prepare() {
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

    /**
     * Подготовка хода игрока
     */
    prepareStepPlayer() {
        this.gameStep.innerHTML = "Ваш ход!";
        this.currentPlayer = 'user';
    }

    /**
     * Подготовка хода бота
     */
    prepareStepBot() {
        this.gameStep.innerHTML = "Ждите...";
        this.currentPlayer = 'bot';
        this.timer = setTimeout(this.stepBot.bind(this), 2000)
    }

    /**
     * Ход игрока
     * @param {*} event 
     */
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

    /**
     * Ход бота
     */
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

    /**
     * Победа в игре
     */
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

    /**
     * Добавление исхода игры в компонент история
     * @param {*} result 
     */
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

    /**
     * Завершение игры
     */
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