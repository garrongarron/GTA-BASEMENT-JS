import sounds from "../../sounds/Audios.js";
import camera from "../basic/Camera.js";
import keyListener from "../basic/KeyListener.js";
import light from "../basic/Light.js";
import loopMachine from "../basic/LoopMachine.js";
import mouse from "../basic/Mouse.js";
import renderer, { canvas } from "../basic/Renderer.js";
import resize from "../basic/Resize.js";
import scene from "../basic/Scene.js";
import plane from "../basic/shapes/Plane.js";
import ray, { getRay } from "../basic/shapes/Ray.js";
import sky from "../basic/shapes/Sky.js";
import skyTexture from "../images/SkyTexture.js";
import gun from "../models/gun/Gun.js";
import getXbotModel from '../models/xbot/XbotTest.js'
import info from "../UI/Info.js";
import mira from "../UI/Mira.js";
import nextBtn from "../UI/NextScene.js";
import customController from "./files-scene1/CustomController.js";

const cache = document.createElement('div')
class Scene1 {
    open(sceneHandler) {
        this.sceneHandler = sceneHandler
        scene.add(plane);
        scene.add(light);
        scene.add(ray);
        scene.add(sky);
        scene.background = skyTexture;
        loopMachine.addCallback(this.render);
        loopMachine.start()
        // camera.position.set(2, 2, 2)
        const promises = [gun(), getXbotModel()]
        Promise.all(promises).then(promiseArray => {
            const gunModel = promiseArray[0]
            gunModel.position.set(0, 0, 0)
            gunModel.rotation.set(0, 0, 0)
            this.model = promiseArray[1]
            this.model.position.set(0, 0, 0)
            this.model.rotation.set(0, 0, 0)
            scene.add(this.model)
            customController.start(this.model, gunModel)
        })

        document.body.appendChild(nextBtn)
        nextBtn.addEventListener('click', this.next)
        mouse.setCanvas(canvas)
        mouse.start()
        keyListener.start()
        resize.start(renderer)
        document.body.appendChild(mira)
        document.body.appendChild(info)
        this.background = false
        document.addEventListener('click', () => {
            if (this.background) return
            this.background = true
            sounds.setAsLoop('background')
            // sounds.play('background')
            sounds.setVolume('background', .25)
        })
    }
    render = () => {
        renderer.render(scene, camera)
    }
    next = (e) => {
        this.sceneHandler.goTo('menu')
        e.preventDefault()
        e.stopPropagation()
    }
    close() {
        this.background = false
        sounds.stop('background')
        customController.stop()
        nextBtn.removeEventListener('click', this.next)
        mouse.stop()
        cache.appendChild(nextBtn)
        cache.appendChild(mira)
        cache.appendChild(info)
        scene.remove(plane);
        scene.remove(light);
        scene.remove(ray);
        scene.remove(sky);
        scene.remove(this.model)
        keyListener.stop()
        setTimeout(() => {
            loopMachine.removeCallback(this.render)
            loopMachine.stop()
        }, 100);
        console.error('CLOSED Scene1');
    }
}

// const scene1 = new Scene1()

// export default scene1

export default Scene1