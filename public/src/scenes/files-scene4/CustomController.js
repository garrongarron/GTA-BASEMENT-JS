import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import ray from "../../basic/shapes/Ray.js"
import sphere from "../../basic/shapes/Sphere.js"
import { AnimationController } from "../../controllers/AnimationController.js"
// import { BroadcasterController } from "../../controllers/BroadcasterController.js"
import { CameraController } from "../../controllers/CameraController.js"
import { CharacterController } from "../../controllers/CharacterController.js"
import { CRotationController } from "../../controllers/CRotationController.js"
import { DeathController } from "../../controllers/DeathController.js"
import { HittableController } from "../../controllers/HittableController.js"
import { HittedController } from "../../controllers/HittedController.js"
import { HPController } from "../../controllers/HPController.js"
import { ImpactController } from "../../controllers/ImpactController.js"
import { KeyController } from "../../controllers/KeyController.js"
import { MouseController } from "../../controllers/MouseController.js"
import { MouseRotationController } from "../../controllers/MouseRotationController.js"
import { MoveController } from "../../controllers/MoveController.js"
import { RayCasterController } from "../../controllers/RaycasterController.js"
import { RemoteController } from "../../controllers/RemoteController.js"
import { RotationController } from "../../controllers/RotationController.js"
import { ShadowController } from "../../controllers/ShadowController.js"
import { WeaponController } from "../../controllers/WeaponController.js"
import nick from "../../services/nick.js"
import hitSystem from "./HitSystem.js"
import spawner from "./Spawner.js"


class CustomController {
    constructor(peerId) {
        this.model = null
        this.peerId = peerId
        this.characterController = new CharacterController(this.peerId)
        this.characterController.state['translation'] = { x: 0, y: 0 }
        this.characterController.state['rotation'] = { x: 0, y: 0, z: 0 }
        this.characterController.state['cRotation'] = { x: 0, y: 0, z: 0 }
        this.characterController.state['angle'] = { x: 0, y: 0, z: 0 }
        this.characterController.state['mouse'] = { acumulated: { x: 0, y: 0 }, delta: { x: 0, y: 0 } }
        if (this.peerId != nick) this.remoteController = new RemoteController(this.peerId)
        // if (this.peerId = nick) this.broadcasterController = new BroadcasterController(this.peerId)

        this.mouseController = new MouseController(this.peerId)
        this.keyController = new KeyController(this.peerId)
        this.mouseRotationController = new MouseRotationController(this.peerId)
        this.moveController = new MoveController()
        this.rotationController = new CRotationController(this.peerId)
        if (this.peerId == nick) this.shadowController = new ShadowController()
        if (this.peerId == nick) this.cameraController = new CameraController()
        this.rayCasterController = new RayCasterController(this.peerId)
        if (this.peerId == nick) this.impactController = new ImpactController()
        this.weaponController = new WeaponController(this.peerId)
        this.hittableController = new HittableController(this.peerId)
        this.animationController = new AnimationController(this.peerId)
        this.deathController = new DeathController(this.peerId)
        this.hittedController = new HittedController(this.peerId)
        this.hPController = new HPController(this.peerId)
        this.group = new THREE.Group();
        this.shadowVector = new THREE.Vector3(0, 5, -15)
        this.chest = null
        this.rightHand = null
    }
    start(character, modelGun) {
        this.character = character;
        this.characterController.addCharacter(character)
        if (this.peerId != nick) this.characterController.addController(this.remoteController)
        this.characterController.addController(this.keyController)
        this.mouseRotationController.setCamera(camera)
        this.characterController.addController(this.mouseController)
        this.characterController.addController(this.mouseRotationController)
        this.characterController.addController(this.moveController)
        this.characterController.addController(this.rotationController)
        if (this.peerId == nick) this.shadowController.setDirectionalLight(light.children[0])
        if (this.peerId == nick) this.shadowController.setVector(this.shadowVector)
        if (this.peerId == nick) this.characterController.addController(this.shadowController)
        if (this.peerId == nick) this.cameraController.setCamera(camera)
        if (this.peerId == nick) this.characterController.addController(this.cameraController)
        this.rayCasterController.setCamera(camera)
        this.rayCasterController.setCharacter(character)
        this.characterController.addController(this.rayCasterController)
        if (this.peerId == nick) this.characterController.addController(this.impactController)
        this.group.scale.set(1, 1, 1)
        this.group.position.set(0, 0, 0)
        this.group.rotation.set(0, 0, 0)

        if (this.peerId == nick) {
            this.gun = modelGun

            this.gun.position.set(
                character.position.x - .05,
                character.position.y - .08,
                character.position.z - .05
            )
            // modelGun.position.copy(character.position)
            this.gun.rotation.y = Math.PI * .5
            this.group.add(this.gun)
        }
        const proyectile = ray()
        proyectile.position.y = .09
        proyectile.position.z = -.2
        proyectile.name = 'proyectile-' + this.peerId
        this.group.add(proyectile)
        this.weaponController.setRay(proyectile)
        this.weaponController.setWeapon(this.group)
        this.weaponController.setChest(character.children[0].children[1].children[1].children[1])
        character.children[0].children[1].children[1].children[1].children[3].children[1].children[1].children[1].children[3].attach(this.group)
        this.weaponController.setRightHand(character.children[0].children[1].children[1].children[1].children[3].children[1].children[1].children[1].children[3])
        this.characterController.addController(this.weaponController)

        //HIT SYSTEM
        const headHitable = sphere.clone()
        headHitable.scale.set(.125,.125,.125)
        headHitable.name = 'headHitable-' + this.peerId
        headHitable.layers.enable( 1 );
        hitSystem.addHitable(headHitable)
        this.hittableController.setHitableObject(headHitable)
        const headBone = character.children[0].children[1].children[1].children[1].children[2].children[1]
        this.hittableController.setCharacterBone(headBone)
        this.characterController.addController(this.hittableController)

        this.characterController.addController(this.animationController)
        this.characterController.addController(this.deathController)
        this.characterController.addController(this.hittedController)
        this.characterController.addController(this.hPController)
        
        
        this.characterController.start()

    }

    stop() {
        // scene.remove(this.group)
        this.characterController.stop()
    }
}

const customController = new CustomController()

export default customController

export { CustomController }