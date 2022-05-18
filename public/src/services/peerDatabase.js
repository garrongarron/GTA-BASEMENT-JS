// import userList from "../tictactoe/UserList.js"
import dataHandler from "./dataHandler.js"
import firstMessage from "./firstMessage.js"
// import nick from "./nick.js"

const host = location.hostname || 'localhost'
const port = 80

class PeerDatabase {
    constructor(peer = null) {
        this.peer = peer
        this.localPeerId = null
        this.connections = {}
        this.dataHandler = console.log
        this.delay = 500
    }
    setDataHandler(dataHandler) {
        this.dataHandler = dataHandler
    }

    connected = ({ peerId, peer }) => {
        console.log('My peer ID is: ' + peerId);
        this.peer = peer
        this.localPeerId = peerId
        // userList.addPlayer(nick)
        this.setConnectionHandler(({ conn, peerId }) => {
            this.connections[peerId] = conn
            firstMessage(conn, peerId)
        })
        this.setDataHandler(dataHandler)
        // fetch('http://' + host + ':' + port + '/peerjs/myapp/asd/peers').then(response => response.json()).then(list => {
        //     // console.log('gettin user LIST', list);
        //     list.forEach(somePeerId => {
        //         if (somePeerId == peerId) return
        //         this.connectTo(somePeerId).then(conn => {
        //             firstMessage(conn, somePeerId)// to send first message
        //         })
        //     });
        // })
    }
    #addConnection(peerId, connection) {
        // if(this.connections.hasOwnProperty(peerId)) return new Promise((res, rej)=>{
        //     res(this.connections[peerId])
        // })
        this.connections[peerId] = connection
        connection.on('data', (data) => {
            this.dataHandler(data, peerId, 'Recibo de alguien')
        });
        connection.on('close', (payload) => {
            console.log(`Connection with ${peerId} is closed`, payload);
        })
        return new Promise((res, rej) => {
            connection.peerConnection.onconnectionstatechange = (event) => {
                if (event.target.connectionState == 'connected') {
                    setTimeout(() => {
                        res(connection)
                    }, this.delay);
                }
            }
        })
    }

    connectTo(peerId) {
        const connection = this.peer.connect(peerId)
        return this.#addConnection(peerId, connection)
    }

    setConnectionHandler(connectionHandler = console.log) {
        this.peer.on('connection', (connection) => {
            const peerId = connection.peer
            this.#addConnection(peerId, connection).then(connection => {
                connectionHandler({ conn: connection, peerId })
            })
        })
    }
}

const peerDatabase = new PeerDatabase()
export default peerDatabase