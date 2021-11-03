import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Head from 'next/head'
import { providers, signIn, getSession, csrfToken, CtxOrReq } from "next-auth/client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


interface ISingInProps {
  providers: object;
  csrfToken: string;
}


const SignIn = ({ providers, csrfToken }: ISingInProps) => {

  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false);
  
  let errCon: EventTarget | null;
  
  useEffect(() => {
    errCon = document.getElementById("sign-in-error-container");
  })

  const handleSignInCrendetials = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("signing up with ==> ",email, password)

    const res = await signIn('credentials',
      {
        csrfToken,
        email,
        password,
        // callbackUrl: `${window.location.origin}/`, 
        redirect: false,
      }
    )
    console.log("sign in response => ", res)

    if (res?.error){ handleError(res.error)}
    if (res!.ok) router.push(window.location.origin);
    

  }
  const handleError = (error: any) => {
    console.log('there is an error in sign in')
    console.log(error)

    setShow(true);
    // const errCon = document.getElementById("sign-in-error-container");
    // errCon?.classList.add("error-show")
  }

  const hideError = () => {
    // const errCon = document.getElementById("sign-in-error-container");
    setShow(false);
    // errCon?.classList.remove("error-show")
  }

  useEffect(() => {
    console.log("in useeffect")
    // const errCon = document.getElementById("sign-in-error-container"); 
    if(window && show){
      console.log("there is window")
      window.onclick = (event) => {
        if(event.target == errCon){
          console.log("yea")
          setShow(false)
        }
      } 
    }
  }, [show])

  useEffect(()=>{

    console.log("show ==>", show)

    if(show){
      
      errCon?.classList.remove("error-hide")
    }else{
      errCon?.classList.add("error-hide")
    }
    
    
  }, [show])


  return (<>
      <Head>
        <title>Sign In | Campin'</title>
        <meta name="description" content="Sign In Page of Campin'" />
        <link rel="icon" href="/favicon-c.ico" />
      </Head>
      <div className="error-container" id="sign-in-error-container">
        <div className="error-box">
          <p className="error-text">Wrong email address or password.</p>
          <button className="error-close" onClick={hideError}>Close</button>
        </div>
      </div>
      <div className="sign-in-page-container">
        <div className="sign-in-options">
          {Object.values(providers).map((provider) => {if (provider.name === "Campin Account") {
            return(
              <div key={provider.name} className="sign-in-credentials">
                <p className="credential-title">Sign in Campin' account</p>
              <form key={provider.id} action="" onSubmit={handleSignInCrendetials}>    
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <div className="sign-in-input-field">
                  <div className="label-container">
                    <label>Email: </label>
                  </div>
                    <input 
                    onChange={e => setEmail(e.target.value)} 
                    id="cre-email" 
                    required
                    name="email" 
                    type="text" />
                </div>
                <div className="sign-in-input-field">
                  <div className="label-container">
                    <label>Password: </label>
                  </div>
                    <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    id="cre-password" 
                    name="password" 
                    required
                    type="password" />
                </div>
               
                <button 
                  className="credenial-sign-in-button">
                  <img className="credential-logo" src="/campin-logo.png" alt="" />
                  Sign in with Campin'
                  </button>
              </form>
              </div>
            ); 
          }
          
          return (
            <div key={provider.name} className={provider.name + " social-sign-in"} >
              <button key={provider.name} className={`provider-sign-in-button ${provider.name}-button`}onClick={() => signIn(provider.id, {callbackUrl: `${window.location.origin}/`})}>
                <img className="provider-logo" src={`${provider.name}.png`} alt="" />
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
    <style jsx>{`
      .error-container{
        position:absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        
      }
      .error-hide{
        display:none
      }

      .error-box{
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s;
        position:relative;
        margin: 0 auto;
        margin-top:110px;
        border: 0.6px solid var(--main-blue-green);
        max-width: 300px;
        background-color: var(--main-header-color);
        padding:20px;
        border-radius: 20px;
      }
      @keyframes animatetop {
        from {top: -300px; opacity: 0};
        to {top: 0; opacity: 1};
      }
      .error-text{
        color: var(--main-text-color);
      }
      .error-close{
        position:absolute;
        top:0;
        right:0;
        margin:4px;
        padding:5px;
        background: var(--secondary-red);
        color: var(--main-text-color);
        border:none;
        border-radius: 20px;
      }
      .error-show{
        display:block;
      }
      .sign-in-page-container{
        min-height: 100vh;
        border: 2px solid red;
        padding:50px;
        max-width:960px;
        margin: 0 auto;
      }
      .sign-in-options{
        background-color: var(--secondary-blue-green);
        border-radius: 20px;
        margin:0 auto;
        padding:50px 20px;
        min-width:200px;
        max-width:80%;
      }
      .sign-in-credentials{
        border-radius: 0 0 5px 5px;
        padding:10px 20px 30px 20px;
        border-top: 4px solid var(--main-footer-color);
        background-color: var(--main-text-color);
        display: grid;
      }
      .credential-title{
        margin-bottom:30px;
        font-size:1.2rem;
        border-bottom: 2px solid var(--main-footer-color);
      }
      .sign-in-input-field{
        position: relative;
        margin-bottom: 15px;
      }
      .sign-in-input-field>input{
        width:100%;
        margin: 10px 0;
        border-radius: 5px;
        border:none;
        padding:15px;
      }
      .label-container {
        position: absolute;
        top: 10px;
        left: 4px;
        font-size: 0.8em;
        transition: 0.6s;
        font-family: sans-serif;
      }
      
      .sign-in-input-field:hover .label-container,
      .sign-in-input-field:focus .label-container,
      .sign-in-input-field:valid .label-container{
        transform: translateY(-20px);
        font-size:1rem;
      }

      // .inputContainer input:focus ~ .cut,
      // .inputContainer input:valid ~ .cut {
      //   transform: translateX(-13px) translateY(-25px);
      //   font-size: 1em;
      // }
      .social-sign-in{
        background: var(--main-text-color);
        padding:5px;
        border: 2px solid yellow;
        margin: 10px 0;
        border-radius:5px;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .provider-logo{
        float:left;
        width: 40px
      }
      .credential-logo{
        float:left;
        width: 80px;
      }
      .provider-sign-in-button{
        width:100%;
        display: grid;
        grid-template-columns: auto 1fr;
        color: var(--main-text-color);
        align-items:center;
        font-size: 1.4rem;
        padding:5px;
      }
      .provider-sign-in-button:hover{
        cursor:pointer;
      }
      .credenial-sign-in-button{
        width:100%;
        display: grid;
        grid-template-columns: auto 1fr;
        color: var(--main-text-color);
        align-items:center;
        font-size: 1.4rem;
        padding:5px;
        border:none;
        border-radius: 5px;
        border: 1px solid var(--main-footer-color);
        background: var(--main-footer-color);
        transition: 0.2s;
      }
      .credenial-sign-in-button:hover{
        cursor:pointer;
        background: var(--main-text-color);
        color: var(--main-footer-color);
      }
      .Facebook-button{
        background-color: var(--facebook-color)
      }
      .Google-button {
        background-color: var(--google-color)
      }
    `}</style>
    </>)
}

SignIn.getInitialProps = async (context: {req: any, res: any}) => {

  // console.log("context ==> ",context)

  const { req, res } = context;
  // console.log(res)
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
};

export default SignIn