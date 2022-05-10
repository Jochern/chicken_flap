import { Router } from 'express';
import videoStream from './video/capture';
import moveDown from './gpio/moveDown';
import moveUp from './gpio/moveUp';
import { relaisOn, relaisOff } from './gpio/relais'
import authMiddleware from './auth/middleware'
import { getAllSettings,setAllSettings } from './settings/settings';


let router = Router()

//router.use(authMiddleware)

videoStream.acceptConnections(router, {
    width: 1024,
    height: 768,
    fps: 7,
    encoding: 'JPEG',
    quality: 5 //lower is faster
}, '/stream.mjpg', true)

router.get('/moveDown', (req, res) => {
    moveDown()
        .then((value) => {
            console.log('resolved')
            res.send(value);
        })
        .catch(error => {
            console.log('rejected')
            res.send(error)
        })
})

router.get('/moveUp', (req, res) => {
    moveUp()
        .then((value) => {
            console.log('resolved')
            res.send(value);
        })
        .catch(error => {
            console.log('rejected')
            res.send(error)
        })
})

router.get('/relaisOn', (req, res) => {
    relaisOn()
        .then(() => {
            res.send('relais on')
        })
})

router.get('/relaisOff', (req, res) => {
    relaisOff()
        .then(() => {
            res.send('relais off')
        })
})

router.get('/settings', (req,res) => {
    res.json(getAllSettings())
})

router.post('/settings', (req,res) => {
    setAllSettings(req.body).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(500)
    })
})

export default router
