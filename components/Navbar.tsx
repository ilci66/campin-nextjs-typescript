import Link from 'next/link'
import Image from 'next/image'
import { NextComponentType } from 'next';
import { useState } from 'react'

const Navbar: NextComponentType = () => {

    const [ show, setShow ] = useState(false)
    const [ hide, setHide ] = useState(true)
    
    return (
        <>
        <div className="modal">

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
                <button className="sign-in" onClick={() => {alert("wanna sign in")}}>Sign In</button>
            </div>
        </nav>
        </>
        
    )
}

export default Navbar;