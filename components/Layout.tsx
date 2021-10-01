import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
    children: React.ReactNode;
 }

const Layout = ({ children }: LayoutProps) => {

    return(
        <div className="container">
            <Navbar />
            {children}
            <Footer />     
        </div>
    )
}

export default Layout;