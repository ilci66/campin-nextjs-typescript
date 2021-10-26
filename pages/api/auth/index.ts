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
    }
  } catch (error) {
    
  } 

  // res.status(200).json({ name: 'John Doe' })
}
