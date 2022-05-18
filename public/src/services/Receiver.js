import { mode } from "../controllers/ModeController.js";
import hpSystem from "../scenes/files-scene4/HPSystem.js";
import spawner from "../scenes/files-scene4/Spawner.js";
import sceneHandler from "../scenes/SceneHandler.js";
import game, { gameStatus } from "./Game.js";
import nick from "./nick.js";

class Receiver {
    constructor() {
        this.message = null
    }
    receive(payload, peerId) {
        this.message = payload.game
        // console.log(JSON.stringify(payload));
        if (this.message.hasOwnProperty('command')) {
            if (this.message.command == 'START') {
                sceneHandler.goTo('settings')
                game.setState(gameStatus.INGAME)
            }
        }
        if (this.message.hasOwnProperty('statusGame')) {
            if (this.message.statusGame == gameStatus.INGAME) {
                if(game.getState() != gameStatus.INGAME) sceneHandler.goTo('settings')
                game.setState(gameStatus.INGAME)
            }
        }
        if (spawner.getCustomController(peerId)) {
            if (this.message.hasOwnProperty('keyListenerEvent')) {
                // console.log(this.message.keyListenerEvent.keys);
                const customController = spawner.getCustomController(peerId)
                customController.keyController.keyListener.keys = this.message.keyListenerEvent.keys
            }
            if (this.message.hasOwnProperty('mouse')) {
                const customController = spawner.getCustomController(peerId)
                customController.mouseController.setMouse(this.message.mouse)
                // console.log(this.message.mouse)
            }
            if (this.message.hasOwnProperty('target')) {
                const customController = spawner.getCustomController(peerId)
                customController.rayCasterController.setTarget(this.message.target)
            }
            if (this.message.hasOwnProperty('position')) {
                const customController = spawner.getCustomController(peerId)
                customController.characterController.character.position.set(
                    this.message.position[0],
                    this.message.position[1],
                    this.message.position[2]
                )
            }
            if (this.message.hasOwnProperty('shot')) {
                const customController = spawner.getCustomController(peerId)
                // customController.rayCasterController.setTarget(this.message.shot)
                customController.weaponController.shot()
            }
            if (this.message.hasOwnProperty('die')) {
                console.log(this.message);
                spawner.getCustomController(this.message.die).characterController.state.mode = mode.DEATH
            }
            if (this.message.hasOwnProperty('headShot')) {
                console.log(this.message);
                spawner.getCustomController(this.message.headShot).characterController.state.mode = mode.HITTED
                //from remote
                spawner.getCustomController(this.message.headShot).hPController.addValue(-20)
                
            }
            
            if (this.message.hasOwnProperty('mouseEvent')) {
                // const customController = spawner.getCustomController(peerId)
                spawner.getCustomController(peerId).remoteController.setCRotation(this.message.mouseEvent.cRotation)
            }
        }


    }
}

const receiver = new Receiver()

export default receiver

export { Receiver }