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

// it doen't look necessary to include database here



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
            // async authorize(credentials, req) { 

            //     const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          
            //     if (user) {
            //       // Any object returned will be saved in `user` property of the JWT
            //       return user
            //     } else {
            //       // If you return null or false then the credentials will be rejected
            //       return null
            //       // You can also Reject this callback with an Error or with a URL:
            //       // throw new Error('error message') // Redirect to error page
            //       // throw '/path/to/redirect'        // Redirect to a URL
            //     }
            //   }
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
                    

                    // fixed the authorize error by addingg the return null here, typescript really works I guess
                    if(!userData){ 
                        console.log("there's no user with that email"); 
                        // throw new Error("There's no user data")
                        return false;
                    }

                    let comparison = await bcrypt.compare(credentials.password, userData.password)
                    if(!comparison){
                        console.log("passwords do not match")
                        return false;
                        // throw new Error("Wrong email address or password")
                    }

                    if(comparison){
                        console.log("comparison is true ")
                        // user.email = userData.email;
                        // user.name = userData.name
                        // console.log("id ==>",typeof userData.id, typeof userData._id)
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
                    // Redirecting to the login page with error message in the URL
                    
                    
                    return errorMessage
                    
                    // throw new Error(errorMessage)
                    
                //     console.log(error.response.data.message)
                //     throw new Error("There was an error on user authentication");  
                }
            }    
        })
    ],
    // callbacks: {
    //     redirect({ url, baseUrl }) {
    //       return url.startsWith(baseUrl) ? url : baseUrl
    //     }
    //   },
    // session: {
    //     jwt: true,
    // },
    // Any changes to the jwt causes a type error gonna look back into it later
    // jwt: {
    //     secret: process.env.JWT_SECRET
    // }
    // when I add this I'm getting and error as well
    // jwt: {
    //     signingKey: {"kty":"oct","kid":"--","alg":"HS256","k":"--"},
    //     verificationOptions: {
    //       algorithms: ["HS256"]
    //     }
    // }
    // }    
    // callbacks: {
    //     session: async (session, user) => {
    //         session.id = user.id
    //         return Promise.resolve(session)
    //     }
    // }
    session: {
        jwt: true,
    },

    // jwt: {
    //     encryption: true
    // },
    // secret: process.env.JWT_SECRET,

    // callbacks: {
    //     session: async (session, user) => {
    //         session.id = user.id
    //         return Promise.resolve(session)
    //     }
    // },
    pages: {    
        signIn: "/sign-in",
    },
}   

// })



export default (req:NextApiRequest, res:NextApiResponse) => NextAuth(req, res, options);