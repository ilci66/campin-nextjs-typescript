import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Head from 'next/head'
import { providers, signIn, getSession, csrfToken, CtxOrReq } from "next-auth/client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';


// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

// got a little lazy with the types here i will take another look after everything else is done
interface ISingInProps {
  providers: object;
  csrfToken: string;
}

const SignIn = ({ providers, csrfToken }: ISingInProps) => {


  // const [loginError, setLoginError] = useState('')
  // const router = useRouter()
  // useEffect(() => {
  //   // Getting the error details from URL
  //   if (router.query.error) {
  //     setLoginError(router.query.error) // Shown below the input field in my example
  //     setEmail(router.query.email) // To prefill the email after redirect
  //   } 
  // }, [router])



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSignInCrendetials = (e: React.FormEvent) => {
    e.preventDefault();

    // Ok this method kinda works but it's not the one I should be using 
    // const data = {
    //   csrfToken : csrfToken,
    //   email: "test1@gmail.com",
    //   password: "test1"
    // }

    // axios.post(`/api/auth/callback/credentials`, data)
    //   .then(res => { console.log(res)})

    // ====> This is another method I used before <=====
    // console.log("sign in with =>", email, password);

    signIn('credentials',
      {
        email,
        password,
        // The page where you want to redirect to after a 
        // successful login
        // callbackUrl: `${window.location.origin}/` 
      }
    )


    
    // signIn()
  }

  // This was a method apparently someone's using to handle error
  // const res = await signIn('credentials',
  //   {
  //     email,
  //     password,
  //     callbackUrl: `${window.location.origin}/account_page` 
  //     redirect: false,
  //   }
  // )
  // if (res?.error) handleError(res.error)
  // if (res.url) router.push(res.url);

  // console.log(providers)
  // console.log(csrfToken)
  

  return (<>
      <Head>
        <title>Sign In | Campin'</title>
        <meta name="description" content="Sign In Page of Campin'" />
        <link rel="icon" href="/favicon-c.ico" />
      </Head>
      <div className="sign-in-page-container">
        <div className="sign-in-options">
          {Object.values(providers).map((provider) => {if (provider.name === "Campin Account") {
            return(
              // <form method="post" key={provider.name} action="/api/auth/signin/credentials">
                <form key={provider.name} onSubmit={handleSignInCrendetials}>

                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <label>
                  Email
                  <input name="email" onChange={(e) => setEmail(e.target.value)} type="text" />
                </label>
                <label>
                  Password
                  <input name="password" onChange={(e) => setPassword(e.target.value)} type="password" />
                </label>
                <button type="submit">Sign In With {provider.name}</button>
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