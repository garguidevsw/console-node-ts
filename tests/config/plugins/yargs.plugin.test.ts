// import { yarg } from './../../../src/config/plugins/yargs.plugin';

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./../../../src/config/plugins/yargs.plugin');

    return yarg;
}

describe('config/plugins/yargs', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        //Clean argv
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            f: 'multiplication-table',
            p: 'outputs'
        }));
    })

    test('should return config with custom values', async () => {
        const argv = await runCommand(['-b', '8', '-l', '5', '-s', '-f', 'custom-table', '-p', 'custom']);

        expect(argv).toEqual(expect.objectContaining({
            b: 8,
            l: 5,
            s: true,
            f: 'custom-table',
            p: 'custom'
        }));
    })
})