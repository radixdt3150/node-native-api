const { scrypt, randomFill, createCipheriv, createDecipheriv, scryptSync } = require("node:crypto")

const algorithm = "aes-192-cbc"
const secretKey = "some-secret-key";
const saltKey = "a16bytelongsaltisrecommended";
const scryptKeyLen = 24; // FOR AES it has to be 16/24/32 byte 
const secretPayload = "This is not the secret payload";

console.log({ original: secretPayload })

const initializationVector = Buffer.alloc(16, 0)

/**
 * Encrypt a piece of data using Cipher */
// 1. Generate the key using scrypt
scrypt(secretKey, saltKey, scryptKeyLen, (err, derivedKey) => {
    if (err) throw err;
    
    // 3. Generate Cipher text with help of the Key and the initialization vector
    const cipher = createCipheriv(algorithm, derivedKey, initializationVector);

    let encrypted = "";
    cipher.setEncoding("hex");

    cipher.on("data", (chunk) => {
        // console.log({ chunk })
        encrypted += chunk
    });
    cipher.on('end', () => console.log({ encrypted }));

    cipher.write(secretPayload, 'utf-8')
    cipher.end();
});

/**
 * Decrypt encrypted data using Decipher
 */
// 1. Generate key using scrypt
const derivedKey = scryptSync(secretKey, saltKey, scryptKeyLen)
// 2. Generate Initialization vector
const iv = initializationVector;

// 3. Initiate decryption with Decipher class
const decipher = createDecipheriv(algorithm, derivedKey, iv);

// 4. Decrypt the data with update and final methods
// Encrypted using same algorithm, key and iv.
const encrypted = '1e7f91e9d2a317af91b3bd939b6ea4ef4fff5dd9d0ed57a687158787338c9977';
let decrypted = decipher.update(encrypted, 'hex', 'utf-8')
decrypted += decipher.final('utf-8');

console.log({ decrypted })
// console.log(secretPayload === decrypted)
