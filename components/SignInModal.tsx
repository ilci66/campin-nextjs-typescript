import Link from 'next/link'
import Image from 'next/image'
import { NextComponentType } from 'next';
import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client';
import axios from 'axios'
const Cookies = require('js-cookie');

export interface ISignInData {
    email: string;
    password: string;
}

export interface Succesful {
    success: boolean;
    token: string;
    expiresIn: string | number;
}
export interface Unsuccessful {
    success: boolean;
    message: string;
    token?:string;
    expiresIn?:string | number;

}

interface ISignIn {
    handleCloseModal:() => void;
}


const SignInModal = ({ handleCloseModal }: ISignIn) => {

    const [ credentials, setCredentials ] = useState<ISignInData>(
        {
            email: "",
            password: "",
        }
    )

    const [ session, loading ] = useSession();

    const handleSignInSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        console.log("clicked sign in")
        console.log("credentials ==>", credentials)    

        const url:string = process.env.NEXT_PUBLIC_SITE_URL!;
            
        axios.post<Succesful|Unsuccessful>(`${url}/api/auth/`, credentials)
            .then(res => {
                if(res.data.success){

                    console.log(res.data)

                    Cookies.set('token', res.data.token, { sameSite: 'strict' }, { expires: res.data.expiresIn }, { domain: url })

                }

            })

        console.log("url",url)
        return;    
    }

    return (
        <div id="my-modal" className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-header">Hello Camper!</h2>
                    <button id="modal-close-button" className="modal-close" onClick={handleCloseModal}>
                        Close
                    </button>
                </div>
                <div className="modal-body">
                    <form action="" onSubmit={handleSignInSubmit} className="modal-form">
                        <div className="input-container input-1">
                            <input 
                                id="sign-in-email" 
                                className="input" 
                                type="text" 
                                autoComplete="email" 
                                placeholder=" "
                                onChange={(e) => setCredentials({...credentials, email : e.target.value})}
                                required 
                            />
                            <div className="cut cut-short">   
                                <label htmlFor="email" className="place">Email</label>
                            </div>
                        </div>
                        <div className="input-container input-2">
                            <input 
                                id="sign-in-password" 
                                className="input" 
                                type="password" 
                                onChange={(e) => setCredentials({...credentials, password : e.target.value})}
                                required 
                            />
                            <div className="cut">
                                <label htmlFor="password" >Password</label>
                            </div>
                            
                        </div>
                        <button type="submit" id="modal-sign-in" className="modal-sign-in">Sign in</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <p className="modal-footer-text">Don't you have an account?</p>
                    <Link href="/sign-up"><a className="modal-sign-up-link" onClick={handleCloseModal}>Sign Up</a></Link>
                </div>
            </div>
        </div>
    )
}

export default SignInModal
