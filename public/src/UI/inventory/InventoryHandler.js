import eventBus from "../../basic/EventBus.js"
import keyCode from "../../basic/KeyCode.js"
import inventorySystem from "./InventorySystem.js"

class InventoryHandler {
    constructor() {
        this.ready = false
        this.slots = {}
    }
    start() {
        inventorySystem.start().then(() => {
            console.log('inventory started')
            this.ready = true
            this.slots = {
                'slot-1': document.querySelector('.slot-1'),
                'slot-2': document.querySelector('.slot-2'),
                'slot-3': document.querySelector('.slot-3'),
                'slot-4': document.querySelector('.slot-4')
            }
        })
        eventBus.subscribe('keyListener', (params) => {
            if (!this.ready) return
            const [keyCodeParam, flag, keys] = params
            if (!flag) return
            if (keyCodeParam == keyCode.KEY_1) {
                this.slots['slot-1'].style = "background-image: url('src/UI/inventory/img/2.png')" ;
                console.log(this.slots['slot-1']);
            }
            if (keyCodeParam == keyCode.KEY_2) {
                console.log(this.slots['slot-2']);
            }
            if (keyCodeParam == keyCode.KEY_3) {
                console.log(this.slots['slot-3']);
            }
            if (keyCodeParam == keyCode.KEY_4) {
                console.log(this.slots['slot-4']);
            }
        })
    }

    stop() {
        inventorySystem.stop()
        this.ready = false
    }
}

const inventoryHandler = new InventoryHandler()

export default inventoryHandler

export { InventoryHandler }