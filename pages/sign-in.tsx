import type { NextPage } from 'next'
import Head from 'next/head'
import { providers, signIn, getSession, csrfToken, CtxOrReq } from "next-auth/client";
import axios from 'axios';
import React from 'react';

// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

// got a little lazy with the types here i will take another look after everything else is done
interface ISingInProps {
  providers: object;

  csrfToken: string;
}

const SignIn = ({ providers, csrfToken }: ISingInProps) => {


  const signintest = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      csrfToken : csrfToken,
      email: "test1@gmail.com",
      password: "test1"
    }

    axios.post(`/api/auth/callback/credentials`, data)
      .then(res => {return res; console.log(res)})



  }

  console.log(providers)
  console.log(csrfToken)

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
              // <form method="post" action="/api/auth/callback/credentials">
               <form method="post" action="" onSubmit={signintest}> 

                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <label>
                  Email
                  <input name="email" type="text" />
                </label>
                <label>
                  Password
                  <input name="password" type="password" />
                </label>
                <button type="submit">Sign in</button>
              </form>
            );
          }
          return (
            <div key={provider.name} className={provider.name + " social-sign-in"} >
              <button key={provider.name} onClick={() => signIn(provider.id)}>
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
  console.log(res)
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