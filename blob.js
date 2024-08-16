const { Blob } = require('node:buffer');
const { setTimeout: delay } = require('node:timers/promises');

const blob = new Blob(['hello there']);

const mc1 = new MessageChannel();
const mc2 = new MessageChannel();

mc1.port1.onmessage = async ({ data }) => {
    console.log({ mc1: await data.arrayBuffer()  })
    mc1.port1.close()
}

mc2.port1.onmessage = async ({ data }) => {
    console.log({ mc2: await data.arrayBuffer() })
    mc1.port1.close()
}

mc1.port2.postMessage(blob);
mc2.port2.postMessage(blob);

blob.text().then(console.log)
