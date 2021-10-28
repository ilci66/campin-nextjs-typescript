import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
// in the documents this is shown but throws an error
// import CredentialsProvider from `next-auth/providers/credentials`
const UserModel = require('../../../models/user')
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../../lib/connection';

import bcrypt from 'bcrypt';


// Now going to be using next-auth methods to handlle authentication na dmaybe autharization as well 
console.log("in nextauth")

const options = {
    providers: [   
        // CredentialsProvider({
            Providers.Credentials({
            name: 'Custom Provider',
            credentials: {      
                email: { label: "Email", type: "text", placeholder: "example@gmail.com" },     
                password: {  label: "Password", type: "password" }    
            },
            async authorize(credentials, req) {      
                // console.log("req in next auth",req)

                const connected = await connectToDatabase();

                if(!connected){ console.log("not connected to the server") }
                try{
                    // Add logic here to look up the user from the credentials supplied    
                    // gonna do the database call here  
                    console.log('credentials ==>', credentials)

                    // const user = await UserModel.findOne({ email: credentials.email }) 
                    let user: {email: string, name: string} = {name:"", email:""};

                    // =====>>>>>>><   gonna look back at this after my break <<<<< ====
                    await UserModel.findOne({ email: credentials.email }, async (err:object, data:{email:string, name: string, password:string}) => {
                        if(err){
                            // console.log(err)
                            throw new Error("There was an error on finding the user in database"); 
                            // return null;
                        }else if(!data){
                            throw new Error("There is no user with that email adress"); 
                            // return null;
                        }else {
                            console.log("this is the data ==>", data)

                            let comparison = await bcrypt.compare(credentials.password, data.password)

                            console.log("comparison ==> ", comparison)

                            if(comparison){
                                console.log("comparison is true ")
                                user.email = data.email;
                                user.name = data.name

                                console.log("User ==> ", user)

                                return user
                            }
                            
                        }   
                    
                    })
                    console.log("jumps here")

                    // console.log(" ==> ", user)
                    // const user = { id: 1, username: 'JSmith', email: 'jsmith@example.com' }
                    // if (user) {
                    //     return user     
                    // } else {
                    //     return null
                    // } 
                } catch(error) {
                    console.log(error)
                    throw new Error("There was an error on user authentication"); 
                }
        
            return null;      
            }    
        })
    ],
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
}

export default (req:NextApiRequest, res:NextApiResponse) => NextAuth(req, res, options);