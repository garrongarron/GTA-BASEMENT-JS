import { mode } from "../../controllers/ModeController.js";
import nick from "../../services/nick.js";
import { SlideBar } from "../../UI/SlideBar.js";
import spawner from "./Spawner.js";

class HPSystem {
    constructor() {
        this.hp = 100
        this.n = null
        this.hpBar = new SlideBar('hp')
    }
    start(){
        this.hpBar.start()
        this.hpBar.setValue(this.hp)
        // this.n = setInterval(() => {
        //     this.hp = Math.min(100, ++this.hp)
        //     this.hpBar.setValue(this.hp)
        // }, 1000);
    }

    addValue(value){
        this.hp += value
        this.hp = Math.min(100, this.hp)
        this.hp = Math.max(0, this.hp)
        const state = spawner.getCustomController(nick).characterController.state
        if(this.hp <= 0){
            state.mode = mode.DEATH
        } else {
            state.mode = mode.HITTED
        }
        this.hpBar.setValue(this.hp)
    }

    stop(){
        clearInterval(this.n)
        this.hpBar.stop()
    }
}

const hpSystem = new HPSystem()

export default hpSystem

export { HPSystem }