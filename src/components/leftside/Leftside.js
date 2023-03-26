import React from "react";
import "./Leftside.css";
import { MdOutlineSpaceDashboard } from "react-icons/md";
function leftside() {
  return (
    <div className="leftside">
      <div className="leftnavbar">
        <div className="logo">
          <img src="https://i.pinimg.com/736x/02/91/2c/02912cce29eda4efc9397ca56195559c.jpg" />
          <h4>WOW</h4>
        </div>
        <img src="https://toppng.com/uploads/preview/blue-circles-png-blue-circle-png-transparent-1156364176983eqdcywpk.png" />
      </div>
      <div className="leftbutton">
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          Dashboard
        </div>
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          WOW Users
        </div>
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          Video Clips
        </div>
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          Reported Content
        </div>
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          Category
        </div>
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          Info Page
        </div>
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          FAQ
        </div>
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          Push Notication
        </div>
        <div className="eachbutton">
          <MdOutlineSpaceDashboard className="icons" />
          Internal User
        </div>
      </div>
    </div>
  );
}

export default leftside;
