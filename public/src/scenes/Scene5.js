import camera from "../basic/Camera.js";
import light from "../basic/Light.js";
import loopMachine from "../basic/LoopMachine.js";
import renderer from "../basic/Renderer.js";
import scene from "../basic/Scene.js";
import cube from "../basic/shapes/Cube.js";
import terrain from "../basic/terrain/Terrain.js";
import skyTexture from "../images/SkyTexture.js";

class Scene5 {
    open(sceneHandler) {
        this.sceneHandler = sceneHandler
        scene.add(cube)
        scene.add(light)
        camera.position.set(50,150,150)
        camera.lookAt(0,0,0)
        scene.background = skyTexture
        terrain.start(scene)
        loopMachine.addCallback(this.render);
        loopMachine.start()
    }
    render = () => {
        terrain.tick(cube)
        renderer.render(scene, camera)
    }
    next = (e) => {
        this.sceneHandler.goTo('menu')
        e.preventDefault()
        e.stopPropagation()
    }
    close() {
        loopMachine.stop()
        console.error('CLOSED Scene5');
    }
}

// const scene5 = new Scene5()

// export default scene5

export default Scene5