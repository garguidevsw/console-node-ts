import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    show: boolean;
    fileName: string;
    pathFile: string;
}

export class ServerApp {

    static run({ base, limit, show, fileName, pathFile }: RunOptions) {
        console.log('Server running...');

        const table = new CreateTable().execute({ base, limit });

        const wasCreated = new SaveFile().execute({
            fileContent: table,
            fileDestination: pathFile,
            fileName
        });

        if (show) console.log(table);

        (wasCreated)
            ? console.log('File Created!')
            : console.log('Error: File not created!');


    }
}