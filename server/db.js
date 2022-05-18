const userManager = require('./UserManager')

const express = require("express");
const router = express.Router();

//get roomlist
router.get("/subscribe/:channel/:peerid", (req, res, next) => {
    const peerid = req.params.peerid;
    const roomNameCompuesto = req.params.channel;
    const channel = roomNameCompuesto.split('-')[0]
    if (roomNameCompuesto.split('-').length == 2) {
        const roomName = roomNameCompuesto.split('-')[1]
        if (userManager.subscribe(roomNameCompuesto, peerid)) {
            res.status(200).json({
                status: 'success',
                data: userManager.getUsersFromRoom(channel, roomName)
            });
        } else {
            res.status(200).json({ status: 'error' });
        }
        return
    }
    if (userManager.subscribe(channel, peerid)) {
        res.status(200).json({
            status: 'success',
            data: userManager.getRoomList(channel)
        });
    } else {
        res.status(200).json({ status: 'error' });
    }
});


//get roomlist
router.get("/channel/:channel", (req, res, next) => {
    const channel = req.params.channel;
    const response = userManager.getRoomList(channel)
    if (response == false) {
        res.status(200).json({ status: 'error' });
    } else {
        res.status(200).json({
            status: 'success',
            data: userManager.getRoomList(channel)
        });
    }
});


//create room
router.post("/", (req, res, next) => {
    const roomName = req.body.roomName;
    const userName = req.body.userName;
    const channel = req.body.channel;
    if (userManager.createRoom(channel, roomName, userName)) {
        res.status(201).json({
            status: 'success',
            data: userManager.getUsersFromRoom(channel, roomName)
        });
    } else {
        res.status(200).json({ status: 'error' });
    }
});

//get user from room
router.get("/list/:channel/:roomid", (req, res, next) => {
    const roomName = req.params.roomid;
    const channel = req.params.channel;
    res.status(200).json({
        status: 'success',
        data: userManager.getUsersFromRoom(channel, roomName),
        room: roomName
    });
});


//join to room
router.post("/join", (req, res, next) => {
    const roomName = req.body.roomName;
    const userName = req.body.userName;
    const channel = req.body.channel;
    if (userManager.joinToRoom(channel, roomName, userName)) {
        res.status(200).json({ status: 'success' });
    } else {
        res.status(200).json({ status: 'error' });
    }
});

//join to room
router.post("/visibility", (req, res, next) => {
    const channel = req.body.channel;
    const roomName = req.body.roomName;
    const visible = req.body.visible;
    if (visible) {
        if (userManager.showRoom(channel, roomName)) {
            return res.status(200).json({ status: 'success' });
        }
    } else {
        if (userManager.hideRoom(channel, roomName)) {
            return res.status(200).json({ status: 'success' });
        }
    }
    return res.status(200).json({ status: 'error' });
});

module.exports = router;