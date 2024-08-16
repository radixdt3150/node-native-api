const cluster = require("node:cluster");
const http = require("node:http");
const numCpus = require("node:os").availableParallelism();


if (cluster.isPrimary) {
    console.log(`Primary Process with id: ${process.pid} is running`)
    console.log(`${numCpus} worker threads will be forked`)
    // spawn worker threads
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello World from process: ${process.pid}`);
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}