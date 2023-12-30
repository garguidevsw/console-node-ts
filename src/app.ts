import { yarg } from './config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';


(async () => {
    main();
})();

async function main() {
    const { base, limit, show, fileName, pathFile } = yarg;
    ServerApp.run({ base, limit, show, fileName, pathFile });
}