import { ServerApp } from './../src/presentation/server-app';
describe('app.ts', () => {
    test('should call serverapp.run with values', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-f', 'test-file', '-p', 'test-destination'];

        await import('../src/app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            show: true,
            fileName: 'test-file',
            pathFile: 'test-destination'
        })
    })
})