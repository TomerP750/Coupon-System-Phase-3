import "./Layout.css";
import {Routing} from "../../Routing/Routing";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<Header/>

            <Routing/>
            <Footer/>
            <ToastContainer />
        </div>
    );
}
