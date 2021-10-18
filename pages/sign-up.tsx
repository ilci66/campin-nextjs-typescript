import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Sign-up.module.css'
import  validator from 'validator';
import axios from 'axios';

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


console.log(process.env.SITE_URL)
const SignUp: NextPage = () => {

    console.log(process.env.SITE_URL)
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
        window.onclick = (event) => { console.log(event.target) }
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
        } else if(!validator.isEmail(submitted.email)) {
            await setSubRes({...subRes, success: false, message: "Please enter a valid email address"})
            return;
        }else if(
            submitted.password == "" || 
            submitted.password2 == "" || 
            submitted.username == "" ||
            submitted.email == "") {
                await setSubRes({...subRes, success: false, message: "Missing required fields"})
                return;
        }else {
            const url:string = process.env.NEXT_PUBLIC_SITE_URL!;
            
            axios.post(`${url}/api/user`, submitted)
            // await setSubRes({...subRes, success: true, message: "Account Successfuly created!"})
            // await setSubRes({...subRes})
            console.log("url",url)
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
        <div id="sign-up-message-modal"  className={styles.signUpModal}>
            {/* make the design look more like the sign in modal */}
            <div className={styles.signUpMessageBox}>
                <p id="sign-up-modal-text" className={styles.signUpMessage}></p>
                <button className={styles.messageModalCloseBtn} onClick={handleHideReset}>Close</button>
                {subRes.success === true &&
                    <Link href="/">
                        <button className={styles.signUpSuccessButton}>
                        <a className={styles.homePageButton}>
                            Home Page
                        </a>
                        </button>   
                    </Link>}
            </div>
        </div>
        <div  className={styles.signUpContainer}>
            <div className={styles.signUpFormContainer}>
                <div className={styles.signUpPic}>
                    <img src="/vertical-camping-pic.jpg" alt="2 campers with a nice view" />
                </div>
                <div className={styles.signUpForm}>
                    <form onSubmit={handleSignUpSubmit} action="" className="">
                    <h1>Create an account</h1>
                    <div 
                    className={styles.inputContainer}
                    // className="input-container"
                    >
                            <input 
                                id="sign-up-username" 
                                className={styles.input} 
                                // className="input"
                                type="text" 
                                autoComplete="username" 
                                placeholder=" "
                                required 
                                onChange={(e) => setSubmitted({...submitted, username : e.target.value})}
                            />
                            <div 
                            className={styles.cut}
                            // className="cut"
                            >   
                                <label htmlFor="email" className={styles.place}>Username</label>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <input 
                                id="sign-up-email" 
                                className={styles.input} 
                                type="text" 
                                autoComplete="email" 
                                placeholder=" "
                                required 
                                onChange={(e) => setSubmitted({...submitted, email : e.target.value})}
                            />
                            <div className={styles.cut}>   
                                <label htmlFor="email" className={styles.place}>Email</label>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <input 
                                id="sign-up-password" 
                                className={styles.input} 
                                type="password" 
                                onChange={(e) => setSubmitted({...submitted, password : e.target.value})}
                                required 
                            />
                            <div className={styles.cut}>
                                <label htmlFor="password" className={styles.placeholder}>Password</label>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <input 
                                id="sign-up-password-2" 
                                className={styles.input} 
                                type="password" 
                                onChange={(e) => setSubmitted({...submitted, password2 : e.target.value})}
                                required 
                            />
                            <div className={styles.cut}>
                                <label htmlFor="password" className={styles.placeholder}>Password</label>
                            </div>
                        </div>
                        <button className={styles.signUpSubmitBtn} type="submit">Submit</button>
                    </form>
                    </div>
            </div>
        </div>
    </>)
}
export default SignUp