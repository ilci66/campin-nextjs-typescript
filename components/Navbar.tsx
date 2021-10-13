import Link from 'next/link'
import Image from 'next/image'
import { NextComponentType } from 'next';

const Navbar: NextComponentType = () => {

    
    return (
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
                <Link href=""><a className="sign-in">Sign In</a></Link>
            </div>
        </nav>
    )
}

export default Navbar;