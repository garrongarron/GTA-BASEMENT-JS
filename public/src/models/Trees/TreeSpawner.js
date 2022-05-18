import terrainSystem from "../../basic/terrain/TerrainSystem.js";
import fileList from "./FileList.js";

let treesPrefavGroup = new THREE.Group()
let finalTrees = new THREE.Group()
const radio = 100;
const quantity = 50
let data = JSON.parse(localStorage.getItem('trees') || 'null')
let loadTrees = (scene) => {
    if (treesPrefavGroup.children.length > 0) return
    let load = () => {
        //there are 6 trees
        treesPrefavGroup.children = treesPrefavGroup.children.map(object => {
            let scale = 0.03
            object.scale.set(scale, scale, scale)
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            return object
        });

        console.log(data)
        if (data == null) {
            data = {}
            for (let index = 0; index < quantity; index++) {
                let type = Math.floor(Math.random() * treesPrefavGroup.children.length)
                data[`tree-${index}-${type}`] = {
                    x: Math.random() * radio - radio / 2,
                    y: -1,
                    z: Math.random() * radio - radio / 2
                }
                data[`tree-${index}-${type}`].y = terrainSystem.customNoiseGenerator(
                    data[`tree-${index}-${type}`].x, 
                   - data[`tree-${index}-${type}`].z
                )
            }
            localStorage.setItem('trees', JSON.stringify(data))
        }


        Object.keys(data).forEach(key => {
            let treesPrefavGroupIndex = key.split('-')[2]
            let singlTree = treesPrefavGroup.children[treesPrefavGroupIndex].clone()
            singlTree.position.set(
                data[key].x,
                data[key].y,
                data[key].z,
            )
            singlTree.layers.enable(1);
            finalTrees.add(singlTree)

        })
        scene.add(finalTrees)
    }

    const loader = new THREE.FBXLoader();
    let promises = []
    for (let index = 0; index < fileList.length; index++) {
        promises[index] = new Promise((resolve, reject) => {
            loader.load('src/models/Trees/' + fileList[index] + '_1.fbx', function (object) {
                treesPrefavGroup.add(object)
                resolve()
            })
        })
    }
    Promise.all(promises).then((a) => {
        console.log('ALL LOADED');
        load()
    })
}
export default loadTrees