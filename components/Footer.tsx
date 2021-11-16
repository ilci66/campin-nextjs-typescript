import Link from 'next/link'

const Footer = () => {
    return (<>
        <footer>
            <div className="footer-container">
                <p className="my-email-adress">akbiyik.ilker7@gmail.com</p>
                <Link href="mailto:akbiyik.ilker7@gmail.com"><a className="contact-link">Or, Email Me Directly!</a></Link>
                <Link href="https://github.com/ilci66"><a className="contact-link">My Github Profile</a></Link>  
            </div>
            {/* Copyright 2021 Ilker */}
        </footer>
        <style jsx>{`
            .footer-container{
                display: flex;
                justify-content: space-around;
                padding: 20px 50px;
                align-items:center;
            }
            .contact-link{
                color: var(--main-text-color);
            }
            @media screen and (max-width: 600px){
                .footer-container{
                    flex-direction: column;
                    align-items: center;
                    padding: 10px;
                }
                .contact-link{
                    margin-bottom: 10px;
                }
              }
        `}</style>
    
    
    </>)
}

export default Footer;