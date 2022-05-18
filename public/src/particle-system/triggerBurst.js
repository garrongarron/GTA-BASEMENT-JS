import ParticleSystem from './ParticleSystem.js'
import { getDelta } from '../basic/Clock.js'
import loopMachine from '../basic/LoopMachine.js'
import cloud from './Cloud.js'
import fire from './Fire.js'
import scene from '../basic/Scene.js'

let params2 = {
    fire,
    cloud
}

let setParticles = (type = 'fire', group) => {
    params2[type].parent = group
    let ps = new ParticleSystem(params2[type]);
    loopMachine.addCallback(() => {
        if (ps) {
            ps.Step(getDelta());
        }
    })
    setTimeout(() => {
        ps.off()
    }, 1000);
    return ps._points
}

const triggerBurst = (position) => {
    const group = new THREE.Group()
    scene.add(group)
    group.position.copy(position)
    setParticles('fire', group)
    setParticles('cloud', group)
    setTimeout(() => {
        scene.remove(group)
    }, 5000);
}



export default triggerBurst