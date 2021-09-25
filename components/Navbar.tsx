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
            <Link href="/posts"><a>Posts</a></Link>
            <Link href="/about"><a>About</a></Link>
            {/* <style jsx>{`
                nav {
                    margin: 10px auto 80px;
                    padding: 10px 0;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    border-bottom: 1px solid #ddd;
                }
                nav a {
                    margin-left: 12px;
                }
                nav .logo {
                    margin-right: auto;
                }
            `}</style>   */}
        </nav>
    )
}

export default Navbar;