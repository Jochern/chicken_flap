import {Router} from 'express';
import {captureImage} from '../src/video/capture'
import moveDown from './gpio/moveDown';
import moveUp from './gpio/moveUp';
import {relaisOn,relaisOff} from './gpio/relais'

let router = Router()

router.get('/video', (req,res) => {         //important! client has to close connection 

})

router.get('/moveDown', (req,res) => {
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

router.get('/moveUp', (req,res) => {
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

router.get('/relaisOn', (req,res) => {
    relaisOn()
    .then(() => {
        res.send('relais on')
    })
})

router.get('/relaisOff', (req,res) => {
    relaisOff()
    .then(() => {
        res.send('relais off')
    })
})

export default router
