import "./NotFound.css";
import notFoundImage from "../../Assets/Images/404.png";
import {useNavigate} from "react-router-dom";

export function NotFound(): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="NotFound">
            <div className="image-container">
                <h1>404 NOT FOUND</h1>
                <button className="go-home-button" onClick={()=>navigate("/")}>Go Home</button>
            </div>
        </div>
    );
}
