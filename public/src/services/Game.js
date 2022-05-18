const gameStatus = {
    NONE:"NONE",
    INGAME:"INGAME",
}

class Game {
    constructor() {
        this.state = 'none'
    }
    setState(state){
        this.state = state
    }
    getState(){
        return this.state
    }
}

const game = new Game()

export default game

export { Game, gameStatus }
