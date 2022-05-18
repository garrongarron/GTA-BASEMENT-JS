import eventBus from "../../../../basic/EventBus.js"
import nick from "../../../../services/nick.js"
import peerDatabase from "../../../../services/peerDatabase.js"
import clientRoomManager from "../services/ClientRoomManager.js"

// let refresh = null
// let room = ''
// eventBus.subscribe('update-room', async ({ users, roomName }) => {
//     room = roomName
//     refresh(users)
// })
let roomNameField = false
function SecretRoom() {
    // const [user, setUser] = this.useState([])
    // refresh = setUser
    this.enableEvents(['click', 'keyup'])
    this.updateText = (e) => {
        roomNameField = e.target
        roomNameField.value = e.target.value.replace('-', '')
    }
    // this.useEffect(() => {
    //     setTimeout(() => {
    //         const roomSelected = localStorage.getItem('room-selected')
    //         roomNameField = document.querySelector('.secret-room input')
    //         roomNameField.value = roomSelected
    //         this.join()
    //     }, 1000);
    // }, [])
    this.join = async () => {
        if (!roomNameField || roomNameField.value.length < 4) return
        const roomName = roomNameField.value
        const userName = peerDatabase.localPeerId
        const response = await clientRoomManager.join(roomName, userName)
        if (response.status == 'success') {
            const payload = await clientRoomManager.subscribe(userName, `${clientRoomManager.channel}-${roomName}`)
            eventBus.dispatch('update-room', { users: payload, roomName })
            localStorage.setItem('room-selected', roomName)
            eventBus.dispatch('getRoomList', [])
            roomNameField.value = ''
        }

    }
    // const show = localStorage.getItem('my-room') == room
    return `<div class="secret-room" style="display:none1">
            <input type="text" keyup="updateText" placeholder="Room Name (min 4 characters)">
            <button click="join">Join to the Secret Room</button>
    </div>`
}

export default SecretRoom