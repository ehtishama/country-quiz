import { Footer } from "../footer";
import "./main.css";
export const Layout = ({ children }) => {
    return (
        <div className="container-main">
            {children}
            <Footer />
        </div>
    );
};
