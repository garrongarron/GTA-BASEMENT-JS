import AnimationLoader from "../../basic/animations/AnimationLoader.js";
import PromiseLoader from "../../basic/PromiseLoader.js";
import fileList from "./FileList.js";


const folder = 'src/models/xbot/'

const urlAnimations = {}
for (const [key, value] of Object.entries(fileList)) {
    urlAnimations[key] = folder + 'animations/' + value
}

const urlModel = folder + 'xbot.fbx'
let model = null
const xbotContainer = {}
const getXbotModel = (peerId) => {
    // if(model) return model
    const animationLoader = new AnimationLoader(urlModel, urlAnimations)
    const promiseLoader = new PromiseLoader(THREE.FBXLoader, function (object) {
        const scale = .01
        object.scale.set(scale, scale, scale)
        object.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        object.castShadow = true;
        object.receiveShadow = true;
        object.name = peerId
        return object
    })
    animationLoader.addPromiseLoader(promiseLoader)
    model = animationLoader.getModelWithAnimations()
    xbotContainer[peerId] = model //promise 
    return model //promise
}

export default getXbotModel

export { xbotContainer }
