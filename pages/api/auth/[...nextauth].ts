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
            async authorize(credentials) {      
                // console.log("req in next auth",req)

                const connected = await connectToDatabase();

                if(!connected){ console.log("not connected to the server") }

                console.log('credentials ==>', credentials)

                let user: {email: string, name: string} = {name:"", email:""};

                const userData = await UserModel.findOne({ email: credentials.email }).clone();
                if(!userData){ console.log("there's no user with that email"); return;}

                let comparison = await bcrypt.compare(credentials.password, userData.password) 
                if(comparison){
                    console.log("comparison is true ")
                    user.email = userData.email;
                    user.name = userData.name

                    console.log("User ==> ", user)
                    return user
                }
                console.log("gonna return null")
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