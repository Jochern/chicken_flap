import * as fs from 'fs'

export function getAllSettings(){
    let file = fs.readFileSync('/home/pi/chicken_flap/src/settings/settings.json')

    let settingsJSON = JSON.parse(file.toString())

    return settingsJSON
}

export function getTimeSettings(){
    let allSettings = getAllSettings()

    let timeSettings = allSettings.time
    
    return timeSettings
}