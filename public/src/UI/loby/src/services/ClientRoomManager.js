import usePromise from "../../../../basic/UsePromise.js"

class ClientRoomManager {
    constructor() {
        this.channel = 'tictactoe'
        this.domain = location.origin
    }
    subscribe = async (peerid, channel) => {
        let subscription = this.channel
        if (channel) subscription = channel
        const [data, error] = await usePromise(fetch(`${this.domain}/room/subscribe/${subscription}/` + peerid))
        if (data.status == 'success') return data?.data || []
    }

    getRooms = async () => {
        const [data, error] = await usePromise(fetch(`${this.domain}/room/channel/` + this.channel))
        if (data.status == 'success') return data?.data || []
    }
    join = async (roomName, userName) => {
        const [response, error] = await usePromise(
            fetch(`${this.domain}/room/join`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        roomName, 
                        userName,
                        channel: this.channel
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })

        )
        return response
    }
    createRoom = async (payload) => {
        payload.channel = this.channel
        const [response, error] = await usePromise(
            fetch(`${this.domain}/room`,
                {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
        )
        if (response.status == 'success') return response?.data || []
    }
    getUserFromRoom = async (roomName) => {
        const [data, error] = await usePromise(fetch(`${this.domain}/room/list/${this.channel}/${roomName}`))
        if (data.status == 'success') return data?.data || []
    }

    visibility = async (roomName, visible) => {
        const [response, error] = await usePromise(
            fetch(`${this.domain}/room/visibility`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        channel: this.channel,
                        roomName,
                        visible
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })

        )
        return response
    }
}

const clientRoomManager = new ClientRoomManager()

export default clientRoomManager

export { ClientRoomManager }