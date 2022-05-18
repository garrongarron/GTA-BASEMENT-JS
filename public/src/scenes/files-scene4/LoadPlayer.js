import keyListener from "../../basic/KeyListener.js"
import mouse from "../../basic/Mouse.js"
import { canvas } from "../../basic/Renderer.js"
import scene from "../../basic/Scene.js"
import gun from "../../models/gun/Gun.js"
import getXbotModel from "../../models/xbot/XbotTest.js"
import nick from "../../services/nick.js"
import mira from "../../UI/Mira.js"
import pointer from "../../UI/Pointer.js"
import { CustomController } from "../files-scene4/CustomController.js"

class LoadPlayer {
    constructor(peerId) {
        this.peerId = peerId
        this.models = []
        this.customController = null
        this.character = null
    }
    start() {
        this.models = [gun(), getXbotModel(this.peerId)]
        // document.body.appendChild(mira)
        if (this.peerId == nick) pointer.start()
        Promise.all(this.models).then(models => {
            let gunModel
            if (this.peerId == nick) {
                gunModel = models[0]
                gunModel.position.set(0, 0, 0)
                gunModel.rotation.set(0, 0, 0)
            }
            this.character = models[1]
            this.character.name = this.peerId
            this.character.position.set(0, 0, 0)
            this.character.rotation.set(0, 0, 0)
            scene.add(this.character)
            ////////////////
            this.customController = new CustomController(this.peerId)
            this.customController.start(this.character, gunModel)
        })
        if (this.peerId == nick) keyListener.start()
        if (this.peerId == nick) mouse.setCanvas(canvas)
        if (this.peerId == nick) mouse.start()
    }
    stop() {
        keyListener.stop()
        mouse.stop()
        this.customController?.stop()
    }
}

const loadPlayer = new LoadPlayer()

export default loadPlayer

export { LoadPlayer }