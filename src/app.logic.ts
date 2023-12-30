import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';


let outputMessage = '';
const base = yarg.base;

const headerMessage = `
==================================
            TABLA DEL ${base}
==================================\n
`;

for (let i = 1; i <= yarg.limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`;

}

outputMessage = headerMessage + outputMessage;

if (yarg.show) {
    console.log(outputMessage);
}

const outputPath = `outputs`;

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log('File created');


