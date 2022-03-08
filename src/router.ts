import {Router} from 'express';
import {captureImage} from '../src/video/capture'

//remove later
import * as fs from 'fs';

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
        res.write(`data: ${img}\n\n`)
    }, 2000) 
})

router.get('/moveDown', (req,res) => {
    
})

router.get('/moveUp', (req,res) => {

})

export default router