/**
 * Este material es el material de soporte del curso 
 * `Metaverso en una Blockchain de Javascrip` de udemy 
 * del instructor Federico Zacayan.
 * Enlace a el curso https://www.udemy.com/course/metaverso-en-una-blockchain-de-javascript/?referralCode=178C680049D0A32DCE0E
 */
import peerjsClient from "../realtime/peerjs/PeerjsClient.js"
import dataHandler from "./dataHandler.js"
import nick from "./nick.js"
import peerDatabase from "./peerDatabase.js"

const host = location.hostname || '186.129.92.78'
const port = 80
peerjsClient.setPeerId(nick)
// peerjsClient.setHost('localhost')
peerjsClient.setHost(host)
peerjsClient.setPort(port)
// peerjsClient.setAsSecure()
peerjsClient.setPath('/peerjs/myapp')

const peerJsImplementation = (address) => {
    peerjsClient.open(dataHandler).then(peerDatabase.connected)
}

export default peerJsImplementation