import Link from 'next/link'
import Image from 'next/image'
import { NextComponentType, GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client';
import axios from 'axios'
import Navbar from './Navbar';
const Cookies = require('js-cookie');

export interface ISignInData {
    email: string;
    password: string;
}


export interface IResponse {
    success: boolean;
    token?: string;
    expiresIn: string | number;
    username?:string;
    message: string;

}

export interface IProps {
    handleCloseModal:() => void;
    token?:string;
    setIsFetching:(arg0:boolean) => void
    setNameNavbar:(arg0:string) => void
    
}


const SignInModal = ({ handleCloseModal, setIsFetching, setNameNavbar }:IProps ) => {

    const url:string = process.env.NEXT_PUBLIC_SITE_URL!;

    const getUserInfo = () => {
        setIsFetching(true);

        let token = Cookies.get("token");
        axios.get<IResponse>(`${url}/api/user/`, { headers: { Authorization: token } })
            .then(res => {
                if(res.statusText ==="OK" ){
                    console.log("getting user", res.data);
                    setNameNavbar(res.data.username!)
                    setIsFetching(false);
                }
            })
            .catch((error) => {
                console.log('error ' + error);
            });

    }
  

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
            
        axios.post<IResponse>(`${url}/api/login/`, credentials)
            .then(res => {
                if(res.data.success){
                    console.log(res.data)
                    getUserInfo();
                }
            });

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
