import eventBus from "../basic/EventBus.js"
import { xbotContainer } from "../models/xbot/XbotTest.js";
import spawner from "../scenes/files-scene4/Spawner.js";
import clientRoomManager from "../UI/loby/src/services/ClientRoomManager.js";
import game from "./Game.js";
import nick from "./nick.js";
import peerDatabase from './peerDatabase.js'
import receiver from "./Receiver.js";

const dataHandler = (payload, peerId) => {
    // console.log(payload)
    if (payload.hasOwnProperty('type')) {
        if (payload.type == 'OPEN') {//FROM SERVER
            setTimeout(async () => {
                const data = await clientRoomManager.subscribe(peerDatabase.localPeerId)
                eventBus.dispatch('getRoomList', data)
            }, 500);
        }

        if (payload.type == 'ROOM_LIST') {//FROM SERVER
            // console.log(payload);
            eventBus.dispatch('getRoomList', payload.roomList)
        }
        if (payload.type == 'ROOM_USER_LIST') {//FROM SERVER
            // console.log(payload);
            eventBus.dispatch('update-room', {
                users: payload.userList,
                roomName: payload.roomName
            })
            const players = JSON.parse(localStorage.getItem('players') || '[]')
            players.forEach(peerId => {
                let player = spawner.createPlayer(peerId)
                if (player) {
                    player.start()
                }
            })
            Promise.all(Object.values(xbotContainer)).then(models => {
                setTimeout(() => {
                    spawner.getCustomController(nick).rayCasterController.updateArray()
                }, 2000);
            })
        }
    }
    if (payload.hasOwnProperty('game')) {//FROM PEAR
        // console.log(peerId, payload);
        receiver.receive(payload, peerId)
    }
    if (payload.hasOwnProperty('name')) {//FROM PEAR
        peerDatabase.connections[peerId].send({
            game: {
                statusGame: game.getState()
            }
        })
    }
}

export default dataHandler

