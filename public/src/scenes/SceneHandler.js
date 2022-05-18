class SceneHandler {
    constructor(sceneList = {}) {
        this.prev = null
        this.sceneList = sceneList
    }
    setSceneList(sceneList){
        this.sceneList = sceneList
        return this
    }
    goTo(sceneName) {
        if (this.prev != null) {
            this.prev.close()
        }
        this.sceneList[sceneName].then(scene => {
            scene.open(this)
            this.prev = scene
        })
    }
}
const sceneHandler = new SceneHandler()
export default sceneHandler
export { SceneHandler }