class GravityController {
    constructor() {
        this.character = null
        this.raycaster = new THREE.Raycaster()
        this.origin = new THREE.Vector3()
        this.direction = new THREE.Vector3(0, -1, 0)
        this.array = []
    }
    init(characterController) {
        this.character = characterController.character

    }
    setArray(array) {
        this.array = array
        console.log('terrain', this.array)
    }
    tick() {
        this.origin.copy(this.character.position)
        this.origin.y +=10 
        this.raycaster.set(this.origin, this.direction)
        const intersects = this.raycaster.intersectObjects(this.array)[0];
        if (intersects) {
            this.character.position.copy(intersects.point)
        }

    }
}

// const gravityController = new GravityController()

// export default gravityController

export { GravityController }