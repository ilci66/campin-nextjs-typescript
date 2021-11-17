import type { NextPage } from 'next'

const About: NextPage = () => {
    return(<>
    <div className="about-container">
            <h1>About The Project</h1>
            <p>I had two motivations for creating this website. I wanted to use all the things I have learned so far to create something. I wanted be much more comfortable using them in my future projects. I also wanted to create something meaningful to me. I have always heard that campers had their own secret camping spots that nobody else knows about. I wanted to encourage everyone to share information with others, to keep eachother safe and share good experiences.</p>
            <p>Well that's it for now, as the website is in its very early stages this information should suffice</p>
    </div>
    <style jsx>{`
    .about-container {
        min-height: 100vh;
        max-width: 960px;
        margin: 0 auto;
    }
    `}</style>
    
    </>)
}
export default About