import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
    .option('base', {
        alias: 'b',
        type: 'number',
        demandOption: true,
        describe: 'Multiplication table base'
    })
    .option('limit', {
        alias: 'l',
        type: 'number',
        default: 10,
        describe: 'Multiplication table limit'
    })
    .option('show', {
        alias: 's',
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table'
    })
    .option('fileName', {
        alias: 'f',
        type: 'string',
        default: 'multiplication-table',
        describe: 'File name'
    })
    .option('pathFile', {
        alias: 'p',
        type: 'string',
        default: 'outputs',
        describe: 'File path'
    })
    .check((argv, options) => {
        if (argv.base < 1) throw 'Error: base must be greater than 0';

        return true;
    })
    .parseSync();