import camera from "../basic/Camera.js";
import light from "../basic/Light.js";
import loopMachine from "../basic/LoopMachine.js";
import renderer, { canvas } from "../basic/Renderer.js";
import resize from "../basic/Resize.js";
import scene from "../basic/Scene.js";
import plane from "../basic/shapes/Plane.js";
import skyTexture from "../images/SkyTexture.js";
import nextBtn from "../UI/NextScene.js"
import cache from "../basic/Cache.js";
// import hpSystem from "./files-scene4/HPSystem.js";
// import cube from "../basic/shapes/Cube.js";
import spawner from "./files-scene4/Spawner.js";
import Stats from "../basic/Stats.js";
import loadTrees from "../models/Trees/TreeSpawner.js";
import gunBar from "../UI/GunBar.js";
import sky from "../basic/shapes/Sky.js";
import { xbotContainer } from "../models/xbot/XbotTest.js";
import nick from "../services/nick.js";
import terrain from "../basic/terrain/Terrain.js";
import inventoryHandler from "../UI/inventory/InventoryHandler.js";



let stats = new Stats();
class Scene4 {
    open(sceneHandler) {
        console.log("Scene4 start()");
        this.sceneHandler = sceneHandler

        document.body.appendChild(stats.dom);
        // scene.add(plane);
        terrain.start(scene).then(()=>{
            loadTrees(scene);
        })
        scene.add(light);
        // cube.position.z = 5
        // scene.add(cube);
        scene.add(sky);

        scene.background = skyTexture;
        loopMachine.addCallback(this.render);
        loopMachine.start()
        inventoryHandler.start()
        const players = JSON.parse(localStorage.getItem('players') || '[]')
        players.forEach(peerId => {
            let player = spawner.createPlayer(peerId)
            if (player) {
                player.start()
            }
        })
        Promise.all(Object.values(xbotContainer)).then(models => {
            setTimeout(() => {
                spawner.getCustomController(nick).rayCasterController.updateArray()
            }, 2000);
        })
        camera.position.set(2, 2, 2)
        console.log('Scene4 start()', this);
        resize.start(renderer)
        // hpSystem.start()
        gunBar.start()
        setTimeout(() => {
            document.body.appendChild(nextBtn)
            nextBtn.innerHTML = 'Settings'
            nextBtn.removeEventListener('click', this.next)
            nextBtn.addEventListener('click', this.next)
        }, 500);
    }
    render = () => {
        stats.update();
        renderer.render(scene, camera)
    }
    next = (e) => {
        this.sceneHandler.goTo('settings')
        e.preventDefault()
        e.stopPropagation()
    }
    close() {
        scene.remove(plane);
        scene.remove(light);
        cache.appendChild(nextBtn)
        cache.appendChild(stats.dom)
        // loadPlayer.stop()
        // hpSystem.stop()
        console.error('CLOSED Scene4');
    }
}

export default Scene4