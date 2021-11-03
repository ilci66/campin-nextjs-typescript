import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import GoogleProvider from 'next-auth/providers/google'
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import Adapters from "next-auth/adapters";
// in the documents this is shown but throws an error
// import CredentialsProvider from `next-auth/providers/credentials`
const UserModel = require('../../../models/user')
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../../lib/connection';
import bcrypt from 'bcrypt';
import { resolve } from "path/posix";


console.log("in nextauth")

// it doen't look necessary to include database here for now



// it works the same in both ways just wrote here as reminder for future reference
// export default NextAuth({

const options = {
    providers: [   
        // FacebookProvider({
        Providers.Facebook({
            clientId: process.env.FB_ID,
            clientSecret: process.env.FB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // well I'm not using a database for now and this is suggested by the documentation
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        }),


        // CredentialsProvider({
        Providers.Credentials({
            name: 'Campin Account',
            credentials: {      
                email: { label: "Email", type: "text", placeholder: "example@gmail.com" },     
                password: {  label: "Password", type: "password" }    
            },
            async authorize(credentials) {    
                
                console.log("in auth ==> credentials")

                try {
                    const connected = await connectToDatabase();

                    if(!connected){ 
                        console.log("not connected to the server") 
                        throw new Error("Not connected to the server")
                    }
                    

                    console.log('credentials ==>', credentials)
                    
                    let user: {email: string, name: string} = {name:"", email:""} ;

                    const userData = await UserModel.findOne({ email: credentials.email }).clone();
                    
                    if(!userData){ 
                        console.log("there's no user with that email"); 
                        // throw new Error("There's no user data")
                        return false;
                    }

                    let comparison = await bcrypt.compare(credentials.password, userData.password)
                    if(!comparison){
                        console.log("passwords do not match")
                        return false;
                    }

                    if(comparison){
                        console.log("comparison is true ")

                        user.name = userData.name
                        user.email= userData.email

                        console.log("User ==> ", user)
                        return user
                    }
                    console.log("gonna return null")
                    
                    return null;   
                } catch (error:any) {
                    const errorMessage = error.response.data.message
                    console.log("error message", errorMessage)

                    return errorMessage
                    
                    // throw new Error(errorMessage)
                    
                //     console.log(error.response.data.message)
                //     throw new Error("There was an error on user authentication");  
                }
            }    
        })
    ],
    session: {
        jwt: true,
    },
    pages: {    
        signIn: "/sign-in",
    },
}   

// })



export default (req:NextApiRequest, res:NextApiResponse) => NextAuth(req, res, options);