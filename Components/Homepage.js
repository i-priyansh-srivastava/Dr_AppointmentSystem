import Nav from "./Nav";
import Brochure from "./Brochure";
import Features from "./Features";
import Footer from "./Footer";
import Faqs from "./Faqs";
import Featuredata from "../Data/Featuredata";
import Faqdata from "../Data/Faqdata";
import "../styles/Homepage.css"

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = (props) => {
    

    return (
        <div className="Homepage">
            <Nav setLogin={props.setLogin}></Nav>
            <Brochure setLogin={props.setLogin}></Brochure>
            <Features Featuredata={Featuredata}></Features>
            <Faqs Faqdata={Faqdata}></Faqs>
            <Footer></Footer>
        </div>
    )
}

export default Homepage

