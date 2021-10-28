import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
// in the documents this is shown but throws an error
// import CredentialsProvider from `next-auth/providers/credentials`
const UserModel = require('../../../models/user')
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../../lib/connection';
import bcrypt from 'bcrypt';


console.log("in nextauth")


export default NextAuth({


// const options = {
    providers: [   
        // CredentialsProvider({
            Providers.Credentials({
            name: 'Custom Provider',
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
            async authorize(credentials, req) {      
                // console.log("req in next auth",req)
                try {
                    const connected = await connectToDatabase();

                    if(!connected){ console.log("not connected to the server") }

                    console.log('credentials ==>', credentials)

                    // This didn't fix it either
                    // let user: {email: string, name: string} | string | undefined | null = {name:"", email:""} ;

                    
                    let user: {email: string, name: string} = {name:"", email:""} ;

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
                } catch (error) {
                    throw new Error("There was an error on user authentication");  
                }
                
            }    
        })
    ],
    session: {
        jwt: true,
    },
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


})



// export default (req:NextApiRequest, res:NextApiResponse) => NextAuth(req, res, options);