//gpio 21
import { Gpio } from "onoff";

let relais = new Gpio(21, 'out')

export async function relaisOn() {
    await relais.write(0)
    return
}

export async function relaisOff() {
    await relais.writeSync(1)
    return
}

export async function getRelaisState() {//1 -> off 0 -> on
    let state = await relais.read()
    //console.log(state)
    return state
}