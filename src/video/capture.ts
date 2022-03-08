import { StillCamera } from "pi-camera-connect";

import * as fs from 'fs';

//testing:
// export async function captureImage() {  //takes picture and returns path to it
//     let img = await fs.readFileSync('C:/Users/johan/Desktop/current_projects/chicken_flap/src/assets/test/cropped-ASD_Logo_aktuell_2020.png')
//     return img;
// }

//production:

const stillCamera = new StillCamera();

export async function captureImage() {
    let img = await stillCamera.takeImage()
    
    return img;
}