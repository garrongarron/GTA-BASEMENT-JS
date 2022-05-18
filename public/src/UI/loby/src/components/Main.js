import RoomList from './RoomList.js'
import RoomCreator from './RoomCreator.js'
import Room from './Room.js'
import SecretRoom from './SecretRoom.js'



export default function main() {
    this.enableSubComponents({RoomList, RoomCreator, Room, SecretRoom})
    return `<div class="room-list" style="display: none">
                <RoomList/>
                <RoomCreator/>
                <Room/>
                <SecretRoom/>
            </div>`
}