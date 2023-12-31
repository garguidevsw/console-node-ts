import fs from 'fs';
import { SaveFile } from './../../../src/domain/use-cases/save-file.use-case';
describe('domain/use-cases/save-file', () => {

    // beforeEach(() => {

    // });

    afterEach(() => {
        //Clean up

        const exist = fs.existsSync('outputs');
        if (exist) {

            fs.rmSync('outputs', { recursive: true });
        }

        const existCustom = fs.existsSync('custom-outputs');
        if (existCustom) {
            fs.rmSync('custom-outputs', { recursive: true });
        }
    });

    test('should save file with default values', () => {
        const saveFile = new SaveFile();

        const options = {
            fileContent: 'test content'
        }

        const filePath = 'outputs/table.txt';

        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBeTruthy();
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {
        const saveFile = new SaveFile();

        const options = {
            fileContent: 'custom content',
            fileDestination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name'
        }

        const filePath = `${options.fileDestination}/${options.fileName}.txt`;

        const result = saveFile.execute(options);

        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBeTruthy();
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);

    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content'
        }

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        });

        const result = saveFile.execute(options);

        expect(result).toBeFalsy();

        mkdirSpy.mockRestore();
    })

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content'
        }

        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('This is a custom error message from testing');
        });

        const result = saveFile.execute(options);

        expect(result).toBeFalsy();
        writeFileSpy.mockRestore();
    })
})