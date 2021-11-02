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
              <form key={provider.id} action="" onSubmit={handleSignInCrendetials}>

                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <label>
                  Email
                  <input onChange={e => setEmail(e.target.value)} id="cre-email" name="email" type="text" />
                </label>
                <label>
                  Password
                  <input onChange={(e) => setPassword(e.target.value)} id="cre-password" name="password" type="password" />
                </label>
                <button >Sign in</button>
              </form>
            ); 
          }
          return (
            <div key={provider.name} className={provider.name + " social-sign-in"} >
              <button key={provider.name} onClick={() => signIn(provider.id, {callbackUrl: `${window.location.origin}/`})}>
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
        max-width:960px;
        margin: 0 auto;
      }
      .sign-in-options{
        border: 2px solid black;
        min-width:50%;
        max-width:80%;
      }
      .social-sign-in{
        border: 2px solid yellow;
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