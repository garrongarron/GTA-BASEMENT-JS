import sceneHandler from "./scenes/SceneHandler.js";
import sceneList from "./scenes/SceneList.js";
import peerJsImplementation from "./services/peer.js";

const scenes = sceneHandler.setSceneList(sceneList)

scenes.goTo('menu')
peerJsImplementation()