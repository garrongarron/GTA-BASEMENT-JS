import camera from "../basic/Camera.js";
import light from "../basic/Light.js";
import loopMachine from "../basic/LoopMachine.js";
import renderer, { canvas } from "../basic/Renderer.js";
import resize from "../basic/Resize.js";
import scene from "../basic/Scene.js";
import plane from "../basic/shapes/Plane.js";
import skyTexture from "../images/SkyTexture.js";
import settings from "../UI/settings/Settings.js";
import nextBtn from "../UI/NextScene.js"
import cache from "../basic/Cache.js";

class Scene3 {
    open(sceneHandler) {
        this.sceneHandler = sceneHandler
        scene.add(plane);
        scene.add(light);
        scene.background = skyTexture;
        loopMachine.addCallback(this.render);
        loopMachine.start()
        settings.start()
        console.error('Scene3 start()', this);
        resize.start(renderer)
        setTimeout(() => {
            document.body.appendChild(nextBtn)
            nextBtn.innerHTML = 'Next Scene'
            nextBtn.removeEventListener('click', this.next)
            nextBtn.addEventListener('click', this.next)
        }, 500);
    }
    render = () => {
        renderer.render(scene, camera)
    }
    next = (e) => {
        this.sceneHandler.goTo('game')
        e.preventDefault()
        e.stopPropagation()
    }
    close() {
        settings.stop()
        scene.remove(plane);
        scene.remove(light);
        cache.appendChild(nextBtn)
        console.error('CLOSED Scene3');
    }
}

// const scene3 = new Scene3()

// export default scene3

export default Scene3