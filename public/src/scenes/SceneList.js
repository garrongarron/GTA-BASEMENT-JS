import lazyLoad from "../basic/LazyLoad.js"

let sceneList = {
    get 'campo'(){ return lazyLoad(location.origin+'/src/scenes/Scene1.js')},
    get 'menu'(){ return lazyLoad(location.origin+'/src/scenes/Scene2.js')},
    get 'settings'(){ return lazyLoad(location.origin+'/src/scenes/Scene3.js')},
    get 'game'(){ return lazyLoad(location.origin+'/src/scenes/Scene4.js')},
}
export default sceneList



