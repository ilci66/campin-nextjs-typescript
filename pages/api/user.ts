import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/connection'
import UserModel from '../../models/user'

type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let connected = await connectToDatabase();

    console.log("request made",req.body)
    const { username, email, password } = req.body
    if(connected){
            switch(req.method) {
            case 'GET': {
                console.log("gonna get the user info here")
            }
            break;
            case 'POST': {
                console.log("request to a user")
                UserModel.findOne({email: email}, (err:object, data:object) => {
                    if(err){
                        console.log("error in database", err)
                        return;
                    }else if(data){
                        console.log("there's an account with that email address")
                        return;
                    }else{
                        console.log("Time to create the user")
                        let newUSer = new UserModel({
                            username: username,
                            email: email,
                            
                        })
                        return;
                    }
                })
            }
        }
    }
    console.log("not connected")
//   res.status(200).json({ name: 'John Doe' })
}
