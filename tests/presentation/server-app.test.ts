import { CreateTable } from '../../src/domain/use-cases/create-table.use-cases';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from './../../src/presentation/server-app';
describe('Server app', () => {
    const options = {
        base: 5,
        limit: 10,
        show: false,
        fileName: 'test-filename',
        pathFile: 'test-destination'
    }

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    })

    test('should run serverApp with options', () => {
        // const logSpy = jest.spyOn(console, 'log');
        // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        // ServerApp.run(options);

        // expect(logSpy).toHaveBeenCalledTimes(2);
        // expect(logSpy).toHaveBeenCalledWith('Server running...');
        // expect(logSpy).toHaveBeenLastCalledWith('File Created!');

        // expect(createTableSpy).toHaveBeenCalledTimes(1);
        // expect(createTableSpy).toHaveBeenCalledWith({ 'base': options.base, 'limit': options.limit });

        // expect(saveFileSpy).toHaveBeenCalledTimes(1);
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     fileDestination: options.pathFile,
        //     fileName: options.fileName
        // });


    })

    test('should run serverApp with custom values mock', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({ 'base': options.base, 'limit': options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.pathFile,
            fileName: options.fileName
        });
        expect(logMock).toHaveBeenCalledWith('File Created!');
        expect(logErrorMock).not.toHaveBeenCalledWith();
    })
})