import blendingType from "./BlendingType.js"
import textures from "./Textures.js"

let fire = {
    parent: null,
    life: .5,
    pointMultiplier: 50,
    quantity: 30,
    texture: textures[1],
    blending: blendingType[0],
    velocity: new THREE.Vector3(0, .5, 0),
    colors:[ new THREE.Color(0xFFFF80),new THREE.Color(0xFF8080) ],
    radio: .25
}


export default fire