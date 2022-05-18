import blendingType from "./BlendingType.js"
import textures from "./Textures.js"

let cloud = {
    parent: null,
    life: 1.5,
    pointMultiplier: 50,//280 *15,
    quantity: 12,
    texture: textures[0],
    blending: blendingType[0],
    velocity: new THREE.Vector3(0, .5, 0),
    colors:[ new THREE.Color(0x000000),new THREE.Color(0xcccccc) ],
    radio: .25
}

export default cloud