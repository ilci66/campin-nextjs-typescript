import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useState, useEffect } from 'react'

export interface ISignUpData {
    username: string;
    email: string;
    password: string;
    password2: string;
}
// gonna use it for database/backend responses
export interface IRegisterResponse {
    success: boolean | undefined;
    message: string;
}

const SignUp: NextPage = () => {

    useEffect(() => {
        // this should clear the form after reloads
        const usernameInput = document.getElementById("sign-up-username") as HTMLInputElement;
        const emailInput = document.getElementById("sign-up-email") as HTMLInputElement;
        const passwordInput = document.getElementById("sign-up-password") as HTMLInputElement;
        const passwordInput2 = document.getElementById("sign-up-password-2") as HTMLInputElement;

        
        if(
            usernameInput.value !== "" || 
            emailInput.value !== "" || 
            passwordInput.value !== "" ||
            passwordInput2.value !== ""
        ){
            usernameInput.value = ""
            emailInput.value = ""
            passwordInput.value = ""
            passwordInput2.value = ""
        }
    }, [])

    const [ subRes, setSubRes ] = useState<IRegisterResponse>(
        {
            success: undefined,
            message: ""
        }
    )

    const [ submitted, setSubmitted ] = useState<ISignUpData>(
        {
            username:"",     
            email: "",
            password: "",
            password2: "",
        }
    )


    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("wanna register")
        console.log("submitted", submitted)
        if(submitted.password !== submitted.password2){
            // For some reason subres is showing the inital valueeven after re-setting
            console.log(submitted.password, submitted.password2, "not matching")
            await setSubRes({...subRes, success: false, message: "Passwords need the match!"})
            return console.log(subRes)
        }
        
    }
    return(<>
    <Head>
        <title>Sign Up | Campin'</title>
        <meta name="description" content="Sign Up Page" />
        <link rel="icon" href="/favicon-c.ico" />
    </Head>
        <div className="sign-up-container">
            <div className="sign-up-form-container">
                <div className="sign-up-pic">
                    <img src="/vertical-camping-pic.jpg" alt="2 campers with a nice view" />
                </div>
                <div className="sign-up-form">
                    <form onSubmit={handleSignUpSubmit} action="" className="">
                    <h1>Create an account</h1>
                    <div className="input-container">
                            <input 
                                id="sign-up-username" 
                                className="input" 
                                type="text" 
                                autoComplete="username" 
                                placeholder=" "
                                required 
                                onChange={(e) => setSubmitted({...submitted, username : e.target.value})}
                            />
                            <div className="cut">   
                                <label htmlFor="email" className="place">Username</label>
                            </div>
                        </div>
                        <div className="input-container">
                            <input 
                                id="sign-up-email" 
                                className="input" 
                                type="text" 
                                autoComplete="email" 
                                placeholder=" "
                                required 
                                onChange={(e) => setSubmitted({...submitted, email : e.target.value})}
                            />
                            <div className="cut">   
                                <label htmlFor="email" className="place">Email</label>
                            </div>
                        </div>
                        <div className="input-container">
                            <input 
                                id="sign-up-password" 
                                className="input" 
                                type="password" 
                                onChange={(e) => setSubmitted({...submitted, password : e.target.value})}
                                required 
                            />
                            <div className="cut">
                                <label htmlFor="password" className="placeholder">Password</label>
                            </div>
                        </div>
                        <div className="input-container">
                            <input 
                                id="sign-up-password-2" 
                                className="input" 
                                type="password" 
                                onChange={(e) => setSubmitted({...submitted, password2 : e.target.value})}
                                required 
                            />
                            <div className="cut">
                                <label htmlFor="password" className="placeholder">Password</label>
                            </div>
                        </div>
                        <button className="sign-up-submit-btn" type="submit">Submit</button>
                    </form>
                    </div>
            </div>
        </div>
        <style jsx>{`
            .sign-up-container{
                top: 0;
                left:0;
                width: 100%;
                height: 100%;
                position:relative;
                display:flex;
                flex-direction: column;
                align-items: center;
                justifiy-content: center;
            }
            .sign-up-form-container{
                border-radius: 20px;
                max-width: 960px;
                display:flex;
                width:100%;
                margin: 50px; auto;
                justify-content: space-between;
            }
            .sign-up-pic {
                border-radius: 20px;
                width: 42%;
            }
            .sign-up-pic img {
                border-radius: 5%;

            }
            .sign-up-form {
                background-color: #e8fecf;
                padding: 3rem;
                border-radius: 20px;
                width: 52%;
                
            }
            .sign-up-form .input-container {
                margin-top: 2rem;
            }
            .sign-up-submit-btn {
                padding: 0.5rem 1.5rem;
                font-size: 1.5rem;
                color: rgb(12, 22, 16);
                width:100%;
                margin-top: 2.5rem;
                border-radius: 20px;
                transition: 0.5s;
                border:0.7px solid rgb(15, 31, 15);
                margin-bottom: 10px;
            }
            .sign-up-submit-btn :hover {
                color: white;
                background-color: rgb(7, 36, 0);
            }
        `}</style>
    </>)
}
export default SignUp