import Link from 'next/link'
import Image from 'next/image'
import { NextComponentType } from 'next';
import { useState, useEffect } from 'react'

const Navbar: NextComponentType = () => {

    const [ show, setShow ] = useState(false)
    const [ hide, setHide ] = useState(true)
    
    // gonna have to take a second look here for properly assigning types later
    
    // const modal: HTMLElement = document.getElementById('my-modal') !;
 
    const handleShowModal = () => {
        setShow(true)
        setHide(false)
    }
    const handleCloseModal = () => {
        setShow(false)
        setHide(true)
    }
    useEffect(()=>{
        console.log("show ==>", show, "--", "hide ==>", "--", hide)
        if(window && show === true){
            const modal: HTMLElement = document.getElementById('my-modal')!;
            window.onclick = (event) => {
                const { target } = event
                // console.log(target == modal)

                if (target == modal) {
                    modal.style.display = "none";
                    setShow(false)
                    setHide(true)
                    // console.log('should close')
                }
            }
        }
    },
    [show, hide])

    useEffect(() => {
        const modal = document.getElementById('my-modal') !;
        if(show && !hide){
            modal.style.display = "block"
        }else if(!show && hide) {
            modal.style.display = "none"
        }
    }, [show, hide])

    return (
        <>
        <div id="my-modal" className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-header">Hello Camper!</h2>
                    <button id="modal-close-button" className="modal-close" onClick={handleCloseModal}>
                        Close
                    </button>
                </div>
                <div className="modal-body">
                    <form action="" className="modal-form">
                        <div className="input-container input-1">
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
                        <div className="input-container input-2">
                            <input 
                                id="sign-in-password" 
                                className="input" 
                                type="password" 
                                required 
                            />
                            <div className="cut">
                                <label htmlFor="password" >Password</label>
                            </div>
                            
                        </div>
                        <button id="modal-sign-in" className="modal-sign-in">Sign in</button>
                    </form>

                </div>
                <div className="modal-footer">
                    <p className="modal-footer-text">Don't you have an account?</p>
                    <Link href="/sign-up"><a className="modal-sign-up-link" onClick={handleCloseModal}>Sign Up</a></Link>
                </div>
            </div>
        </div>
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
                <button id="nav-sign-in" className="sign-in" onClick={handleShowModal}>Sign In</button>
            </div>
        </nav>
        </div>
        </>
    )
}

export default Navbar;