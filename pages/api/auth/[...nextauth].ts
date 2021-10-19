import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
// in the documents this is shown but throws an error
// import CredentialsProvider from `next-auth/providers/credentials`
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const options = {
    providers: [   
        // CredentialsProvider({
            Providers.Credentials({
            name: 'Custom Provider',
            credentials: {      
                email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },     
                password: {  label: "Password", type: "password" }    
            },
            async authorize(credentials, req) {      
                try{
                    // Add logic here to look up the user from the credentials supplied    
                    // gonna do the database call here  
                    const user = { id: 1, username: 'JSmith', email: 'jsmith@example.com' }
                    if (user) {
                        return user     
                    } else {
                        return null
                    } 
                }catch(error){
                    throw new Error("There was an error on user authentication"); 
                }   
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