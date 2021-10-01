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
                <Link href="/profile"><a>Your Profile</a></Link>
            </div>

            <style jsx>{`
                nav {
                    margin: 10px auto 80px;
                    padding: 10px 0;
                    display: flex;
                    justify-content:space-between;
                    align-items: center;
                    border-bottom: 1px solid #ddd;
                }
                nav a {
                    margin-left: 12px;
                    margin-right: 18px
                }
            `}</style>  
        </nav>
    )
}

export default Navbar;