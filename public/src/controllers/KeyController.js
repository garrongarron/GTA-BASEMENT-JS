import keyCode from "../basic/KeyCode.js"
import keyListener, { KeyListener } from "../basic/KeyListener.js"
import spawner from "../scenes/files-scene4/Spawner.js"
import broadcaster from "../services/Broadcaster.js"
import nick from "../services/nick.js"
import fallingController from "./FallingController.js"
import { mode } from "./ModeController.js"

class KeyController {
    constructor(peerId) {
        this.state = null
        this.peerId = peerId
        this.keyListener = peerId == nick ? keyListener : new KeyListener()
        if (this.peerId == nick) {
            this.keyListener.setCaster((params) => {
                const [keyCode, flag, keys] = params
                broadcaster.send({ keyListenerEvent: { keyCode, flag, keys } })
            })
        } else {
            // this.keyListener.start()
            this.keyListener.setCaster(() => { })
        }
    }
    init(characterController) {
        this.state = characterController.state
        this.state['translation'] = { x: 0, y: 0 }
        this.state['rotation'] = { y: 0 }
        this.state['angle'] = { y: 0 }
        this.state['mode'] = mode.IDLE
    }

    tick() {
        this.state.rotation.y = 0
        this.state.angle.y = 0

        if (this.keyListener.isPressed(keyCode.SHIFT) && this.state.mode != mode.FALLING) this.state.mode = mode.SHOOTER

        //falling
        if (this.keyListener.isPressed(keyCode.KEY_P)) this.state.mode = mode.FALLING
        
        

        // if (this.state.mode == mode.DEATH) return
        // if (this.state.mode == mode.HITTED) return
        
        this.state.translation.x = 0
        this.state.translation.y = 0

        if (this.keyListener.isPressed(keyCode.KEY_W)) this.state.translation.y = 1
        if (this.keyListener.isPressed(keyCode.KEY_S)) this.state.translation.y = -1
        if (this.keyListener.isPressed(keyCode.KEY_A)) this.state.translation.x = 1
        if (this.keyListener.isPressed(keyCode.KEY_D)) this.state.translation.x = -1
        // if (keyListener.isPressed(keyCode.KEY_A)) this.state.rotation.y = 1
        // if (keyListener.isPressed(keyCode.KEY_D)) this.state.rotation.y = -1

        if (this.keyListener.isPressed(keyCode.LEFT_ARROW)) this.state.angle.y = 1
        if (this.keyListener.isPressed(keyCode.RIGHT_ARROW)) this.state.angle.y = -1
        // if (keyListener.isPressed(keyCode.LEFT_ARROW)) this.state.angle.y = 1
        // if (keyListener.isPressed(keyCode.RIGHT_ARROW)) this.state.angle.y = -1
        
        
    }
}

const keyController = new KeyController()

export default keyController

export { KeyController }