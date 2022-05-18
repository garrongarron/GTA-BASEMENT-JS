import peerDatabase from "../../../../services/peerDatabase.js"
import clientRoomManager from "../services/ClientRoomManager.js"

let roomNameField = false

function RoomCreator() {
    this.enableEvents(['click', 'keyup'])
    this.updateText = (e) => {
        roomNameField = e.target
        roomNameField.value = e.target.value.replace('-', '')
    }
    this.createRoom = async () => {
        if(!roomNameField || roomNameField.value.length <4) return
        console.log('creating room')
        const data = await clientRoomManager.createRoom({
            "roomName": roomNameField.value,
            "userName": peerDatabase.localPeerId
        })
        localStorage.setItem('my-room', roomNameField.value)
        roomNameField.value = ''
    }
    return `<div class="create-room">
    <input type="text" keyup="updateText" placeholder="Room Name (min 4 characters)">
    <button click="createRoom">Create Room</button>
</div>`
}

export default RoomCreator