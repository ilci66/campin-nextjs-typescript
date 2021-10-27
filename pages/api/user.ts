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
    success?: true;
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
        case 'GET': 
            // console.log(req.headers.authorization);
            // console.log("request made to the user info", req.headers.authorization)
            
            if(req.headers.authorization !== ""){
                console.log("token exists in auth header")
    
                const pathToKey = await path.join(__dirname, '../../../../', 'id_rsa_pub.pem');
    
                const PUB_KEY = await fs.readFileSync(pathToKey, 'utf8');
    
                let verified = jwt.verify(req.headers.authorization!.split(" ")[1], PUB_KEY);
    
                console.log("verified ==> ", verified);
                console.log(new Date(verified.iat))
                console.log(new Date(verified.exp))

    
            }else{
                res.status(400).json({ message: "something went wrong" })
            }
        break;
        case 'POST': 
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
            break;
        }
    }
    console.log("not connected")
//   res.status(200).json({ name: 'John Doe' })
}
