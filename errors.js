// const fs = require('fs/promises');

// (async () => {
//     let data;
//     try {
//         data = await fs.readFile('a file that does not exist');
//     } catch (err) {
//         console.error('There was an error reading the file!', err);
//         return;
//     }
//     // Otherwise handle the data
// })();

// const EventEmitter = require('node:events');
// const ee = new EventEmitter();

// setImmediate(() => {
//   // This will crash the process because no 'error' event
//   // handler has been added.
//   ee.emit('error', new Error('This will crash'));
// });


const myObject = {};
Error.captureStackTrace(myObject);
console.log(myObject.stack);  // Similar to `new Error().stack`