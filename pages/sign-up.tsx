import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export interface ISignUpData {
    username: string;
    email: string;
    password: string;
    password2: string;
}

export interface IRegisterResponse {
    success: boolean | undefined;
    message: string;
}


const SignUp: NextPage = () => {

    const [show, setShow] = useState(false)

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

    const handleHide = () => {
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
    }

    useEffect(() => {
        handleHide()
    }, [])



    // useEffect(() => {
    //     if(subRes.message !== ""){
    //         console.log("message ==>", subRes.message)
    //         setShow(true)
    //         const modal: HTMLElement = document.getElementById('sign-up-message-modal') !;
    //         const modalText : HTMLElement = document.getElementById('sign-up-modal-text') !;
    //         modalText.innerText = subRes.message; 
    //         modal.style.display = "block"  
    //     }
    // }, [subRes.message]);

    useEffect(() => {
        if(subRes.success !== undefined && subRes.message !== ""){
            console.log("message ==>", subRes.message)
            console.log("success ==> ", subRes.success)
            setShow(true)
            const modal: HTMLElement = document.getElementById('sign-up-message-modal') !;
            const modalText : HTMLElement = document.getElementById('sign-up-modal-text') !;
            modalText.innerText = subRes.message; 
            modal.style.display = "block"  
        }
    }, [subRes.success, subRes.message]);

    // useEffect(() => {
    //     if(subRes.success !== undefined){
    //         console.log("success ==>", subRes.success)
    //         if(subRes.success == false){ 
    //             alert("it's false")
    //         }
    //         else{ 
    //             alert("it's true")
    //         }
    //     }
    // }, [subRes.success]);

    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("wanna register")
        console.log("submitted", submitted)
        if(submitted.password !== submitted.password2){
            console.log(submitted.password, submitted.password2, "not matching")
            // Had to set values on eby one otherwise it doesn't show
            await setSubRes({...subRes, success: false, message: "Passwords need the match!"})
            // await setSubRes({...subRes,)
            return;
        }else {
            await setSubRes({...subRes, success: true, message: "Account Successfuly created!"})
            // await setSubRes({...subRes})
            return;
        }
    }


    useEffect(() => {
        const modal: HTMLElement = document.getElementById('sign-up-message-modal') !;
        if(show){
            modal.style.display = "block"  
        }else{
            console.log('supposed to hide')
            modal.style.display= "none"
        }
    }, [show])

    useEffect(()=>{
        if(window && show === true){
            const modal: HTMLElement = document.getElementById('sign-up-message-modal')!;

            window.onclick = (event) => {
                const { target } = event

                if (target == modal) {
                    modal.style.display = "none";
                    // setShow(false)
                    // setSubRes({...subRes, message: "", success: false})
                    handleHideReset();
                }
            }
            return;
        }
    },
    [show])
    
    const handleHideReset = () => {
        handleHide();
        setShow(false); 
        setSubRes({...subRes, message: "", success: undefined})
    }

    return(<>
    <Head>
        <title>Sign Up | Campin'</title>
        <meta name="description" content="Sign Up Page" />
        <link rel="icon" href="/favicon-c.ico" />
    </Head>
        <div id="sign-up-message-modal" className="sign-up-modal">
            {/* make the design look more like the sign in modal */}
            <div className="sign-up-message-box">
                <p id="sign-up-modal-text" className="sign-up-message"></p>
                <button className="message-modal-close-btn" onClick={handleHideReset}>X</button>
                {subRes.success === true &&
                    <Link href="/">
                        <button className="sign-up-success-button">
                        <a className="home-page-button">
                            Home Page
                        </a>
                        </button>   
                    </Link>}
            </div>
        </div>
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
            .sign-up-modal{
                display: none;
                position: fixed; 
                z-index: 1; 
                padding-top: 100px; 
                left: 0;
                top: 0;
                width: 100%; 
                height: 100%;
                overflow: auto; 
                background-color: rgb(0,0,0); 
                background-color: rgba(0,0,0,0.4);
            }
            .sign-up-message-box {
                padding:1.2rem;
                background: white;
                position: relative;
                border-radius: 20px;
                margin: auto;
                border: 1px solid #888;
                max-width:500px;
                width: 50%;
                -webkit-animation-name: animatetop;
                -webkit-animation-duration: 0.4s;
                animation-name: animate-top;
                animation-duration: 0.4s
            }
            .sign-up-message {
                font-size: 1.3rem;
                color: blue;
                margin: 0 auto;
                padding: 10px;
            }
            .sign-up-success-button{
                padding: 0.5rem 1.5rem;
                font-size: 1.5rem;
                color: rgb(12, 22, 16);
                width:100%;
                margin-top: 0.5rem;
                border-radius: 20px;
                transition: 0.5s;
                border:0.7px solid rgb(15, 31, 15);
                margin-bottom: 10px;
              }
              .sign-up-success-button:hover{
                color: white;
                background-color: rgb(7, 36, 0);
              }
            @keyframes animate-top {
                from {top: -300px; opacity: 0}
                to {top: 0; opacity: 1}
            }
            .message-modal-close-btn {
                background-color: red;
                padding:5px;
                color: white;
                border-radius: 20px;
                position: absolute;
                top:0;
                right:0;
                border:none;
                padding:0.6rem;
                cursor:pointer;
            }
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