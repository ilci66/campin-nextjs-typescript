const jwt = require('jsonwebtoken');
import fs from 'fs';
import path from 'path';
const genKeyPair = require('./gen-keys');
// there are so many extra files in between, maybe there's abetter way to solve this but moving on until refactoring
const pathToKey = path.join(__dirname, '../../../../', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');


async function issueJWT(user:{_id: string}) {

  await genKeyPair;

  const _id = user._id;
  
  // in days
  const expiresIn = 1;

  const payload = await {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = await jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: "Bearer" + " " + signedToken,
    expires: expiresIn
  }
}

module.exports.issueJWT = issueJWT;