import React from "react";
import { Link } from "react-router-dom";
import '../../../styles/shared/atoms/customButtons/customButtonNavigatev2.css';


export function CustomButtonNavigatev2({ label = "", linkTo = "home" }) {
    return (<>
        <div className="text-box">
            <a href="#" className="btn btn-white btn-animate">click me</a>
        </div>
    </>);
}
