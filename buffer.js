const { Buffer } = require("node:buffer");

console.time("Safe")
console.timeLog("Safe");
const zeroInitBuff = Buffer.alloc(10);
console.timeLog("Safe");
console.timeEnd("Safe")
console.log(zeroInitBuff)

// Initialize a Buffer of length 10 with default value as 1
const oneInitBuff = Buffer.alloc(10, 1);

console.time("Unsafe")
console.timeLog("Unsafe");
const unsafeBuff = Buffer.allocUnsafe(10)
console.timeLog("Unsafe");
console.timeEnd("Unsafe")
console.log(unsafeBuff)

// Creates a Buffer containing the bytes [1, 2, 3].
const buf4 = Buffer.from([1, 2, 3]);
console.log({ buf4 })

const buf6 = Buffer.from('tést');
console.log({ buf6 })

// Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
const buf7 = Buffer.from('tést', 'latin1');
console.log({ buf7 })

const buf = Buffer.from('hello world', 'utf8');
console.log(buf.length, buf.toString('hex'));