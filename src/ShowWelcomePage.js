import React from 'react';
import { Link } from "react-router-dom";
import welcomePage from './images/welcomePage.png';
import footWelcomePage from './images/footWelcomePage.png';
import welcomeIcon from './images/welcomeIcon.png';
import './CSS/setImg.css';

class ShowWelcomePage extends React.Component {

    render() {
        
        return (
            <div id = "allBGWelcome">

                <img alt="" src={welcomePage} id ="setBG" />
                <Link to="/Home"> <img alt="" src={welcomeIcon} id="logoWelcome" />  </Link>
                <img alt="" src={footWelcomePage} id ="setBG" />


            </div>

        );
    }

}

export default ShowWelcomePage;