import eventBus from "../../../../basic/EventBus.js"
import RoomButton from "./RoomButton.js"
let refresh = null
eventBus.subscribe('getRoomList', (data) => {
    refresh(data.map(e => e.roomName))
})
function RoomList() {
    const [list, setList] = this.useState([])
    refresh = setList
    this.enableSubComponents({RoomButton})
    return `<ul>
                ${list.map(room => `<RoomButton roomname="${room}"/>`)}
            </ul>`
}

export default RoomList