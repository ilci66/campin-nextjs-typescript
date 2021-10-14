import Link from 'next/link'
import Image from 'next/image'
import { NextComponentType } from 'next';
import { useState, useEffect } from 'react'

const Navbar: NextComponentType = () => {

    const [ show, setShow ] = useState(false)
    const [ hide, setHide ] = useState(true)
    
    // gonna have to take a second look here for properly assigning types later
    
    // const modal: HTMLElement = document.getElementById('my-modal') !;
    // const navSignIn: HTMLElement = document.getElementById('nav-sign-in')!;
    // const modalClose: HTMLElement = document.getElementById('modal-close-button')!;
    // const modalSignIn: HTMLElement = document.getElementById('modal-sign-in')!;
 
    const handleShowModal = () => {
        setShow(true)
        setHide(false)
    }
    const handleCloseModal = () => {
        setShow(false)
        setHide(true)
    }
    useEffect(()=>{
        if(window){
            const modal = document.getElementById('my-modal') !;
            window.onclick = (event) => {
                const { target } = event
                console.log(target == modal)
                if (event.target == modal) {
                    console.log('action on modal')
                    modal.style.display = "none";
                    console.log('should close')
                }else{console.log('target is not modal')}
            }
        }
    },
    [])

    useEffect(() => {
        const modal = document.getElementById('my-modal') !;
        // console.log(modal)
        console.log("display ==> ", modal.style.display)
        if(show && !hide){
            modal.style.display = "block"
            console.log('supposed to show')
        }else if(!show && hide) {
            modal.style.display = "none"
            console.log('supposed to hide')
        }
    }, [show, hide])

    return (
        <>
        <div id="my-modal" className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-header">This be me modal mon!</h2>
                    <button id="modal-close-button" className="modal-close" onClick={handleCloseModal}>
                        Close
                    </button>
                </div>
                <div className="modal-body">
                    <form action="" className="modal-form">
                        <button id="modal-sign-in" className="modal-sign-in">Sign in</button>
                    </form>

                </div>
                <div className="modal-footer">
                    <p className="modal-footer-text">Don't you have an account?</p>
                    <button className="modal-sign-up">
                        <Link href="/sign-up">
                            <a >Sign Up</a>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
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
                <button id="nav-sign-in" className="sign-in" onClick={handleShowModal}>Sign In</button>
            </div>
        </nav>
        
        <style jsx>{`
            .modal-header {
                padding: 2px 16px;
                background-color: #5cb85c;
                color: white;
            }
            .modal-footer {
                padding: 2px 16px;
                background-color: #5cb85c;
                color: white;
            }
            .modal-body {padding: 2px 16px;}
            .modal-content {
                display: flex;
                flex-direction: column;
                opacity:1;
                position: absolute;
                margin: 3rem 25%;
                background-color: #fefefe;
                padding: 0;
                border: 1px solid #888;
                z-index: 15;
                max-width: 950px;
                min-width: 200px;
                width: 50%;
                box-shadow: 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
                animation-name: animatetop;
                animation-duration: 0.4s
            }
            @keyframes animatetop {
                from {top: -300px; opacity: 0}
                to {top: 0; opacity: 1}
            }
        `}</style>
        </>
    )
}

export default Navbar;