import camera from "../basic/Camera.js";
import light from "../basic/Light.js";
import loopMachine from "../basic/LoopMachine.js";
import renderer from "../basic/Renderer.js";
import scene from "../basic/Scene.js";
import plane from "../basic/shapes/Plane.js";
import skyTexture from "../images/SkyTexture.js";

class SceneDefault {
    open(sceneHandler) {
        this.sceneHandler = sceneHandler
        console.log('hola start()', this);
        document.addEventListener('click', this.next)
        scene.add(plane);
        scene.add(light);
        scene.background = skyTexture;
        loopMachine.addCallback(this.render);
        loopMachine.start()
    }
    render = () => {
        renderer.render(scene, camera)
    }
    next = () => {
        this.sceneHandler.goTo('menu')
    }
    close() {
        document.removeEventListener('click', this.next)
        console.log('hola stop()');
        scene.remove(plane);
        scene.remove(light);
        loopMachine.removeCallback(this.render)
        loopMachine.stop()
    }
}

export default SceneDefault