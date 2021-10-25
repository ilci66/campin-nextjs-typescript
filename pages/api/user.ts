import { ErrorDescription } from 'mongodb'
import { NativeError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isNativeError } from 'util/types'
import { connectToDatabase } from '../../lib/connection'
const UserModel = require('../../models/user')

//tyring to fix the overwrite error ==> fixed it with the try catch block in model file
// const mongoose = require('mongoose')
// const UserModel = require('../../models/user')

const bcrypt = require('bcrypt')

type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let connected = await connectToDatabase();

    // console.log("request made",req.body)

    const { username, email, password } = req.body
    if(connected){
            console.log("connected to database")
            switch(req.method) {
            case 'GET': {
                console.log("gonna get the user info here")
            }
            break;
            case 'POST': {
                console.log("request to create a user")
                UserModel.find({email: email}, async (err:object, data:object) => {
                    if(err){
                        console.log("error in database", err)
                        return;
                    }
                    // else if(data){
                    //     console.log(data, "there's an account with that email address")
                    //     return;
                    // }
                    else{
                        console.log("Time to create the user")
                        try {
                            const hash = await bcrypt.hash(password, 10);
                            let newUser = await new UserModel({
                                username: username,
                                email: email,
                                password: hash
                            })
                            newUser.save((err: string | undefined, data:object) => {
                                if(err){ throw new Error(err)}
                                console.log("saved ==>", data)
                                return res.status(201);
                            })
                            // bcrypt.hash(password, 10, (err:string, hash:string) => {
                            //     if(err){ throw new Error(err)}

                            //     console.log("no error gonna salt now")
                                
                            //     let newUser = new UserModel({
                            //         username: username,
                            //         email: email,
                            //         password: hash
                            //     })
                            //     newUser.save((err, data:object) => {
                            //         console.log("saved ==>", data)
                            //         res.status(201)
                            //     })
                            // });
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
