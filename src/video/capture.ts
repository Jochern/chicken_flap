import { StillCamera, StreamCamera, Codec } from "pi-camera-connect";

import * as fs from 'fs';

//testing:
// export async function captureImage() {  //takes picture and returns path to it
//      let img = await fs.readFileSync('../assets/test/cropped-ASD_Logo_aktuell_2020.png')
//      return img;
//  }

//production:

export async function captureImage() {    //TODO: Start stream on connection and end stream on close
   const streamCamera = new StreamCamera({
      codec: Codec.MJPEG
   });

   await streamCamera.startCapture();

   let img = await streamCamera.takeImage()
  
   await streamCamera.stopCapture()

   return img;
}
