import crypto from 'crypto';
import fs from 'fs';

async function genKeyPair(): Promise<boolean> {
    
    const keyPair = await crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1" 
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        }
    });

    // Create the public key file
    await fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey); 
    
    // Create the private key file
    await fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);

    return true
}

// Generate the keypair
module.exports = genKeyPair();