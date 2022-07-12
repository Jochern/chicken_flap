import * as fs from "fs/promises";

const maxLength = 100;
//logs the time needed and the current datetime
export default async function log(time, failed) {
    let arr = await csvFileToArray("./log/log");
    if (arr.length > maxLength - 1) {
        arr.shift();
    }

    arr.push({
        dateTime: new Date().toDateString(),
        time: time,
        failed: failed
    });

    arrayToCSVFile(arr);
}

log(120, false);

function arrayToCSVFile(arr) {
    console.log(arr);
    console.log("--------------------------------------------");
    let csv = "";

    arr.map(line => {
        let arrOfLines = Object.values(line);

        arrOfLines.forEach((val, i) => {
            if (i == arrOfLines.length - 1) {
                csv += val;
                csv += "\n";
                return;
            }

            csv += val;
            csv += ",";
        });
    });

    fs.writeFile("./log/log.log", csv);
}

async function csvFileToArray(dir) {
    let text = await fs.readFile(dir, { encoding: "utf8" });

    let lines = text.split(/\r?\n/);

    let arr = [];
    for (const line of lines) {
        console.log(line);
        if (line !== "") {
            let dateTimeTimeFailed = line.split(",");
            arr.push({
                dateTime: dateTimeTimeFailed[0],
                time: dateTimeTimeFailed[1],
                failed: dateTimeTimeFailed[2]
            });
        }
    }
    return arr;
}