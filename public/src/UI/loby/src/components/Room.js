import eventBus from "../../../../basic/EventBus.js"
import sceneHandler from "../../../../scenes/SceneHandler.js"
import broadcaster from "../../../../services/Broadcaster.js"
import game, { gameStatus } from "../../../../services/Game.js"
import nick from "../../../../services/nick.js"
import peerDatabase from "../../../../services/peerDatabase.js"
import clientRoomManager from "../services/ClientRoomManager.js"

let refresh = null
let room = ''
eventBus.subscribe('update-room', async ({ users, roomName }) => {
    room = roomName
    localStorage.setItem('players', JSON.stringify(users))
    refresh(users)
})

function Room() {
    const [user, setUser] = this.useState([])
    refresh = setUser

    if (user.length > 1) {
        console.log('CONECTANDOSE CON LOS DE LA SALA');
        user.forEach(peerId => {
            if (peerId == peerDatabase.localPeerId) return
            peerDatabase.connectTo(peerId).then((conn) => {
                console.log('CONECTADO CON ', peerId)
                conn.send({ 
                    name: nick ,
                    statusGame: game.getState()
                })
            })
        });
    }
    this.enableEvents(['click'])
    this.start = () => {
        clientRoomManager.visibility(room, false)
        game.setState(gameStatus.INGAME)
        broadcaster.send({ command: 'START' })
        sceneHandler.goTo('settings')
    }
    this.leave = () => {
        localStorage.removeItem('room-selected')
        setTimeout(() => {
            location.reload()
        }, 500);
    }
    const show = localStorage.getItem('my-room') == room
    const leave = user.length > 0 ? `<button click="leave">Leave room</button>` : ''
    return `<div class="room">
        <ul>
            ${user.length > 0 ? `<li>---${room}---</li>` : ''}
            ${user.map(user => `<li>${user}</li>`)}
        </ul>
        ${show ? `<button click="start">Start</button>` : ''}
        ${leave}
    </div>`
}

export default Room