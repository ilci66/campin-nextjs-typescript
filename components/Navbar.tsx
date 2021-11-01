import Link from 'next/link'
import Image from 'next/image'
import { NextComponentType } from 'next';
import { useState, useEffect } from 'react'
import SignInModal from './SignInModal';
import {
    signIn, 
    signOut,
    useSession
  } from 'next-auth/client';

// export interface ISignIn {
//     handleCloseModal:() => void;
// }  

const Navbar: NextComponentType = () => {

    const [ isFetching, setIsFetching ] = useState(false);
    const [ nameNavbar, setNameNavbar ] = useState<string>();

    const [ session, loading ] = useSession();
    

    if(session){
        console.log("this is the session", session)
    }

    const [ show, setShow ] = useState(false)
    const [ hide, setHide ] = useState(true)
    
 
    // const handleShowModal = () => {
    //     setShow(true)
    //     setHide(false)
    // }
    // const handleCloseModal = () => {
    //     setShow(false)
    //     setHide(true)
    // }
    // useEffect(()=>{
    //     if(window && show === true){
    //         const modal: HTMLElement = document.getElementById('my-modal')!;
    //         window.onclick = (event) => {
    //             const { target } = event

    //             if (target == modal) {
    //                 modal.style.display = "none";
    //                 handleCloseModal()
    //             }
    //         }
    //     }
    // },
    // [show, hide])

    // useEffect(() => {
    //     const modal = document.getElementById('my-modal') !;
    //     if(show && !hide){
    //         modal.style.display = "block"
    //     }else if(!show && hide) {
    //         modal.style.display = "none"
    //     }
    // }, [show, hide])

    return (<>
        {/* <SignInModal 
            signIn={signIn}
            handleCloseModal={handleCloseModal} 
            setIsFetching={setIsFetching} 
            setNameNavbar={setNameNavbar}
        /> */}
        <div className="navbar-container">
            <nav>
                <Link href="/"><a>
                    <div className="logo">
                        <Image src="/campin-logo.png" width={100} height={100}/>
                    </div>
                </a></Link>
                <div className="nav-buttons">
                    <Link href="/about"><a>About</a></Link>  
                    <Link href="/map"><a>Map</a></Link>
                    <Link href="/posts"><a>Posts</a></Link>
                    {/* <Link href="/profile"><a>Sign in</a></Link> */}
                    {/* {!session && <>
                        <h1>You are not signed in</h1> <br/>
                        <button onClick={signIn}>Sign in</button>
                    </>} */}
                    
                    {/* ok now getting the name to use it in the navbar 
                    {nameNavbar && <><p>{nameNavbar}</p></>} */}

                    {session && <>
                        <p className="user-name">{session.user!.name}</p> 
                        <button id="nav-sign-out" className="sign-out" onClick={(e) => { e.preventDefault(); signOut();}}>Sign out</button></> 
                    }
                    {!session && <>
                         {/* <button id="nav-sign-in" className="sign-in" onClick={handleShowModal}>Sign In</button> */}
                            <button id="nav-sign-in" className="sign-in" onClick={(e) =>{ e.preventDefault(); signIn(); }}>Sign In</button>
                            <button id="nav-sign-up" className="sign-up">
                                <Link href="/sign-up">
                                    <a>Sign Up</a>
                                </Link>
                            </button>
                        </>
                    }
                </div>
            </nav>
        </div>
    </>)
}

export default Navbar;