import { ErrorDescription } from 'mongodb'
import { NativeError } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isNativeError } from 'util/types'
import { connectToDatabase } from '../../lib/connection'
const UserModel = require('../../models/user')

const bcrypt = require('bcrypt')

type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let connected = await connectToDatabase();

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
