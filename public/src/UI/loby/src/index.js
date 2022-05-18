import getComponent from "../../../../js/FunctionalComponent.js"
import foleLoader from "../../../basic/FileLoader.js"

import main from "./components/Main.js"
class Loby {
    constructor() {

    }
    start(){
        getComponent(main).kiwiSelector('body')
        foleLoader('src/UI/loby/src/components/Main.css','css')
    }
    stop(){
        console.log('stop')
    }
}

const loby = new Loby()

export { Loby }
export default Loby