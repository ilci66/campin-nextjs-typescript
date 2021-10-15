import type { NextPage } from 'next'
import Head from 'next/head'

const SignUp: NextPage = () => {
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
                <div className="sign-up-form"></div>
                    <form action="" className="">
                    <h1>Here will be the sign up form</h1>
                        <div className="input-container">
                            <input 
                                id="sign-in-email" 
                                className="input" 
                                type="text" 
                                autoComplete="email" 
                                placeholder=" "
                                required 
                            />
                            <div className="cut cut-short">   
                                <label htmlFor="email" className="place">Email</label>
                            </div>
                        </div>
                        <div className="input-container">
                        <input 
                            id="sign-in-password" 
                            className="input" 
                            type="password" 
                            required 
                            />
                            <div className="cut">
                                <label htmlFor="password" className="placeholder">Password</label>
                            </div>
                        </div>
                        <div className="input-container">
                        <input 
                            id="sign-in-password" 
                                className="input" 
                                type="password" 
                                required 
                            />
                            <div className="cut">
                                <label htmlFor="password" className="placeholder">Password</label>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
        <style jsx>{`
            .sign-up-container{
                background-color: gray;
                top: 0;
                left:0;
                width:100%;
                height100%;
                position:relative;
                display:flex;
                align-items: center;
                justifiy-content: center;
            }
            .sign-up-form-container{
                max-width: 960px;
                display:flex;
                width:80%;
                margin: 50px; auto
                align-items:center;
                justify-content:center;
            }
            .sign-up-pic{
                width: 42%;
            }
            .sign-up-form{
                border: 2px solid red;
            }
        `}</style>
    </>)
}
export default SignUp