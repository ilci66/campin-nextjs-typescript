import type { NextPage } from 'next'

const Posts: NextPage = () => {
    return(<>
    <div className="posts-container">
        <h1>this page will contain all the posts</h1>
    </div>
        <style jsx>{`
            .posts-container {
                min-height: 100vh;
            }
        `}</style>
    </>)
}
export default Posts