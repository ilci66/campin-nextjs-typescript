import { ErrorDescription } from 'mongodb'
import { NativeError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isNativeError } from 'util/types'
import { connectToDatabase } from '../../lib/connection'
const UserModel = require('../../models/user')
const jwt = require('jsonwebtoken');
import path from 'path';
import fs from 'fs';

const bcrypt = require('bcrypt')

// type Data = {
//     name: string
// }

type Response = {
    success: true;
    email?: string;
    username?: string;
    message?: string; 
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {


    let connected = await connectToDatabase();


    if(connected){
            console.log("connected to database")
            switch(req.method) {
            case 'GET': {
                // ===> I got confused api/user was supposed to be for creating the user, or changing password or stuff <===
                // console.log("gonna get the user info here");

                // try {
                //     // here I will hand le the get requests for logins mainly 
                //     // I need to extract the jwt, get the id if it's not expired
                //     // do a search, get the user info and send back the info
                //     const pathToKey = path.join(__dirname, '../../../../', 'id_rsa_pub.pem');
                //     const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
                //     if(!PUB_KEY){ console.log("there's no public key bro!"); return; }

                //     // jwt.verify(token, secretOrPublicKey, [options, callback])
                // } catch (error) {
                    
                // }

                
            }
            break;
            case 'POST': {

                const { username, email, password } = req.body

                console.log("request to create a user")

                UserModel.findOne({email: email}, async (err:object, data:object) => {
                    if(err){
                        console.log("error in database", err)
                        return;
                    }else if(data){
                        console.log(data, "there's an account with that email address")
                        return;
                    }else if(!data){
                        console.log("Time to create the user")
                        try {
                            const hash = await bcrypt.hash(password, process.env.SALT_NUM);
                            let newUser = await new UserModel({
                                name: username,
                                email: email,
                                password: hash
                            })
                            newUser.save((err: string | undefined, data:object) => {
                                if(err){ throw new Error(err)}
                                console.log("saved ==>", data)
                                return res.status(201);
                            })
                        } catch (error) {
                            console.log("error ==>",error)
                            return;
                        }
                        return;
                    }
                })
            }
        }
    }
    console.log("not connected")
//   res.status(200).json({ name: 'John Doe' })
}
