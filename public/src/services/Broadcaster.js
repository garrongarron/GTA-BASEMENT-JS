import spawner from "../scenes/files-scene4/Spawner.js";
import sceneHandler from "../scenes/SceneHandler.js";
import nick from "./nick.js";
import peerDatabase from "./peerDatabase.js";

class Broadcaster {
    send(msg){
        const players = JSON.parse(localStorage.getItem('players') || '[]')
        // console.log(players);
        if(msg.hasOwnProperty('keyListenerEvent')){
            msg.position = spawner.getCustomController(nick).character.position.toArray()
        }
        players.forEach(peerId => {
            if(peerId == nick) return
            // console.log(peerId);
            peerDatabase.connections[peerId].send({game:msg})
        });
    }
}

const broadcaster = new Broadcaster()

export default broadcaster

export { Broadcaster }