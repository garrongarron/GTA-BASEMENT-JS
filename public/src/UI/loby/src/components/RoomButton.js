import eventBus from "../../../../basic/EventBus.js";
import nick from "../../../../services/nick.js";
import peerDatabase from "../../../../services/peerDatabase.js";
import clientRoomManager from "../services/ClientRoomManager.js";

function RoomButton({ roomname }) {
    this.enableEvents(['click'])
    // this.useEffect(() => {
    //     const roomSelected = localStorage.getItem('room-selected')
    //     if (roomSelected == roomname) {
    //         this.getIn()
    //     }

    // }, [])
    this.getIn = async () => {
        const response = await clientRoomManager.join(roomname, peerDatabase.localPeerId)

        if (response.status == 'success') {
            const payload = await clientRoomManager.subscribe(peerDatabase.localPeerId, `${clientRoomManager.channel}-${roomname}`)
            eventBus.dispatch('update-room', { users: payload, roomName: roomname })
        }
        localStorage.setItem('room-selected', roomname)
        eventBus.dispatch('getRoomList', [])
    }
    return `<li class="room-button" click="getIn">${roomname}</li>`
}

export default RoomButton