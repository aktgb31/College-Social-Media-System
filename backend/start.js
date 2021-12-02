const { spawnSync } = require("child_process");

function runServer() {

    let child = spawnSync("node", ["server.js"], { shell: false, stdio: 'inherit' });
    console.log(`Server stopped with code ${child.status}`);
}

let i = 1;
while (true) {
    console.log(`Starting server for ${i} time`);
    i = i + 1;
    runServer();
}