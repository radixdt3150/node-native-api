// const EventEmitter = require('node:events');
// const ee1 = new EventEmitter({ captureRejections: true });
// ee1.on('something', async (value) => {
//     throw new Error('kaboom');
// });

// ee1.on('error', console.log);

// const ee2 = new EventEmitter({ captureRejections: true });
// ee2.on('something', async (value) => {
//     throw new Error('kaboom');
// });

// ee2[Symbol.for('nodejs.rejection')] = console.log;

// ee2.emit('something')

const { once, EventEmitter } = require('node:events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.error('error happened', err);
  }
}

run();