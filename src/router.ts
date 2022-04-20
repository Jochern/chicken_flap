import {Router} from 'express';
import {captureImage} from '../src/video/capture'
import moveDown from './gpio/moveDown';
import moveUp from './gpio/moveUp';
import {relaisOn,relaisOff} from './gpio/relais'

let router = Router()

router.get('/video', (req,res) => {         //important! client has to close connection 
    res.status(200).set({
        "connection": "keep-alive",
        "content-type": "text/event-stream"
    });

    res.write('retry: 10000\n\n');          //tells client to retry every 10000 sec if connection lost
    
    req.on('close', () => {
        console.log('close')
        clearInterval(interval)
    });
    
    let interval = setInterval(async ()=> {
        let img = await (await captureImage()).toString('base64')
        console.log('sending')
        res.write(`data: ${img}\n\n`)
    }, 3000) 
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
