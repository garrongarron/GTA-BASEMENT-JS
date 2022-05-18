import { canvas } from "../basic/Renderer.js";
import loby from "../UI/loby/Loby.js";

class Scene2 {
    
    open(sceneHandler) {
        this.sceneHandler = sceneHandler
        console.log('hola start()', this);
        loby.start()
        // canvas.addEventListener('click', this.next)
    }
    next = (e) =>{
        this.sceneHandler.goTo('settings')
        e.preventDefault()
        e.stopPropagation()
    }
    close(){
        loby.stop()
        canvas.removeEventListener('click', this.next)
        console.error('CLOSED Scene2');
    }
}

// const scene1 = new Scene1()

// export default scene1

export default Scene2