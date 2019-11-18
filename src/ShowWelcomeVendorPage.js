import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import welcomePage from './images/welcomePageAdmin.png';
import footWelcomePage from './images/footWelcomePage.png';
import welcomeIcon from './images/welcomeIcon.png';
import './CSS/setImg.css';



class ShowWelcomeVendorPage extends React.Component {

    render() {
        
        return (
            <div id = "allBGWelcome">

                <img src={welcomePage} id ="setBG" alt=""/>
                <Link to="/reportOrderPage"> <img src={welcomeIcon} id="logoWelcome" alt=""/>  </Link>
                <img src={footWelcomePage} id ="setBG" alt=""/>


            </div>

        );
    }

}

export default ShowWelcomeVendorPage;