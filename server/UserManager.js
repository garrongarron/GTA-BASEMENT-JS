class UserManager {
    constructor() {
        this.room = {}
        this.userRoom = {}
        this.hiddenRoom = []
        this.userChannel = {}
        this.roomListeners = {}
        this.bradCaster = null
    }

    hideRoom(channel, roomName){
        this.hiddenRoom.push(`${channel}-${roomName}`)
        this.broadCastRoomList(channel)
    }
    showRoom(channel, roomName){
        const index = this.hiddenRoom.indexOf(`${channel}-${roomName}`)
        if(index >-1) this.hiddenRoom.splice(index, 1)
        console.log('deleting hidden room flag', this.hiddenRoom);
        this.broadCastRoomList(channel)
    }

    setBroadCaster(bradCaster) {
        if (this.bradCaster || !bradCaster) return
        this.bradCaster = bradCaster
    }

    broadCastRoomList(channel) {
        if (!this.roomListeners.hasOwnProperty(channel)) return
        this.roomListeners[channel].forEach(peerId => {
            const message = { type: 'ROOM_LIST', roomList: this.getRoomList(channel) }
            this.bradCaster.getClientById(peerId)?.getSocket().send(JSON.stringify(message))
        })
    }
    broadCastRoomUsersList(channel, roomName) {
        if (!this.roomListeners.hasOwnProperty(`${channel}-${roomName}`)) return
        this.roomListeners[`${channel}-${roomName}`].forEach(peerId => {
            const message = { 
                type: 'ROOM_USER_LIST', 
                userList: this.getUsersFromRoom(channel, roomName) ,
                roomName
            }
            this.bradCaster.getClientById(peerId)?.getSocket().send(JSON.stringify(message))
        })
    }

    subscribe(channel, userName) {
        this.unSubscribe(userName)
        this.userChannel[userName] = channel
        if (!this.roomListeners.hasOwnProperty(channel)) {
            this.roomListeners[channel] = []
        }
        const index = this.roomListeners[channel].indexOf(userName)
        if (index > -1) return
        this.roomListeners[channel].push(userName)
        
        return true
    }

    unSubscribe(userName) {
        if (!this.userChannel.hasOwnProperty(userName)) return false
        const channel = this.userChannel[userName]
        if (!this.roomListeners.hasOwnProperty(channel)) return
        const index = this.roomListeners[channel].indexOf(userName)
        if (index > -1) this.roomListeners[channel].splice(index, 1)
        if (this.roomListeners[channel].length == 0) delete this.roomListeners[channel]
        delete this.userChannel[userName]
    }

    //done
    createRoom(channel, roomName, userName) {
        if (!this.room.hasOwnProperty(channel)) {
            this.room[channel] = {}
        }
        if (!this.roomListeners.hasOwnProperty(channel)) {
            this.roomListeners[channel] = []
        }

        if (!this.room[channel].hasOwnProperty(roomName)) {
            this.room[channel][roomName] = []
            this.joinToRoom(channel, roomName, userName, false)
            this.broadCastRoomList(channel)
            return true
        }
        return false
    }

    //done
    getRoomList(channel) {
        if (!this.room.hasOwnProperty(channel)) return false
        return Object.keys(this.room[channel]).filter(roomName=>{
            const index = this.hiddenRoom.indexOf(`${channel}-${roomName}`)
            return !(index >-1)
        }).map(roomName => {
            return {
                roomName,
                length: this.room[channel][roomName].length
            }
        })
    }

    //done
    getUsersFromRoom(channel, roomName) {
        if (!this.room.hasOwnProperty(channel)) return false
        if (!this.room[channel].hasOwnProperty(roomName)) return false
        return this.room[channel][roomName] || false
    }

    //done
    joinToRoom(channel, roomName, userName, withBroadcast = true) {
        if (!this.room.hasOwnProperty(channel)) return false
        if (!this.room[channel].hasOwnProperty(roomName)) return false
        this.leaveRoom(userName, withBroadcast, false)
        const index = this.room[channel][roomName].indexOf(userName)
        if (index > -1) return false
        this.room[channel][roomName].push(userName)
        this.userRoom[userName] = `${channel}-${roomName}`
        this.broadCastRoomUsersList(channel, roomName)
        return true
    }

    //done
    leaveRoom(userName, withBroadcast = true, deleteRoom = true) {
        // console.log(userName, 'leaveRoom--1 ', this.userRoom,)
        if (!this.userRoom.hasOwnProperty(userName)) return false
        const roomNameCompuesto = this.userRoom[userName];
        const channel = roomNameCompuesto.split('-')[0]
        const roomName = roomNameCompuesto.split('-')[1]
        const index = this.room[channel][roomName].indexOf(userName)
        if (index > -1) this.room[channel][roomName].splice(index, 1)
        if (deleteRoom && this.room[channel][roomName].length == 0) {
            delete this.room[channel][roomName]
            this.showRoom(channel, roomName)
            if (withBroadcast) this.broadCastRoomList(channel)
        }
        delete this.userRoom[userName]
        this.broadCastRoomUsersList(channel, roomName)
        return
    }
}

const userManager = new UserManager()

module.exports = userManager;