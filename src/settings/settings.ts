import * as fs from 'fs'
import { updateJob } from "../schedule/schedule";

export function getAllSettings(): any {
    let file = fs.readFileSync('/home/pi/chicken_flap/src/settings/settings.json')

    let settingsJSON = JSON.parse(file.toString())

    return settingsJSON
}

export async function setAllSettings(settings: JSON){
    try {   
        fs.writeFileSync('/home/pi/chicken_flap/src/settings/settings.json',JSON.stringify(settings))
        updateJob()
        return
    } catch (error) {
        return 'something went wrong'
    }
}

export function getTimeSettings(): any {
    let allSettings = getAllSettings()

    let timeSettings = allSettings.time

    return timeSettings
}