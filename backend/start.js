const { spawnSync } = require("child_process");


function runServer() {
    let child = spawnSync("node", ["server.js"], { shell: false, stdio: 'inherit' });
    console.log(`Server stopped with code ${child.status}`);
}


async function start() {
    let i = 1;
    while (true) {
        console.log(`Starting server for ${i} time`);
        i = i + 1;
        runServer();
        await new Promise(r => setTimeout(r, 1000));
    }
};

start();