class PeerjsClient {
    constructor() {
        this.peer = null
        this.host = 'localhost'
        this.port = 80
        this.path = '/'
        this.secure = false
        this.peerId = null
    }
    setPeerId(peerId) {
        this.peerId = peerId
    }
    setHost(host) {
        this.host = host
    }
    setPort(port) {
        this.port = port
    }
    setPath(path) {
        this.path = path
    }
    setAsSecure() {
        this.secure = true
    }
    open(serverDataHandler = console.log) {
        return new Promise((res, rej) => {
            const originalHandleMessage = Peer.prototype._handleMessage
            Peer.prototype._handleMessage = function(data) {
                serverDataHandler(data)
                originalHandleMessage.bind(this)(data)
            }
            this.peer = new Peer(this.peerId || undefined, {
                host: this.host,
                port: this.port,
                path: this.path,
                secure: this.secure
            })
            this.peer.on('close', () => {
                console.log('Connection destroyed');
            })
            this.peer.on('open', (peerId) => {
                res({ peer: this.peer, peerId })
            })
            this.peer.on('data', (payload) => {
                console.log(data, payload);
            })
        })
    }
}

const peerjsClient = new PeerjsClient()

export default peerjsClient

export { PeerjsClient }