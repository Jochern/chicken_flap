import {Job, scheduleJob} from 'node-schedule'
import { getTimeSettings } from '../settings/settings'
import moveUp from '../gpio/moveUp'
import moveDown from '../gpio/moveDown'

let jobMorning:Job = null
let jobEvening:Job = null

export function createJob(){
    let timeSettings = getTimeSettings()

    let morning = timeSettings.morning.split(":")

    let evening = timeSettings.evening.split(":")

    jobMorning = scheduleJob(`${morning[1]} ${morning[0]} * * *`, moveUp)

    jobEvening = scheduleJob(`${evening[1]} ${evening[0]} * * *`, moveDown)
}

function uppdateJob(){
    let timeSettings = getTimeSettings()

    let morning = timeSettings.morning.split(":")

    let evening = timeSettings.evening.split(":")

    jobMorning.reschedule(`${morning[1]} ${morning[0]} * * *`)

    jobEvening.reschedule(`${evening[1]} ${evening[0]} * * *`)
}



// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)