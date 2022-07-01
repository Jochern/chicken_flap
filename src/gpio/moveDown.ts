import { Gpio } from "onoff";
import * as fs from 'fs';
import transporter from '../settings/mail/transporter';


let sIn1 = new Gpio(2, 'in', 'both')//has to be configured as INPUT PULLUP
let sIn2 = new Gpio(3, 'in', 'both')//has to be configured as INPUT PULLUP

let mOut1 = new Gpio(5, 'out')
let mOut2 = new Gpio(6, 'out')


export default function moveDown() {
    return new Promise((resolve, reject) => {
        mOut1.writeSync(0);
        mOut2.writeSync(0);

        let state = getState()

        if (state == "true") {
            // console.log('already down')
            return resolve('already down')
        }

        mOut1.writeSync(0)
        mOut2.writeSync(1)

        const timeout = setTimeout(() => {
            mOut1.writeSync(0);
            mOut2.writeSync(0);
            // console.log('done 2')
            fs.writeFileSync("/home/pi/chicken_flap/src/gpio/state.txt", "true")
            transporter.sendMail({
                from: "johannes.kling@outlook.de",
                to: "rokli@gmx.net",
                subject: "Hühnerklappe !!!",
                text: "Die Klappe ist vermutlich nicht bis zum Anschlag geschlossen! Bitte überprüfen."
            })
            return reject('time elapsed - check for errors')
        }, 45000);

        sIn1.watch((err, val) => {
            if (val === 0) {
                clearTimeout(timeout)
                mOut1.writeSync(0);
                mOut2.writeSync(0);
                // console.log('done')
                fs.writeFileSync("/home/pi/chicken_flap/src/gpio/state.txt", "true")
                sIn1.unwatch()
                return resolve('moved down')
            }
        })
    })
}

export function getState() {
    return fs.readFileSync("/home/pi/chicken_flap/src/gpio/state.txt", 'utf8')
}
