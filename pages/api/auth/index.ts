// this page will handle the logins with email and password, other auth types such as google 
// and facebook will be handled in the [...nextauth].ts

import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
import validator from 'validator';
import { connectToDatabase } from '../../../lib/connection';
import mongoose from 'mongoose';
import fs from 'fs'
import path from 'path';
const utils = require('../../../lib/utils')
//import again cause an error
const UserModel = require('../../../models/user'); 
const Cookies = require('js-cookie');

import { NextApiRequest, NextApiResponse } from "next";

const jwtsecret = process.env.JWT_SECRET;

// const PRIV_KEY = 

if(!jwtsecret) { console.log('there\'s no jwt secret') };

type Succesful = {
  success: boolean;
  token: object;
  expiresIn: number;
}
type Unsuccessful = {
  success: boolean;
  message: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Succesful | Unsuccessful> 
) {
  const { method } = req;

  const SALT_NUM: string|undefined = process.env.SALT_NUM;

  if(!SALT_NUM){return console.log("salt number is not available in auth/index")}

  let connected = await connectToDatabase();

  try {
    switch(method){
      case 'POST':

        const { email, password } = req.body

        if(!validator.isEmail(email)){ 
          console.log("invalid email, backend") 
          return;
        }else if(!email || !password){
          console.log("No email or password");
          return;
        }else{
          interface User {
            name: string;
            email: string;
            password: string;
        }
          UserModel.findOne({ email : email }, async (err:object, data:User) => {
            if(err || !data){
              console.log(" An error occured while looking for it in the database")
            }else{
              try {
                let match :boolean = await bcrypt.compare(password, data.password);
                // when there is a match issue the jwt
                if(match){
                  console.log("it's a match, sending jwt")
                  const tokenObject = await utils.issueJWT(data);

                  //trying something here
                  // Cookies.set('token', tokenObject.token, { sameSite: 'strict' }, { expires: tokenObject.expiresIn }, { domain: process.env.url })

                  res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
                  return;
                }
                
                // console.log('Passwords matched')
                // let payload = {email: email}
              } catch (error) {
                console.log(error)
                return;
              }
            }
          })
          // after the break compare passwords
        //   bcrypt.compare(password, hash, function(err, result) {
        //     // result == true
        // });
        }
        break;
        case 'GET':
          // ==> Here will recieve a request automatically at refresh with the token

          // try {
          //     // here I will handle the get requests for logins mainly 
          //     // I need to extract the jwt, get the id if it's not expired
          //     // do a search, get the user info and send back the info
          //     const pathToKey = path.join(__dirname, '../../../../', 'id_rsa_pub.pem');
          //     const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
          //     if(!PUB_KEY){ console.log("there's no public key bro!"); return; }

          //     // jwt.verify(token, secretOrPublicKey, [options, callback])
          // } catch (error) {
              
          // }
        break;
    }
  } catch (error) {
    
  } 

  // res.status(200).json({ name: 'John Doe' })
}
