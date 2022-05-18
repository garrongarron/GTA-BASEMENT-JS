import { LoadPlayer } from "./LoadPlayer.js"

class Spawner {
    constructor() {
        this.playerContainer = {}
    }
    createPlayer(peerId){
        if(this.playerContainer.hasOwnProperty(peerId)) return false
        this.playerContainer[peerId] =  new LoadPlayer(peerId)
        return this.playerContainer[peerId]
    }
    getPlayer(peerId){
        return this.playerContainer[peerId]
    }
    getCustomController(peerId){
        return this.playerContainer[peerId]?.customController
    }

}

const spawner = new Spawner()

export default spawner

export { Spawner }