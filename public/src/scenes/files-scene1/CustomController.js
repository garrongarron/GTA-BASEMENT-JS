import camera from "../../basic/Camera.js"
import light from "../../basic/Light.js"
import scene from "../../basic/Scene.js"
import ray from "../../basic/shapes/Ray.js"
import { AnimationController } from "../../controllers/AnimationController.js"
import { CameraController } from "../../controllers/CameraController.js"
import { CharacterController } from "../../controllers/CharacterController.js"
import { KeyController } from "../../controllers/KeyController.js"
import { MouseController } from "../../controllers/MouseController.js"
import { MoveController } from "../../controllers/MoveController.js"
import { RayCasterController } from "../../controllers/RaycasterController.js"
import { RotationController } from "../../controllers/RotationController.js"
import { ShadowController } from "../../controllers/ShadowController.js"
import { WeaponController } from "../../controllers/WeaponController.js"
import gun from "../../models/gun/Gun.js"


class CustomController {
    constructor() {
        this.model = null
        this.characterController = new CharacterController()
        this.keyController = new KeyController()
        this.mouseController = new MouseController()
        this.moveController = new MoveController()
        this.rotationController = new RotationController()
        this.shadowController = new ShadowController()
        this.cameraController = new CameraController()
        this.rayCasterController = new RayCasterController()
        this.weaponController = new WeaponController()
        this.animationController = new AnimationController()
        this.group = new THREE.Group();
        this.shadowVector = new THREE.Vector3(0, 5, -5)
        this.chest = null
        this.rightHand = null
    }
    start(model, modelGun) {
        
        this.model = model;
        this.characterController.addCharacter(model)
        this.characterController.addController(this.keyController)
        this.mouseController.setCamera(camera)
        this.characterController.addController(this.mouseController)
        this.characterController.addController(this.moveController)
        this.characterController.addController(this.rotationController)
        this.shadowController.setDirectionalLight(light.children[0])
        this.shadowController.setVector(this.shadowVector)
        this.characterController.addController(this.shadowController)
        this.cameraController.setCamera(camera)
        this.characterController.addController(this.cameraController)
        this.rayCasterController.setCamera(camera)
        this.rayCasterController.setCharacter(model)
        this.characterController.addController(this.rayCasterController)

        this.gun = modelGun
        this.group.scale.set(1, 1, 1)
        this.group.position.set(0, 0, 0)
        this.group.rotation.set(0, 0, 0)
        this.gun.position.set(
            model.position.x - .05,
            model.position.y - .08,
            model.position.z - .05
        )
        // modelGun.position.copy(model.position)
        this.gun.rotation.y = Math.PI * .5

        this.group.add(this.gun)
        ray.position.y = .09
        ray.position.z = -.2
        this.group.add(ray)
        scene.add(this.group)
        this.weaponController.setWeapon(this.group)
        if(!this.chest) this.chest = model.children[0].children[1].children[1].children[1]//.children[2]
        this.weaponController.setChest(this.chest)
        if(!this.rightHand) this.rightHand = model.children[0].children[1].children[1].children[1].children[3].children[1].children[1].children[1].children[3]
        this.weaponController.setRightHand(this.rightHand)

        this.characterController.addController(this.weaponController)
        this.characterController.addController(this.animationController)
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