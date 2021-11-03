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

    // const [ isFetching, setIsFetching ] = useState(false);
    // const [ nameNavbar, setNameNavbar ] = useState<string>();
    const [ menuShow, setMenuShow ] = useState(false) 
    const [ session, loading ] = useSession();
    
    let navMenu;

    useEffect(() => {
        console.log("menushow ==>", menuShow)
        navMenu = document.getElementById("dropdown-menu-buttons");
        if(menuShow){
            navMenu?.classList.add("menu-show")
        }else{
            navMenu?.classList.remove("menu-show")
        }
    },[menuShow])

    if(session){
        console.log("this is the session", session)
    }

    // const [ show, setShow ] = useState(false)
    // const [ hide, setHide ] = useState(true)
    
 
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
                <button onClick={() => setMenuShow(!menuShow)}className="dropdown">MENU</button>
                <div id="dropdown-menu-buttons" className="mobile-nav-buttons">
                    <ul className="dropdown-navbar-list">
                        <li className="dropdown-list-item">
                            <Link href="/about">
                                <a className="dropdown-link">ABOUT</a>
                            </Link>
                        </li>   
                        <li className="dropdown-list-item">
                            <Link href="/map">
                                <a className="dropdown-link">MAP</a>
                            </Link>
                        </li>
                        <li className="dropdown-list-item">
                            <Link href="/posts">
                                <a className="dropdown-link">POSTS</a>
                            </Link>
                        </li>
                    </ul>
                    <div className="dropdown-navbar-footer">
                    {session && <>
                        <p className="menu-user-name">{session.user!.name}</p> 
                        <button 
                            id="mobile-nav-sign-out" 
                            className="mobile-sign-out" 
                            onClick={(e) => { e.preventDefault(); signOut();}}
                            >Sign out
                        </button>
                    </> }
                    {!session && <>
                         {/* <button id="nav-sign-in" className="sign-in" onClick={handleShowModal}>Sign In</button> */}
                            <button id="nav-sign-in" className="dropdown-sign-in" onClick={(e) =>{ e.preventDefault(); signIn(); }}>Sign In</button>
                            <button id="nav-sign-up" className="dropdown-sign-up">
                                <Link href="/sign-up">
                                    <a className="dropdown-sign-up-link">Sign Up</a>
                                </Link>
                            </button>
                        </>
                    }
                    </div>
                    
                    <button onClick={() => setMenuShow(false)} className="dropdown-menu-close">Close</button>
                </div>
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