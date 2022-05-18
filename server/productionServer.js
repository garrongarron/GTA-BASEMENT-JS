const express = require('express')
const { ExpressPeerServer } = require('peer');
const path = require('path')
const fs = require('fs')
const app = express()
const db = require('./db');
const userManager = require('./UserManager')
const bodyParser = require("body-parser");

const port = process.env.PORT || 80


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')))

app.use('/room', db);

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//replace the instance file of node_module folder
const oldFile = 'node_modules/peer/dist/src/instance.js'
fs.unlinkSync(oldFile)
fs.copyFile('server/instance.js', oldFile, (err) => {
    if (err) throw err;
    console.log('instance.js replaced!');
});


//PEER JS CONFIG
const peerServer = ExpressPeerServer(server, {
    path: '/myapp',
    allow_discovery: true,
});

app.use('/peerjs', peerServer);


//to update the user list
peerServer.on('connection', (client, realm) => {
    userManager.setBroadCaster(realm)
    // if (!realm) return
    // realm.getClientsIds().filter(a => a != client.id).forEach(peerId => {
    //     const message = { type: 'CONNECTED', peerId: client.id }
    //     realm.getClientById(peerId).getSocket().send(JSON.stringify(message))
    //     console.log(message);
    // })
});


//to update the user list
peerServer.on('disconnect', (client, realm) => {
    if (!realm) return
    userManager.unSubscribe(client.id)
    if(!userManager.userRoom.hasOwnProperty(client.id)) return
    const roomNameCompuesto = userManager.userRoom[client.id]
    const channel = roomNameCompuesto.split('-')[0]
    const roomName = roomNameCompuesto.split('-')[1]
    userManager.leaveRoom(client.id)
    const users = userManager.getUsersFromRoom(channel, roomName)
    if (users !== false) {
        users.forEach(peerId => {
            const message = { type: 'DISCONNECTED', peerId: client.id }
            realm.getClientById(peerId)?.getSocket().send(JSON.stringify(message))
            console.log(message);
        })
    }
    // realm.getClientsIds().filter(a => a != client.id).forEach(peerId => {
    //     const message = { type: 'DISCONNECTED', peerId: client.id }
    //     realm.getClientById(peerId).getSocket().send(JSON.stringify(message))
    //     console.log(message);
    // })
});